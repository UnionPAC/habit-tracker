const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Habit Tracker API" });
});

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/habits", require("./routes/habits"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
