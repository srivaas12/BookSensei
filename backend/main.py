from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import chromadb
import random
import urllib.parse

# -----------------------------
# App + CORS
# -----------------------------

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://book-sensei.vercel.app",
    "https://book-sensei-eh3cj7pfc-sri-vasu-devan-rs-projects.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  # safe here now
)

# -----------------------------
# ChromaDB Initialization
# -----------------------------

collection = None

try:
    chroma_client = chromadb.PersistentClient(path="./chroma_db")
    collection = chroma_client.get_collection("books")
    print("✅ Successfully connected to ChromaDB collection 'books'")
except Exception as e:
    print(f"❌ Failed to connect to ChromaDB: {e}")
    collection = None

# -----------------------------
# Health Check
# -----------------------------

@app.get("/")
def read_root():
    return {"message": "Backend is running"}

# -----------------------------
# Popular Books
# -----------------------------

@app.get("/popular-books")
async def get_popular_books():
    if not collection:
        return {"error": "Database collection not available."}

    try:
        results = collection.get(
            where={"average_rating": {"$gte": 4.3}},
            limit=20
        )

        books = []
        if results and results["ids"]:
            for i in range(len(results["ids"])):
                meta = results["metadatas"][i]
                title = meta.get("title", "No Title")

                books.append({
                    "id": results["ids"][i],
                    "title": title,
                    "cover_image": meta.get("thumbnail"),
                    "buy_link": f"https://www.amazon.com/s?k={urllib.parse.quote_plus(title)}"
                })

        return {"popular_books": random.sample(books, min(4, len(books)))}

    except Exception as e:
        print("🔥 Popular books error:", e)
        return {"error": str(e)}

# -----------------------------
# Recommend (POST + OPTIONS)
# -----------------------------

@app.api_route("/recommend", methods=["POST", "OPTIONS"])
async def recommend_books(request: Request):

    # Handle preflight cleanly
    if request.method == "OPTIONS":
        return {}

    if not collection:
        return {"error": "Database collection not available."}

    try:
        body = await request.json()
    except Exception:
        body = {}

    query = body.get("query", "")
    min_rating = request.headers.get("x-min-rating", "0")

    if not query:
        return {"recommendations": []}

    try:
        results = collection.query(
            query_texts=[query],
            n_results=10
        )
    except Exception as e:
        print("🔥 Chroma query error:", e)
        return {"error": str(e)}

    recommendations = []

    if results and results["ids"] and results["ids"][0]:
        for i in range(len(results["ids"][0])):
            meta = results["metadatas"][0][i]
            rating = meta.get("average_rating")

            if rating is None or float(rating) < float(min_rating):
                continue

            title = meta.get("title", "No Title")

            recommendations.append({
                "id": results["ids"][0][i],
                "title": title,
                "author": meta.get("authors", "Unknown Author"),
                "cover_image": meta.get("thumbnail"),
                "summary": results["documents"][0][i][:250] + "...",
                "buy_link": f"https://www.amazon.com/s?k={urllib.parse.quote_plus(title)}"
            })

    return {"recommendations": recommendations}
