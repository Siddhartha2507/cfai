document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("compareBtn");

    button.addEventListener("click", function () {
        const values = document.getElementById("inputArray").value;
        const target = document.getElementById("targetValue").value;

        fetch("/compare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values, target })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("listTime").innerText = data.list_time_ms.toFixed(4);
            document.getElementById("setTime").innerText = data.set_time_ms.toFixed(4);
            document.getElementById("listComplexity").innerText = data.list_complexity;
            document.getElementById("setComplexity").innerText = data.set_complexity;
        });
    });
});