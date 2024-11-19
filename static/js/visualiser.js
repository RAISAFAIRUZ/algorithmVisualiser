let selectedAlgorithm = null;

function loadAlgorithm(algorithm) {
    selectedAlgorithm = algorithm;

    // Update the title to show the selected algorithm
    const title = document.getElementById("algorithm-title");
    title.textContent = `${algorithm.replace("_", " ").toUpperCase()} Visualization`;
}

async function runVisualization() {
    if (!selectedAlgorithm) {
        alert("Please select an algorithm from the sidebar.");
        return;
    }

    const arrayInput = document.getElementById("array-input").value;

    // Parse user input
    let inputData = {
        array: arrayInput.split(",").map(Number)
    };

    // Send the data to the server
    const response = await fetch(`/run_algorithm/${selectedAlgorithm}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
    });

    const data = await response.json();
    visualizeSteps(data.steps);
}

function visualizeSteps(steps) {
    const canvas = document.getElementById("visualization-canvas");
    const context = canvas.getContext("2d");

    steps.forEach((step, index) => {
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw bars for sorting
            step.data.forEach((value, i) => {
                context.fillStyle = "blue";
                context.fillRect(i * 30, canvas.height - value * 10, 20, value * 10);

                // Draw labels
                context.fillStyle = "black";
                context.fillText(value, i * 30 + 5, canvas.height - value * 10 - 5);
            });
        }, index * 500);
    });
}
