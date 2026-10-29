// Minimal static server for the AI LEGENDS prototype.
// Authentication, database, real AI API and billing are intentionally NOT enabled yet.
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.disable("x-powered-by");
app.use(express.static(__dirname, { extensions: ["html"] }));
app.get("/health", (_req, res) => res.json({ ok: true, app: "AI LEGENDS", mode: "prototype" }));
app.listen(PORT, "0.0.0.0", () => console.log(`AI LEGENDS running on http://localhost:${PORT}`));
