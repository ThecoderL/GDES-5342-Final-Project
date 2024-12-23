import express from "express";
import { Pool } from "pg";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config();

const app = express();
const port = 3300;

// Middleware
app.use(cors());
app.use(express.json());

//PostgreSQL Database Connection using DATABASE_URL from .env.local
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // SSL connection for secure communication
});

// Connect to the PostgreSQL database
pool.connect((err) => {
    if (err) {
        console.error("Error connecting to the PostgreSQL database:", err.message);
        return;
    }
    console.log("Connected to the PostgreSQL database.");
});

// API Route: Get all buildings with their floors and bathrooms
app.get("/api/buildings", (req, res) => {
    const query = `
    SELECT b.name AS BuildingName, b.building_id AS BuildingID
    FROM Buildings b
  `;
    pool.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        res.json(results.rows); // .rows for PostgreSQL
    });
});

app.get("/api/buildings/search", (req, res) => {
    const { name } = req.query; // Get the search query
    const query = `
    SELECT DISTINCT b.name AS BuildingName, b.building_id AS BuildingID
    FROM Buildings b
    WHERE b.name LIKE $1
    `;
    pool.query(query, [`%${name}%`], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        res.json(results.rows); // .rows for PostgreSQL
    });
});

// API Route: Get specific building details by ID
app.get("/api/buildings/:id", (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT b.name AS BuildingName, b.building_id AS BuildingID, b.image_url AS ImageURL
    FROM Buildings b
    WHERE b.building_id = $1
  `;
    pool.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        if (results.rows.length === 0) {
            res.status(404).json({ error: "Building not found" });
            return;
        }
        res.json(results.rows[0]); // Returning the first row
    });
});

// Get Floors in a Building
app.get("/api/buildings/:id/floors", (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT f.floor_id AS FloorID, f.floor_number AS FloorNumber
    FROM Floors f
    WHERE f.building_id = $1
    `;
    pool.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        res.json(results.rows);
    });
});

// Get Bathrooms on a floor
app.get("/api/floors/:id/bathrooms", (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT b.bathroom_id AS BathroomID, b.gender AS BathroomType, b.image_url AS ImageURL
    FROM Bathrooms b
    WHERE b.floor_id = $1
    `;
    pool.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        res.json(results.rows);
    });
});

// Get reviews for a specific bathroom
app.get("/api/bathrooms/:id/reviews", (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT r.review_id, r.reviewer_name, r.rating, r.review_text
        FROM Reviews r
        WHERE r.bathroom_id = $1
    `;
    pool.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        if (results.rows.length === 0) {
            res.status(404).json({ message: "Reviews not found for this bathroom" });
            return;
        }
        res.json(results.rows);
    });
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
