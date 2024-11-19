// Global variable to track the selected algorithm
let selectedAlgorithm = null;

/**
 * Sets the selected algorithm and updates the title dynamically.
 * @param {string} algorithm - The name of the selected algorithm.
 */
function loadAlgorithm(algorithm) {
    selectedAlgorithm = algorithm;

    // Update the title dynamically based on the selected algorithm
    const title = document.getElementById("algorithm-title");
    title.textContent = `${algorithm.replace("_", " ").toUpperCase()} Visualization`;
}

/**
 * Runs the selected algorithm visualization.
 */
async function runVisualization() {
    if (!selectedAlgorithm) {
        alert("Please select an algorithm from the sidebar.");
        return;
    }

    const arrayInput = document.getElementById("array-input").value;

    // Validate and parse user input
    let inputData;
    try {
        inputData = {
            array: arrayInput.split(",").map(Number),
        };
    } catch (error) {
        alert("Invalid input. Please enter numbers separated by commas.");
        return;
    }

    try {
        // Send the data to the backend
        const response = await fetch(`/run_algorithm/${selectedAlgorithm}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputData),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch algorithm steps.");
        }

        // Receive steps and visualize
        const data = await response.json();
        visualizeSteps(data.steps);
    } catch (error) {
        console.error("Error running visualization:", error);
        alert("An error occurred while running the visualization.");
    }
}

/**
 * Visualizes the steps of the selected algorithm using the canvas.
 * @param {Array} steps - The steps of the algorithm, where each step contains an array state.
 */
function visualizeSteps(steps) {
    const canvas = document.getElementById("visualization-canvas");
    const context = canvas.getContext("2d");

    // Define colors for the visualization
    const barColor = "#17a2b8"; // Light blue for bars
    const labelColor = "#212529"; // Dark gray for text

    // Loop through each step of the algorithm
    steps.forEach((step, index) => {
        setTimeout(() => {
            // Clear canvas for each new step
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate bar width dynamically
            const barWidth = canvas.width / step.data.length;

            // Loop through the data in this step and render each bar
            step.data.forEach((value, i) => {
                // Calculate bar height and position
                const barHeight = value * 10; // Scale value to fit canvas
                const x = i * barWidth; // Bar's x-coordinate
                const y = canvas.height - barHeight; // Bar's y-coordinate (bottom-up)

                // Draw bar
                context.fillStyle = barColor;
                context.fillRect(x + 5, y, barWidth - 10, barHeight);

                // Draw value label above the bar
                context.fillStyle = labelColor;
                context.font = "16px Arial";
                context.textAlign = "center";
                context.fillText(value, x + barWidth / 2, y - 10);
            });
        }, index * 500); // Add delay for each step (500ms)
    });

    // Add a final timeout to clear the canvas at the end
    setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }, steps.length * 500);
}
