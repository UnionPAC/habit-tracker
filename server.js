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

// serve static assets in prod
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
