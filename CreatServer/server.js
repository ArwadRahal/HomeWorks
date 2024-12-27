const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(
      path.join(__dirname, "templates", "page.html"),
      "utf8",
      (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error loading page");
          return;
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    );
  } else if (req.url.endsWith(".css")) {
    const cssPath = path.join(__dirname, "templates", req.url);
    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("CSS file not found");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
