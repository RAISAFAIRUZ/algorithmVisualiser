from flask import Flask, render_template, request, jsonify
from algorithms.sorting import bubble_sort, quick_sort  # Import sorting algorithms
from algorithms.graph_algorithms import bfs, dfs       # Import graph algorithms

app = Flask(__name__)

# Route for the homepage
@app.route("/")
def index():
    return render_template("index.html")

# Route for running algorithms
@app.route("/run_algorithm/<algorithm>", methods=["POST"])
def run_algorithm(algorithm):
    data = request.get_json()  # Get the input data from the frontend

    if algorithm == "bubble_sort":
        array = data.get("array")
        steps = bubble_sort(array)  # Run Bubble Sort with user input
    elif algorithm == "quick_sort":
        array = data.get("array")
        steps = quick_sort(array)  # Run Quick Sort with user input
    elif algorithm == "bfs":
        graph = data.get("graph")
        steps = bfs(graph, "0")  # Run BFS with user input
    elif algorithm == "dfs":
        graph = data.get("graph")
        steps = dfs(graph, "0")  # Run DFS with user input
    else:
        return jsonify({"error": "Algorithm not supported"}), 400

    return jsonify({"steps": steps})  # Return the visualization steps to the frontend

if __name__ == "__main__":
    app.run(debug=True)
