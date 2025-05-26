document.getElementById("eventForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());
   console.log("Sending Event:", data);

  const res = await fetch("/add_event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  alert(result.message);
  loadEvents();
});

document.getElementById("regForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  alert(result.message);
});

async function loadEvents() {
  const res = await fetch("/events");
  const events = await res.json();
  const select = document.getElementById("eventSelect");
  select.innerHTML = events.map(e => `<option value="${e.event_id}">${e.event_name}</option>`).join("");
}

loadEvents();
