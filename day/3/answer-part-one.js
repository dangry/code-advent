const fs = require("fs");

const filePath = "./day/3/data.txt";

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

const processLines = (lines) => {
  let validNumbersSum = 0;

  for (let i = 0; i < lines[0].length; i++) {
    let number;
    let valid;

    for (let j = 0; j < lines.length; j++) {
      if (isNumber(lines[i][j])) {
        if (!number) {
          number = "";
        }
        number += lines[i][j];
        valid = valid || isSoroundingValid(lines, i, j);
      } else {
        if (number && valid) {
          validNumbersSum += Number(number);
          console.log(`IS VALID ${number}`);
        }
        valid = false;
        number = undefined;
      }
    }

    if (number && valid) {
      validNumbersSum += Number(number);
      console.log(`IS VALID ${number}`);
    }

    valid = false;
    number = undefined;
  }

  return validNumbersSum;
};

const isNumber = (c) => {
  return c >= "0" && c <= "9";
};

const isSoroundingValid = (lines, i, j) => {
  return (
    checkLeft(lines, i, j) ||
    checkRight(lines, i, j) ||
    checkUp(lines, i, j) ||
    checkDown(lines, i, j) ||
    checkUpLeft(lines, i, j) ||
    checkUpRight(lines, i, j) ||
    checkDownRight(lines, i, j) ||
    checkDownLeft(lines, i, j)
  );
};

const checkLeft = (lines, i, j) => {
  if (j > 0) {
    return isValidChar(lines[i][j - 1]);
  }

  return false;
};

const checkRight = (lines, i, j) => {
  if (j < lines[0].length - 1) {
    return isValidChar(lines[i][j + 1]);
  }

  return false;
};

const checkUp = (lines, i, j) => {
  if (i > 0) {
    return isValidChar(lines[i - 1][j]);
  }

  return false;
};

const checkDown = (lines, i, j) => {
  if (i < lines.length - 1) {
    return isValidChar(lines[i + 1][j]);
  }

  return false;
};

const checkUpLeft = (lines, i, j) => {
  if (i > 0 && j > 0) {
    return isValidChar(lines[i - 1][j - 1]);
  }

  return false;
};

const checkUpRight = (lines, i, j) => {
  if (i > 0 && j < lines[0].length - 1) {
    return isValidChar(lines[i - 1][j + 1]);
  }

  return false;
};

const checkDownRight = (lines, i, j) => {
  if (i < lines.length - 1 && j < lines[0].length - 1) {
    return isValidChar(lines[i + 1][j + 1]);
  }

  return false;
};

const checkDownLeft = (lines, i, j) => {
  if (i < lines.length - 1 && j > 0) {
    return isValidChar(lines[i + 1][j - 1]);
  }

  return false;
};

const isValidChar = (c) => {
  const valid = !isNumber(c) && c != ".";
  // if (valid) console.log(`valid ${c}`);
  return valid;
};
