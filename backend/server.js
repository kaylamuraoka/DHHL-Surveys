// FILE FOR MAIN SERVER CODE
import express from "express";
import cors from "cors";
import locations from "./api/locations.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/locations", locations);

// Goes to route not in our route file
app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

export default app;
