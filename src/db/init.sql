-- init.sql
-- Drop the table if it exists for a clean setup
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT NOT NULL,
    sex VARCHAR(10) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    job VARCHAR(100) NOT NULL
);