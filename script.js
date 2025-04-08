document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("timetable-form");
    const tableBody = document.querySelector("#timetable tbody");

    // Load saved entries from localStorage
    const savedEntries = JSON.parse(localStorage.getItem("timetableEntries")) || [];
    savedEntries.forEach(entry => addRowToTable(entry));

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const day = form.day.value;
        const period = form.period.value;
        const startTime = form.startTime.value;
        const endTime = form.endTime.value;
        const classroom = form.classroom.value;

        const entry = { day, period, startTime, endTime, classroom };
        savedEntries.push(entry);

        // Save updated entries
        localStorage.setItem("timetableEntries", JSON.stringify(savedEntries));

        addRowToTable(entry);
        form.reset();
    });

    function addRowToTable(entry) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.day}</td>
            <td>${entry.period}</td>
            <td>${entry.startTime} – ${entry.endTime}</td>
            <td>${entry.classroom}</td>
        `;
        tableBody.appendChild(row);
    }
});
