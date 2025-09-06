from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import numpy as np
from dotenv import load_dotenv

from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_chroma import Chroma

import gradio as gr
from transformers import pipeline

# --- Initialize FastAPI App ---
app = FastAPI()

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Health Check Endpoint ---
@app.get("/health")
def health_check():
    return {"status": "ok"}

# --- Load Environment and Dataset ---
load_dotenv()
books = pd.read_csv("books_with_emotions.csv")
books["large_thumbnail"] = books["thumbnail"] + "&fife=w800"
books["large_thumbnail"] = np.where(
    books["large_thumbnail"].isna(), "cover-not-found.jpg", books["large_thumbnail"]
)

# --- HuggingFace Zero-Shot Classifier ---
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", device=-1)
book_categories = sorted(books["simple_categories"].dropna().unique().tolist())

# --- Vector Database Setup ---
raw_documents = TextLoader("tagged_description.txt", encoding="utf-8").load()
text_splitter = CharacterTextSplitter(separator="\n", chunk_size=0, chunk_overlap=0)
documents = text_splitter.split_documents(raw_documents)
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db_books = Chroma.from_documents(documents, embedding_model)

# --- Book Recommendation Logic ---
def retrieve_semantic_recommendations(query: str, category: str = None, tone: str = None, initial_top_k: int = 50, final_top_k: int = 16) -> pd.DataFrame:
    if category == "All" or category is None:
        classification = classifier(query, candidate_labels=book_categories)
        category = classification["labels"][0]

    recs = db_books.similarity_search(query, k=initial_top_k)
    books_list = [int(rec.page_content.strip('"').split()[0]) for rec in recs]
    book_recs = books[books["isbn13"].isin(books_list)].head(initial_top_k)
    book_recs = book_recs[book_recs["simple_categories"] == category].head(final_top_k)

    if tone == "Happy":
        book_recs.sort_values(by="joy", ascending=False, inplace=True)
    elif tone == "Surprising":
        book_recs.sort_values(by="surprise", ascending=False, inplace=True)
    elif tone == "Angry":
        book_recs.sort_values(by="anger", ascending=False, inplace=True)
    elif tone == "Suspenseful":
        book_recs.sort_values(by="fear", ascending=False, inplace=True)
    elif tone == "Sad":
        book_recs.sort_values(by="sadness", ascending=False, inplace=True)

    return book_recs

# --- Gradio-Compatible Output Formatter ---
def recommend_books(query: str, category: str = "All", tone: str = "All"):
    print("▶ Received query:", query)
    print("▶ Category:", category)
    print("▶ Tone:", tone)

    recommendations = retrieve_semantic_recommendations(query, category, tone)
    print("▶ Found", len(recommendations), "matching books")

    results = []
    for _, row in recommendations.iterrows():
        authors_split = row["authors"].split(";")
        if len(authors_split) == 2:
            authors_str = f"{authors_split[0]} and {authors_split[1]}"
        elif len(authors_split) > 2:
            authors_str = f"{', '.join(authors_split[:-1])}, and {authors_split[-1]}"
        else:
            authors_str = row["authors"]

        truncated_description = " ".join(row["description"].split()[:30]) + "..."
        results.append({
            "title": row["title"],
            "authors": authors_str,
            "image": row["large_thumbnail"],
            "description": truncated_description,
        })

    print("▶ Returning", len(results), "books to frontend")
    return results

# --- FastAPI Recommendation Endpoint ---
@app.post("/recommend/")
async def recommend_endpoint(request: Request):
    body = await request.json()
    query, category, tone = body["data"]

    print("▶ Received query:", query)
    print("▶ Category:", category)
    print("▶ Tone:", tone)

    recommendations = recommend_books(query, category, tone)
    return JSONResponse(content={"data": recommendations})
