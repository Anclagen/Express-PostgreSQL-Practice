import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
const port = 3000;

// pool instance for database connections
const pool = new Pool({
  user: "USER",
  host: "localhost",
  database: "DATABASE",
  password: "PASSWORD123",
  port: 5432,
});

// Middleware to parse JSON bodies
app.use(express.json());

// Test its working
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express and PostgreSQL with TypeScript!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
