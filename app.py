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

    values_set = set(values)

    start1 = time.perf_counter()
    list_found = target in values
    list_time = (time.perf_counter() - start1) * 1000

    start2 = time.perf_counter()
    set_found = target in values_set
    set_time = (time.perf_counter() - start2) * 1000

    return jsonify({
        "list_found": list_found,
        "set_found": set_found,
        "list_time_ms": list_time,
        "set_time_ms": set_time,
        "list_complexity": "O(n)",
        "set_complexity": "O(1) Average",
        "total_elements": len(values),
        "unique_elements": len(values_set),
        "duplicates": len(values) - len(values_set)
    })

if __name__ == "__main__":
    app.run(debug=True)