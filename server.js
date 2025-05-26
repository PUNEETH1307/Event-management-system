const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db_config");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/add_event", (req, res) => {
  console.log("Add Event Request Body:", req.body);
  const { event_name, location, event_date } = req.body;
  db.query("INSERT INTO events (event_name, location, event_date) VALUES (?, ?, ?)",
    [event_name, location, event_date], (err) => {
      if (err) res.json({ error: err });
      else res.json({ message: "Event created!" });
    });
});

app.post("/register", (req, res) => {
  console.log("Register Request Body:", req.body);
  const { name, email, event_id } = req.body;

  db.query("INSERT IGNORE INTO participants (name, email) VALUES (?, ?)", [name, email], (err) => {
    if (err) return res.json({ error: err });

    db.query("SELECT participant_id FROM participants WHERE email = ?", [email], (err, result) => {
      const pid = result[0].participant_id;
      db.query("INSERT INTO registrations (event_id, participant_id) VALUES (?, ?)", [event_id, pid], (err) => {
        if (err) res.json({ error: err });
        else res.json({ message: "Participant registered!" });
      });
    });
  });
});

app.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) res.json({ error: err });
    else res.json(result);
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));