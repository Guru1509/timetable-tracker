flatpickr(".timepicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: false
  });
  
  function updateDuration() {
    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;
    if (!start || !end) return;
  
    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);
    const duration = ((h2 * 60 + m2) - (h1 * 60 + m1));
  
    document.getElementById("durationDisplay").textContent =
      duration > 0 ? `⏱ Duration: ${duration} mins` : `⏱ Invalid Time`;
  }
  
  document.getElementById("startTime").addEventListener("change", updateDuration);
  document.getElementById("endTime").addEventListener("change", updateDuration);
  
  document.getElementById("classForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const subject = document.getElementById("subject").value;
    const classroom = document.getElementById("classroom").value;
    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;
    const day = document.getElementById("day").value;
  
    const classBlock = document.createElement("div");
    classBlock.innerHTML = `<strong>${subject}</strong><br>📍${classroom}<br>🕒 ${start} – ${end}`;
  
    document.getElementById(day).appendChild(classBlock);
  
    this.reset();
    document.getElementById("durationDisplay").textContent = '⏱ Duration: —';
  });
  