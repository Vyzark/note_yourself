// Creation and configuration of the Express APP
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route configuration
app.use("/api", require("./routes/api"));

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json(err);
});

module.exports = app;
