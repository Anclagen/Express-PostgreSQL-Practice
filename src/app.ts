import express, { Request, Response } from "express";
import { initRouter } from "./modules/init/route";
import { pool } from "./database";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/init", initRouter);

// Test its working
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express and PostgreSQL with TypeScript!");
});

// Get all users to test the database connection and seeding
app.get("/users", async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
