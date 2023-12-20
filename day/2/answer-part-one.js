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

const maxRedCubes = 12;
const maxGreenCubes = 13;
const maxBlueCubes = 14;
let possibleGameCount = 0;

const processLines = (lines) => {
  for (let line of lines) {
    let gameNumber = 0;
    const elements = line
      .toLowerCase()
      .replaceAll(" ", "")
      .replaceAll(";", ",")
      .replaceAll(":", ",")
      .split(",");
    let shouldSkip = false;

    for (let element of elements) {
      if (element.indexOf("game") > -1) {
        gameNumber = Number(element.replace("game", ""));
      } else if (element.indexOf("red") > -1) {
        let redCount = Number(element.replace("red", ""));
        if (redCount > maxRedCubes) {
          //   console.log(`NOT POSSIBLE IN GAME ${gameNumber} red ${redCount}`);
          shouldSkip = true;
          break;
        }
      } else if (element.indexOf("green") > -1) {
        let greenCount = Number(element.replace("green", ""));
        if (greenCount > maxGreenCubes) {
          //   console.log(`NOT POSSIBLE IN GAME ${gameNumber} green ${greenCount}`);
          shouldSkip = true;
          break;
        }
      } else if (element.indexOf("blue") > -1) {
        let blueCount = Number(element.replace("blue", ""));
        if (blueCount > maxBlueCubes) {
          //   console.log(`NOT POSSIBLE IN GAME ${gameNumber} blue ${blueCount}`);
          shouldSkip = true;
          break;
        }
      }
    }
    if (shouldSkip) continue;

    // console.log(`POSSIBLE IN GAME ${gameNumber}`);
    possibleGameCount += gameNumber;
  }

  console.log(possibleGameCount);
};
