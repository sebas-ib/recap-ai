from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route("/api/summarize", methods=["POST"])
def summarize():
    data = request.json
    text = data.get("text")
    if not text:
        return jsonify({"error": "Missing text"}), 400

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": f"Summarize this:\n{text}"}]
    )

    summary = response['choices'][0]['message']['content']
    return jsonify({"summary": summary})

