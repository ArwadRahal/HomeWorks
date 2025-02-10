const express = require("express");
const app = express();
const PORT = 3001;

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

module.exports = logger;

app.get("/", (req, res) => {
  res.send("ברוכים הבאים לדף הבית!");
});

app.get(
  "/admin",
  (req, res, next) => {
    console.log("Middleware only for /admin");
    const user = req.query.user;
    if (user !== "admin") {
      return res.status(403).send("Access Denied");
    }
    next();
  },
  (req, res) => {
    res.send("ברוכים הבאים לעמוד הניהול!");
  }
);

app.get("/public", (req, res) => {
  res.send("זהו דף ציבורי.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
