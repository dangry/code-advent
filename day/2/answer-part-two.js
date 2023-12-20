const fs = require("fs");

const filePath = "./day/2/data.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("An error occurred while reading the file:", err);
    return;
  }

  // Split the file content by new lines
  const lines = data.split(/\r?\n/);

  const answer = processLines(lines);
  console.log(answer);
});

let powerSum = 0;

const processLines = (lines) => {
  for (let line of lines) {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    let gameNumber = 0;
    const elements = line
      .toLowerCase()
      .replaceAll(" ", "")
      .replaceAll(";", ",")
      .replaceAll(":", ",")
      .split(",");
    let shouldSkip = false;

    for (let element of elements) {
      if (element.indexOf("red") > -1) {
        let redCount = Number(element.replace("red", ""));
        if (redCount >= maxRed) {
          maxRed = redCount;
        }
      } else if (element.indexOf("green") > -1) {
        let greenCount = Number(element.replace("green", ""));
        if (greenCount >= maxGreen) {
          maxGreen = greenCount;
        }
      } else if (element.indexOf("blue") > -1) {
        let blueCount = Number(element.replace("blue", ""));
        if (blueCount >= maxBlue) {
          maxBlue = blueCount;
        }
      }
    }

    powerSum += maxBlue * maxGreen * maxRed;
  }

  console.log(powerSum);
};
