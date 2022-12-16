const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/habits", require("./routes/habits"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
