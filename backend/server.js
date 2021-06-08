require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

// Middleware
app.use(express.json()); // allows json data synced through the body
app.use(cors());

// Routes
app.use("/api/v1/locations", require("./routes/locationRoutes"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.use("/api/v1/locations", locations);

// Goes to route not in our route file
// app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));
