import time
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/compare", methods=["POST"])
def compare():
    data = request.json

    values = data.get("values", "").split(",")
    values = [v.strip() for v in values if v.strip() != ""]
    target = data.get("target", "").strip()

    start = time.perf_counter()
    list_found = target in values
    list_time = (time.perf_counter() - start) * 1000

    return jsonify({
        "list_found": list_found,
        "list_time_ms": list_time,
        "list_complexity": "O(n)"
    })

if __name__ == "__main__":
    app.run(debug=True)