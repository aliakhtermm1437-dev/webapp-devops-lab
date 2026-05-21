const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST || "mysql-service",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "rootpassword",
  database: process.env.DB_NAME || "webappdb"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database");

    db.query(`
      CREATE TABLE IF NOT EXISTS visits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        message VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.query(
      "INSERT INTO visits (message) VALUES (?)",
      ["User visited the web application"]
    );
  }
});

app.get("/", (req, res) => {
  db.query("SELECT COUNT(*) AS totalVisits FROM visits", (err, result) => {
    const visits = err ? "Database not connected" : result[0].totalVisits;

    res.send(`
      <html>
        <head>
          <title>DevOps Lab Project</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f4f8fb;
              text-align: center;
   
           padding-top: 80px;
            }
            .card {
              background: white;
              width: 650px;
              margin: auto;
              padding: 40px;
              border-radius: 15px;
              box-shadow: 0 0 15px rgba(0,0,0,0.15);
            }
            h1 {
              color: #0b5ed7;
            }
            p {
              font-size: 18px;
              color: #333;
            }
            .db {
              color: green;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Jenkins CI/CD Lab Project</h1>
            <p>This web application is deployed using Docker and Kubernetes.</p>
            <p>CI/CD automation is managed by Jenkins.</p>
            <p>Prometheus and Grafana are used for monitoring.</p>
            <p class="db">Database Visit Count: ${visits}</p>
          </div>
        </body>
      </html>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
