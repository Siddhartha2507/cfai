document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("compareBtn");
    const outputSection = document.getElementById("outputSection");

    button.addEventListener("click", runComparison);

    function runComparison() {
        const values = document.getElementById("inputArray").value;
        const target = document.getElementById("targetValue").value;

        fetch("/compare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values, target })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            outputSection.classList.add("active");

            document.getElementById("listTime").innerText = data.list_time_ms.toFixed(4);
            document.getElementById("setTime").innerText = data.set_time_ms.toFixed(4);
            document.getElementById("listComplexity").innerText = data.list_complexity;
            document.getElementById("setComplexity").innerText = data.set_complexity;

            document.getElementById("dataInfo").innerText =
`Target Found in List: ${data.list_found}
Target Found in Set: ${data.set_found}
Total Elements: ${data.total_elements}
Unique Elements: ${data.unique_elements}
Duplicates: ${data.duplicates}`;

            document.getElementById("winner").innerText = data.winner;

            const ctx = document.getElementById("timeChart").getContext("2d");

            if (window.myChart) {
                window.myChart.destroy();
            }

            window.myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["List Search", "Set Search"],
                    datasets: [{
                        label: "Execution Time (ms)",
                        data: [data.list_time_ms, data.set_time_ms],
                        backgroundColor: ["#ef4444", "#22c55e"],
                        borderRadius: 6
                    }]
                }
            });
        });
    }
});

function generateRandom() {
    let arr = [];

    for (let i = 0; i < 25; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }

    const randomTarget = arr[Math.floor(Math.random() * arr.length)];

    document.getElementById("inputArray").value = arr.join(",");
    document.getElementById("targetValue").value = randomTarget;
}