const isSymbol = (char: string) => {
  // return char === "*";
  if (!char) {
    throw new Error("Should not happen");
  }
  return char !== "." && Number.isNaN(parseInt(char, 10));
};

const firstProblem = (input: string[]) => {
  let validSum = 0;

  for (let l = 0; l < input.length; l++) {
    const line = input[l];

    let currentNumber = "";

    for (let c = 0; c < line.length; c++) {
      const char = line[c];

      if (char === "." || c === line.length - 1) {
        if (c === line.length - 1 && char !== ".") {
          currentNumber += char;
        }
        // look for adjacent above, before and below
        if (currentNumber.length === 0) {
          continue;
        }
        try {
          if (l > 0) {
            // above
            for (
              let u = Math.max(0, c - currentNumber.length - 1);
              u < Math.min(c + 1, line.length);
              u++
            ) {
              if (isSymbol(input[l - 1][u])) {
                throw new Error("adjacent above");
              }
            }
          }
          if (c - currentNumber.length > 0) {
            //before
            if (isSymbol(input[l][c - currentNumber.length - 1])) {
              throw new Error("adjacent before");
            }
          }
          if (c - currentNumber.length > 0) {
            //before
            if (isSymbol(input[l][c - currentNumber.length - 1])) {
              throw new Error("adjacent before");
            }
          }
          if (l + 1 < input.length) {
            // below
            for (
              let u = Math.max(0, c - 1 - currentNumber.length);
              u < Math.min(c + 1, line.length);
              u++
            ) {
              if (isSymbol(input[l + 1][u])) {
                throw new Error("adjacent below");
              }
            }
          }
        } catch (e) {
          validSum += parseInt(currentNumber);
        } finally {
          currentNumber = "";
        }
      } else if (isSymbol(char)) {
        // symbol we can eliminate current number
        if (currentNumber.length > 0) {
          validSum += parseInt(currentNumber);
        }
        currentNumber = "";
      } else {
        currentNumber += char;
      }
    }
  }
  return validSum;
};

const secondProblem = (input: string[]) => {
  const store = (l: number, c: number, currentNumber: string) => {
    if (currentNumber.length > 0) {
      const kk = `${l}_${c}`;
      symbols[kk] = [...(symbols[kk] || []), parseInt(currentNumber, 10)];
    }
  };

  const symbols = {} as { [symbol: string]: number[] };

  for (let l = 0; l < input.length; l++) {
    const line = input[l];

    let currentNumber = "";

    for (let c = 0; c < line.length; c++) {
      const char = line[c];

      if (char === "." || c === line.length - 1) {
        if (c === line.length - 1 && char !== ".") {
          currentNumber += char;
        }
        if (l > 0) {
          // above
          for (
            let u = Math.max(0, c - currentNumber.length - 1);
            u < Math.min(c + 1, line.length);
            u++
          ) {
            if (isSymbol(input[l - 1][u])) {
              store(l - 1, u, currentNumber);
            }
          }
        }
        if (c - currentNumber.length > 0) {
          //before
          if (isSymbol(input[l][c - currentNumber.length - 1])) {
            store(l, c - currentNumber.length - 1, currentNumber);
          }
        }
        if (l + 1 < input.length) {
          // below
          for (
            let u = Math.max(0, c - 1 - currentNumber.length);
            u < Math.min(c + 1, line.length);
            u++
          ) {
            if (isSymbol(input[l + 1][u])) {
              store(l + 1, u, currentNumber);
            }
          }
        }
        currentNumber = "";
      } else if (isSymbol(char)) {
        store(l, c, currentNumber);
        currentNumber = "";
      } else {
        currentNumber += char;
      }
    }
  }
  return Object.values(symbols)
    .filter((e) => e.length === 2)
    .map(([a, b]) => a * b)
    .reduce((sum, items) => sum + items, 0);
  // return Object.values(symbols)
  //   .flatMap((a) => a)
  //   .reduce((sum, items) => sum + items, 0);
};

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
