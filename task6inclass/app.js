const fs = require("fs");
const path = require("path");
const dirpath = path.join(__dirname);

const outputPath = path.join(dirpath, "output.txt");
fs.writeFileSync(outputPath, "");
for (let i = 1; i <= 10; i++) {
  const filePath = path.join(dirpath, `${i}.txt`);
  if (fs.existsSync(filePath)) {
    const textIn = fs.readFileSync(filePath, "utf-8");

    const lines = textIn.split("\n");

    const selectedLines = lines.slice(0, i);
    fs.appendFileSync(outputPath, `\n${selectedLines.join("\n")}`);
  }
}
console.log("Processing complete. Check output.txt for results.");