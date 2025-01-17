const http = require("http");
const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "/templates");
const htmlFilePath = path.join(dirPath, "page.html");
const cssFilePath = path.join(dirPath, "style.css");

const server = http.createServer((req, res) => {
  if (req.url === "/style.css") {
    res.setHeader("Content-Type", "text/css");
    fs.createReadStream(cssFilePath).pipe(res);
  } else {
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream(htmlFilePath).pipe(res);
  }
});

server.listen(5000, () => {
  console.log("Server working on port 5000");
});
