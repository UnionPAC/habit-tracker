const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/habits", require("./routes/habits"));

// set static folder
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html", (err) =>
      res.status(500).send(err)
    )
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
