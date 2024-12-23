import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { dbConfig } from "./config.js";


const app = express();
const port = 3300;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection(dbConfig); // For security purposes, I've abstracted my database connection

// Connect to the Database
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the MySQL database.");
});


// API Route: Get all buildings with their floors and bathrooms
app.get("/api/buildings", (req, res) => {
    const query = `
    SELECT b.name AS BuildingName, b.building_id AS BuildingID
    FROM Buildings b
  `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        res.json(results);
    });
});

app.get("/api/buildings/search", (req, res) => {
    const { name } = req.query; // Get the search query
    const query = `
    SELECT DISTINCT b.name AS BuildingName, b.building_id AS BuildingID
    FROM Buildings b
    WHERE b.name LIKE ?
    `;
    db.query(query, [`%${name}%`], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        res.json(results);
    });
});

// API Route: Get specific building details by ID
app.get("/api/buildings/:id", (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT b.name AS BuildingName, b.building_id AS BuildingID, b.image_url AS ImageURL
    FROM Buildings b
    WHERE b.building_id = ?
  `;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Building not found" });
            return;
        }
        res.json(results[0]);
    });
});

//Get Floors in a Building
app.get("/api/buildings/:id/floors", (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT f.floor_id AS FloorID, f.floor_number AS FloorNumber
    FROM Floors f
    WHERE f.building_id = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        res.json(results);
    });
});

//Get Bathrooms on a floor
app.get("/api/floors/:id/bathrooms", (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT b.bathroom_id AS BathroomID, b.gender AS BathroomType, b.image_url AS ImageURL
    FROM Bathrooms b
    WHERE b.floor_id = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        res.json(results);
    });
});

// Get reviews for a specific bathroom
app.get("/api/bathrooms/:id/reviews", (req, res) => {
    const { id } = req.params;  // Extract the bathroomId from the request parameters
    const query = `
        SELECT r.review_id, r.reviewer_name, r.rating, r.review_text
        FROM Reviews r
        WHERE r.bathroom_id = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "Reviews not found for this bathroom" });
            return;
        }
        res.json(results);
    });
});




// app.get("/api/buildings/amenities-search", (req, res) => {
//     const { name } = req.query; // Get the search query
//     const query = `
//     SELECT DISTINCT BuildingName
//     FROM Buildings
//     WHERE BuildingName LIKE ?
//     `;
//     db.query(query, [`%${name}%`], (err, results) => {
//         if (err) {
//             console.error("Error executing query:", err.message);
//             res.status(500).json({ error: "Database query error" });
//             return;
//         }
//         res.json(results);
//     });
// });


// Start the Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
