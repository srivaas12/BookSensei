import pandas as pd
import json

# Load GoodBooks CSV (remove 'description')
goodbooks_df = pd.read_csv("data/goodbooks.csv", usecols=["title", "authors", "average_rating"])
goodbooks_df.rename(columns={
    "authors": "author",
    "average_rating": "rating",
}, inplace=True)
goodbooks_df.dropna(subset=["title", "author"], inplace=True)

# Generate placeholder summary (so embedding won't fail)
goodbooks_df["description"] = "Book by " + goodbooks_df["author"]
goodbooks_df["source"] = "goodbooks"

# Load famous books JSON
with open("data/famous_books.json", "r", encoding="utf-8") as f:
    famous_books = json.load(f)

famous_df = pd.DataFrame(famous_books)
famous_df["source"] = "famous"
famous_df["summary"] = famous_df["summary"].fillna("No summary available.")
famous_df.rename(columns={"summary": "description"}, inplace=True)

# Merge both
merged = pd.concat([goodbooks_df, famous_df], ignore_index=True)
merged.drop_duplicates(subset=["title", "author"], inplace=True)

# Add buy link
merged["buy_link"] = merged["title"].apply(lambda x: f"https://www.amazon.in/s?k={'+'.join(x.split())}")

# Save
merged.to_csv("data/merged_books.csv", index=False)
print(f"[✅] Merged dataset saved with {len(merged)} books.")
