import dotenv from "dotenv";
import * as http from "node:http";
import { neon } from "@neondatabase/serverless";
import cors from "cors";
import express from "express";

dotenv.config();

const app = express();

// app.use(cors());
app.use(express.json());

app.use(cors({
    origin: true
}));


const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
    try {
        const result = await sql`SELECT version()`;
        const { version } = result[0];
        // res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(version);
    } catch (err) {
        console.error("Error executing query:", err.message);
        // res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
    }
};

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
        // res.status(500).json({ error: "Database query error" });
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


http.createServer(requestHandler).listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
