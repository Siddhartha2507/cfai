from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/compare", methods=["POST"])
def compare():
    data = request.json
    return jsonify({
        "message": "Compare API working",
        "received": data
    })

if __name__ == "__main__":
    app.run(debug=True)