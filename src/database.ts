import { Pool } from "pg";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Parse the database port
const dbPort = parseInt(process.env.PORT || "5432", 10);
if (isNaN(dbPort)) {
  throw new Error("Invalid database port number. Please set a valid DB_PORT environment variable.");
}

// Create and export the PostgreSQL connection pool
export const pool = new Pool({
  user: process.env.USER, // PostgreSQL username
  host: process.env.HOST, // Database host
  database: process.env.DB, // Database name
  password: process.env.PASSWORD, // Password
  port: dbPort, // Database port
});

// Check the database connection is successful
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Database connected successfully.");
  release();
});
