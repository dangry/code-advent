const fs = require("fs");

const filePath = "./day/1/data.txt";

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
  let finalSum = 0;

  for (let line of lines) {
    let firstNum = "";
    let lastNum = "";

    console.log("----");
    console.log(line);

    for (let i = 0; i < line.length; i++) {
      // console.log(`checking ${i} ${line[i]}`)
      if (isNumber(line[i])) {
        // console.log(`Got number ${line[i]}`)
        firstNum = line[i];
        lastNum = line[i];
        break;
      } else {
        const { pos, result, number } = isSpelledNumber(line, i, spelledTrie);
        // console.log(`new pos ${pos}`)
        // There's a bug here :(
        // i = pos
        if (result) {
          firstNum = number;
          lastNum = number;
          break;
        }
      }
    }

    for (let i = line.length - 1; i >= 0; i--) {
      if (isNumber(line[i])) {
        lastNum = line[i];
        break;
      } else {
        const { pos, result, number } = isSpelledNumberBackwards(
          line,
          i,
          reverseSpelledTrie
        );
        // Bug here as well
        // i = pos
        if (result) {
          lastNum = number;
          break;
        }
      }
    }

    console.log(`firstNum: ${firstNum} - lastNum: ${lastNum}`);

    let stringSum = `${firstNum}${lastNum}`;
    let code = parseInt(stringSum);

    console.log(`Cal value: ${code}`);
    finalSum += code;
  }

  return finalSum;
};

const isNumber = (c) => {
  return c >= "0" && c <= "9";
};

// return new pos and boolean response
const isSpelledNumber = (arr, pos, trie) => {
  if (trie[arr[pos]]) {
    if (trie[arr[pos]].complete) {
      return {
        pos,
        result: true,
        number: trie[arr[pos]].number,
      };
    }
    return isSpelledNumber(arr, pos + 1, trie[arr[pos]]);
  } else {
    return {
      pos,
      result: false,
    };
  }
};

const isSpelledNumberBackwards = (arr, pos, trie) => {
  const trieForPos = trie[arr[pos]];
  if (trieForPos) {
    if (trieForPos.complete) {
      return {
        pos,
        result: true,
        number: trieForPos.number,
      };
    }
    return isSpelledNumberBackwards(arr, pos - 1, trieForPos);
  } else {
    return {
      pos,
      result: false,
    };
  }
};

const spelledTrie = {
  o: {
    n: {
      e: {
        complete: true,
        number: 1,
      },
    },
  },
  t: {
    w: {
      o: {
        complete: true,
        number: 2,
      },
    },
    h: {
      r: {
        e: {
          e: {
            complete: true,
            number: 3,
          },
        },
      },
    },
  },
  f: {
    o: {
      u: {
        r: {
          complete: true,
          number: 4,
        },
      },
    },
    i: {
      v: {
        e: {
          complete: true,
          number: 5,
        },
      },
    },
  },
  s: {
    i: {
      x: {
        complete: true,
        number: 6,
      },
    },
    e: {
      v: {
        e: {
          n: {
            complete: true,
            number: 7,
          },
        },
      },
    },
  },
  e: {
    i: {
      g: {
        h: {
          t: {
            complete: true,
            number: 8,
          },
        },
      },
    },
  },
  n: {
    i: {
      n: {
        e: {
          complete: true,
          number: 9,
        },
      },
    },
  },
};

const reverseSpelledTrie = {
  e: {
    e: {
      r: {
        h: {
          t: {
            complete: true,
            number: 3,
          },
        },
      },
    },
    n: {
      i: {
        n: {
          complete: true,
          number: 9,
        },
      },
      o: {
        complete: true,
        number: 1,
      },
    },
    v: {
      i: {
        f: {
          complete: true,
          number: 5,
        },
      },
    },
  },
  o: {
    w: {
      t: {
        complete: true,
        number: 2,
      },
    },
  },
  r: {
    u: {
      o: {
        f: {
          complete: true,
          number: 4,
        },
      },
    },
  },
  n: {
    e: {
      v: {
        e: {
          s: {
            complete: true,
            number: 7,
          },
        },
      },
    },
  },
  x: {
    i: {
      s: {
        complete: true,
        number: 6,
      },
    },
  },
  t: {
    h: {
      g: {
        i: {
          e: {
            complete: true,
            number: 8,
          },
        },
      },
    },
  },
};
