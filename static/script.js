document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("compareBtn");
    const input = document.getElementById("inputArray");
    const targetInput = document.getElementById("targetValue");
    const outputSection = document.getElementById("outputSection");

    outputSection.classList.remove("active");

    function runComparison() {
        const values = input.value.split(",").map(v => v.trim()).filter(v => v !== "");
        const target = targetInput.value.trim();

        if (values.length === 0 || target === "") {
            alert("Please enter values and target value");
            return;
        }

        fetch("/compare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values, target })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            outputSection.classList.add("active");

            const listTime = data.list_time_ms ?? 0;
            const setTime = data.set_time_ms ?? 0;

            document.getElementById("listTime").innerText = listTime.toFixed(4);
            document.getElementById("setTime").innerText = setTime.toFixed(4);

            document.getElementById("listComplexity").innerText = data.list_complexity;
            document.getElementById("setComplexity").innerText = data.set_complexity;

            document.getElementById("dataInfo").innerText =
`Target Found in List: ${data.list_found}
Target Found in Set: ${data.set_found}
Total Elements: ${data.total_elements}
Unique Elements: ${data.unique_elements}
Duplicates: ${data.duplicates}`;

            const winnerText = document.getElementById("winner");
            winnerText.innerText = data.winner;
            winnerText.style.color = "#ffffff";

            const ctx = document.getElementById("timeChart").getContext("2d");

            if (window.myChart) window.myChart.destroy();

            window.myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["List Search", "Set Search"],
                    datasets: [{
                        label: "Execution Time (ms)",
                        data: [listTime, setTime],
                        backgroundColor: ["#ef4444", "#22c55e"],
                        borderRadius: 6,
                        barThickness: 70
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true, grid: { display: false } }
                    }
                }
            });
        })
        .catch(err => {
            console.error(err);
            alert("Backend error");
        });
    }

    button.addEventListener("click", runComparison);

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") runComparison();
    });

    targetInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") runComparison();
    });
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