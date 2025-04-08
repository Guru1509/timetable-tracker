document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("classForm");
  const timetable = document.getElementById("timetable");

  // Initialize timepickers
  flatpickr(".timepicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
  });

  // Load saved data from localStorage
  const savedClasses = JSON.parse(localStorage.getItem("classes")) || [];
  savedClasses.forEach(entry => renderClass(entry));

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const subject = document.getElementById("subject").value;
    const classroom = document.getElementById("classroom").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    const duration = getDuration(startTime, endTime);

    const newEntry = { subject, classroom, startTime, endTime, duration };

    // Save to localStorage
    savedClasses.push(newEntry);
    localStorage.setItem("classes", JSON.stringify(savedClasses));

    renderClass(newEntry);
    form.reset();
  });

  function renderClass({ subject, classroom, startTime, endTime, duration }) {
    const entry = document.createElement("div");
    entry.classList.add("entry");

    entry.innerHTML = `
      <div><strong>${subject}</strong></div>
      <div>📍 ${classroom}</div>
      <div>🕒 ${startTime} - ${endTime}</div>
      <div>⏱ ${duration}</div>
    `;

    timetable.appendChild(entry);
  }

  function getDuration(start, end) {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;
    const diff = endMin - startMin;
    return `${diff} mins`;
  }
});
