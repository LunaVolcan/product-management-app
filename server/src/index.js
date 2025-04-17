import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

const client = new Client({ 
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: true
});

client.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get all feedback
async function getFeedback() {
  const result = await client.query("SELECT * FROM feedback ORDER BY pm_id DESC");
  return result.rows;
}

app.get("/get-feedback", async (req, res) => {
  try {
    const feedback = await getFeedback();
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Post new feedback
async function postFeedback(feedback) {
  const result = await client.query(
    "INSERT INTO feedback (title, category, detail) VALUES ($1, $2, $3) RETURNING *",
    [feedback.title, feedback.category, feedback.detail]
  );
  return result.rows[0];
}

app.post("/post-feedback", async (req, res) => {
  try {
    const result = await postFeedback(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error posting feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🎉");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});