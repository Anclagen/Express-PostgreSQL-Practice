import { faker } from "@faker-js/faker";
import { pool } from "../../database";

// Function to generate and insert data
export async function generateData(numRecords: number) {
  const client = await pool.connect();

  try {
    // Begin a transaction, used to rollback if an error occurs as well as insert all records at once
    await client.query("BEGIN");
    for (let i = 0; i < numRecords; i++) {
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const age = faker.number.int({ min: 18, max: 99 });
      const sex = faker.string.fromCharacters(["male", "female", "other"]);
      const country = faker.location.country();
      const city = faker.location.city();
      const job = faker.person.jobTitle();

      // Insert data using parameterized query
      await client.query("INSERT INTO users (name, email, age, sex, country, city, job) VALUES ($1, $2, $3, $4, $5, $6, $7)", [name, email, age, sex, country, city, job]);
    }

    // Commit the transaction to insert all records at once
    await client.query("COMMIT");
    console.log(`${numRecords} records inserted successfully.`);
  } catch (error) {
    // Rollback the transaction if an error occurs so that no records are inserted
    await client.query("ROLLBACK");
    console.error("Error inserting data:", error);
  } finally {
    client.release();
  }
}

// // Number of records to insert
// const numRecords = 1000;
// generateData(numRecords).then(() => pool.end());
