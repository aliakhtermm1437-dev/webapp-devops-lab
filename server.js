const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
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
          .tag {
            margin-top: 25px;
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
          <p class="tag">Prometheus and Grafana are used for monitoring.</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
