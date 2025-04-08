document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("timetable-form");
    const tableBody = document.querySelector("#timetable tbody");

    // Load from localStorage
    const savedEntries = JSON.parse(localStorage.getItem("timetableEntries")) || [];
    savedEntries.forEach(entry => addRowToTable(entry));

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const day = form.day.value;
        const period = form.period.value;
        const time = form.time.value;
        const classroom = form.classroom.value;

        const entry = { day, period, time, classroom };

        addRowToTable(entry);

        // Save to localStorage
        savedEntries.push(entry);
        localStorage.setItem("timetableEntries", JSON.stringify(savedEntries));

        form.reset();
    });

    function addRowToTable(entry) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.day}</td>
            <td>${entry.period}</td>
            <td>${entry.time}</td>
            <td>${entry.classroom}</td>
        `;
        tableBody.appendChild(row);
    }
});
