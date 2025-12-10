from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import chromadb
import random
import urllib.parse # ✅ 1. IMPORT the missing module

origins = [
    "http://localhost:3000",
    "https://book-sensei.vercel.app",
    "https://book-sensei-eh3cj7pfc-sri-vasu-devan-rs-projects.vercel.app"
]

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=[
        "Content-Type",
        "Authorization",
        "X-Min-Rating",
        "x-min-rating",
        "*"
    ],
)

# Initialize ChromaDB client and connect to the persistent database
try:
    chroma_client = chromadb.PersistentClient(path="./chroma_db")
    collection = chroma_client.get_collection("books")
    print("✅ Successfully connected to existing ChromaDB collection 'books'.")
except Exception as e:
    print(f"❌ Failed to connect to ChromaDB: {e}")
    collection = None

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.get("/popular-books")
async def get_popular_books():
    if not collection:
        return {"error": "Database collection not available."}
    
    try:
        # 2. FETCH a larger pool of highly-rated books (e.g., 20)
        results = collection.get(
            where={"average_rating": {"$gte": 4.3}}, # Lowered threshold slightly for more variety
            limit=20 
        )

        all_popular_books = []
        if results and results["ids"]:
            for i in range(len(results["ids"])):
                meta = results["metadatas"][i]
                book_title = meta.get("title", "No Title")
                
                popular_book = {
                    "id": results["ids"][i],
                    "title": book_title,
                    "cover_image": meta.get("thumbnail"),
                    "buy_link": f"https://www.amazon.com/s?k={urllib.parse.quote_plus(book_title)}"
                }
                all_popular_books.append(popular_book)

        # 3. RANDOMLY SAMPLE 4 books from the pool
        # Ensure we don't try to sample more books than we have
        sample_size = min(4, len(all_popular_books))
        selected_books = random.sample(all_popular_books, sample_size)

        return {"popular_books": selected_books}
        
    except Exception as e:
        print(f"🔥 Error fetching popular books: {e}")
        return {"error": str(e)}

@app.post("/recommend")
async def recommend_books(request: Request):
    # Allow OPTIONS preflight
    if request.method == "OPTIONS":
        return {}

    if not collection:
        return {"error": "Database collection not available."}

    try:
        body = await request.json()
    except:
        body = {}

    keyword = body.get("query", "")
    
    # get rating from header (case-insensitive)
    min_rating = request.headers.get("x-min-rating") or request.headers.get("X-Min-Rating") or "0"

    if not keyword:
        return {"recommendations": []}

    try:
        results = collection.query(
            query_texts=[keyword],
            n_results=10
        )
    except Exception as e:
        print(f"🔥 ChromaDB Query Error: {e}")
        return {"error": str(e)}

    filtered_books = []
    if results and results["ids"][0]:
        for i in range(len(results["ids"][0])):
            meta = results["metadatas"][0][i]

            book_title = meta.get("title", "No Title")

            book_for_frontend = {
                "id": results["ids"][0][i],
                "title": book_title,
                "author": meta.get("authors", "Unknown Author"),
                "cover_image": meta.get("thumbnail"),
                "summary": results["documents"][0][i].split(" - ", 1)[-1][:250] + "...",
                "buy_link": f"https://www.amazon.com/s?k={urllib.parse.quote_plus(book_title)}"
            }

            rating = meta.get("average_rating")
            if rating is not None and float(rating) >= float(min_rating):
                filtered_books.append(book_for_frontend)

    return {"recommendations": filtered_books}
