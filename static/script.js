document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("compareBtn");

    button.addEventListener("click", function () {
        const values = document.getElementById("inputArray").value;
        const target = document.getElementById("targetValue").value;

        fetch("/compare", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                values: values,
                target: target
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(
                "List Found: " + data.list_found +
                "\nList Time: " + data.list_time_ms.toFixed(4) + " ms" +
                "\nComplexity: " + data.list_complexity
            );
        });
    });
});