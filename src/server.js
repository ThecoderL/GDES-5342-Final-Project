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
    SELECT b.BuildingName
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
    SELECT DISTINCT BuildingName, BuildingID
    FROM Buildings
    WHERE BuildingName LIKE ?
    GROUP BY BuildingID, BuildingName
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
