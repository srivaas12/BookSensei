import pandas as pd
from sentence_transformers import SentenceTransformer
import chromadb

# --- Configuration ---
# Make sure this path points to your CSV file
CSV_FILE_PATH = "books_cleaned.csv"
# This is where your persistent database will be stored
DB_PATH = "./chroma_db"
# The name of the collection inside the database
COLLECTION_NAME = "books"

# 1. Load your dataset
try:
    df = pd.read_csv(CSV_FILE_PATH)
    # Ensure essential columns are not empty
    df.dropna(subset=["isbn13", "title", "description", "authors", "average_rating", "thumbnail"], inplace=True)
    print(f"📚 Successfully loaded {len(df)} books from {CSV_FILE_PATH}")
except FileNotFoundError:
    print(f"❌ Error: The file {CSV_FILE_PATH} was not found. Please check the path.")
    exit()

# 2. Setup ChromaDB for persistent storage
chroma_client = chromadb.PersistentClient(path=DB_PATH)
collection = chroma_client.get_or_create_collection(name=COLLECTION_NAME)

# 3. Load the embedding model
print("🧠 Loading the embedding model (all-MiniLM-L6-v2)...")
model = SentenceTransformer("all-MiniLM-L6-v2")

# 4. Process and add data in batches
batch_size = 200
print(f"🚀 Starting the embedding process with a batch size of {batch_size}...")

for start in range(0, len(df), batch_size):
    end = min(start + batch_size, len(df))
    chunk = df.iloc[start:end]

    # Combine title and description for richer context
    documents = (chunk["title"] + " - " + chunk["description"]).tolist()

    # Use the unique ISBN as the ID
    ids = chunk["isbn13"].astype(str).tolist()

    # Create embeddings for the documents
    embeddings = model.encode(documents, show_progress_bar=False).tolist()

    # Store other useful information in the metadata
    metadatas = chunk[["title", "authors", "thumbnail", "average_rating"]].to_dict(orient="records")

    # Add the batch to the Chroma collection
    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas
    )
    print(f"✅ Processed and embedded books {start+1} to {end}")

print(f"\n[🎉] Finished embedding all {len(df)} books into the '{COLLECTION_NAME}' collection in '{DB_PATH}'.")