# BookSenSei 📚 - AI-Powered Book Recommendation App

Welcome to BookSenSei, a smart book recommendation engine that goes beyond keywords to find books based on the *meaning* and *vibe* of your query. Tell the Sensei what you're in the mood for, and get personalized recommendations powered by semantic search and modern AI.



---

## ✨ Features

* **Semantic Search:** Instead of just matching keywords, our AI understands the *meaning* behind your queries (e.g., "a lonely detective story in a rainy city").
* **Dynamic Filtering:** Filter results by minimum user rating to find high-quality reads.
* **Interactive UI:** A beautiful and responsive interface built with React and Tailwind CSS, featuring a reactive particle background and smooth animations.
* **Persistent State:** Your search results and settings are saved as you navigate through the app.
* **Dynamic "Buy" Links:** Find any recommended book on Amazon with a single click.

---

## 🛠️ Technology Stack

This is a full-stack application built with modern technologies:

* **Frontend:**
    * **React:** For building the user interface.
    * **Tailwind CSS:** For styling.
    * **Framer Motion:** For animations.
    * **React Router:** For page navigation.
    * **React Context:** For global state management.

* **Backend:**
    * **FastAPI:** A high-performance Python framework for the API.
    * **ChromaDB:** A vector database for storing and querying book embeddings.
    * **Sentence Transformers:** To convert book descriptions and user queries into numerical vectors (embeddings) for semantic search.

---

## 🚀 How to Run This Project Locally

Follow these instructions to get BookSenSei running on your own machine.

#### **Prerequisites**
Make sure you have the following software installed:
* Git
* Python (3.8+)
* Node.js (16+)

#### **1. Clone the Repository**
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)
cd YOUR_REPOSITORY_NAME
```

#### **2. Set Up the Backend (Python)**
* Navigate to the backend folder:
    ```bash
    cd backend
    ```
* Create and activate a virtual environment:
    ```bash
    # Create the environment
    python -m venv venv
    
    # Activate on Windows (PowerShell)
    .\venv\Scripts\Activate.ps1
    
    # Activate on Mac/Linux
    # source venv/bin/activate
    ```
* Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```
* **One-Time Step:** Build the book database. This will take a few minutes.
    ```bash
    python embed_books.py
    ```

#### **3. Set Up the Frontend (React)**
* Open a **new, separate terminal**.
* Navigate to the frontend folder:
    ```bash
    cd frontend 
    ```
* Install the required packages:
    ```bash
    npm install
    ```

#### **4. Run the Application!**
You need to have **both terminals running** at the same time.

* **In your Backend Terminal:** Start the Python server.
    ```bash
    uvicorn main:app --reload
    ```
* **In your Frontend Terminal:** Start the React application.
    ```bash
    npm start
    ```

Your browser should automatically open to `http://localhost:3000`.

---

## 👤 About the Author

This project was created by **[Your Name]** as a demonstration of modern full-stack development and AI-powered search.

_Add a link to your personal portfolio, LinkedIn, or GitHub profile here!_
