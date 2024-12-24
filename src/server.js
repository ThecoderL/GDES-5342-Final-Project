import express from "express";
import pkg from "pg";  // Import the pg package
import cors from "cors";
import dotenv from "dotenv";
import * as http from "node:http";

// Load environment variables from .env
dotenv.config();

const { Pool } = pkg; // Destructure Pool from pg
const app = express();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Database Connection using DATABASE_URL from .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // SSL connection for secure communication
});

// Async function to query the database
async function queryDatabase(query, values) {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(query, values);
        return rows;
    } finally {
        client.release();
    }
}

// API Route: Get all buildings with their floors and bathrooms
app.get("/api/buildings", async (req, res) => {
    const query = `
    SELECT b.name AS BuildingName, b.building_id AS BuildingID
    FROM Buildings b
  `;
    try {
        const buildings = await queryDatabase(query);
        res.json(buildings);
    } catch (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ error: "Database query error" });
    }
});

// API Route: Search buildings by name
app.get("/api/buildings/search", async (req, res) => {
    const { name } = req.query;
    const query = `
    SELECT DISTINCT b.name AS BuildingName, b.building_id AS BuildingID
    FROM Buildings b
    WHERE b.name LIKE $1
  `;
    try {
        const buildings = await queryDatabase(query, [`%${name}%`]);
        res.json(buildings);
    } catch (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ error: "Database query error" });
    }
});

// API Route: Get specific building details by ID
app.get("/api/buildings/:id", async (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT b.name AS BuildingName, b.building_id AS BuildingID, b.image_url AS ImageURL
    FROM Buildings b
    WHERE b.building_id = $1
  `;
    try {
        const buildings = await queryDatabase(query, [id]);
        if (buildings.length === 0) {
            res.status(404).json({ error: "Building not found" });
            return;
        }
        res.json(buildings[0]);
    } catch (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ error: "Database query error" });
    }
});

// API Route: Get floors in a building
app.get("/api/buildings/:id/floors", async (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT f.floor_id AS FloorID, f.floor_number AS FloorNumber
    FROM Floors f
    WHERE f.building_id = $1
  `;
    try {
        const floors = await queryDatabase(query, [id]);
        res.json(floors);
    } catch (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ error: "Database query error" });
    }
});

// API Route: Get bathrooms on a floor
app.get("/api/floors/:id/bathrooms", async (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT b.bathroom_id AS BathroomID, b.gender AS BathroomType, b.image_url AS ImageURL
    FROM Bathrooms b
    WHERE b.floor_id = $1
  `;
    try {
        const bathrooms = await queryDatabase(query, [id]);
        res.json(bathrooms);
    } catch (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ error: "Database query error" });
    }
});

// API Route: Get reviews for a specific bathroom
app.get("/api/bathrooms/:id/reviews", async (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT r.review_id, r.reviewer_name, r.rating, r.review_text
    FROM Reviews r
    WHERE r.bathroom_id = $1
  `;
    try {
        const reviews = await queryDatabase(query, [id]);
        if (reviews.length === 0) {
            res.status(404).json({ message: "Reviews not found for this bathroom" });
            return;
        }
        res.json(reviews);
    } catch (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ error: "Database query error" });
    }
});

// Start the server
const startServer = (port) => {
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.log(`Port ${port} is in use. Trying ${port + 1}...`);
            startServer(port + 1); // Try the next port
        } else {
            console.error("Server error:", err);
        }
    });
};

// Start listening
const port = parseInt(process.env.PORT, 10) || 3000;
startServer(port);