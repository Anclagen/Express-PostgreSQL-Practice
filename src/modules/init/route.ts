import express from "express";
import fs from "fs";
import path from "path";
import { pool } from "../../database";
import { generateData } from "./generateData";

export const initRouter = express.Router();

//Setup the database
initRouter.get("/init-db", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../../db/init.sql");
    const sql = fs.readFileSync(filePath).toString();
    await pool.query(sql);

    res.send("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).send("Error initializing database.");
  }
});

//Seed the database with dummy data
initRouter.get("/seed-db", async (req, res) => {
  try {
    const numRecords = 1000;
    await generateData(numRecords);

    res.send(`${numRecords} records inserted successfully.`);
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database.");
  }
});
