import { sum, range } from "../../helpers/index.ts";

interface IDots {
  dots: { [key: string]: boolean };
  dimmension: number[];
}

const getFoldAndDots = (input: string[]) => {
  const folds = [] as string[];
  const data = { dots: {}, dimmension: [0, 0] } as IDots;
  input.forEach((line) => {
    if (line.startsWith("fold along ")) {
      folds.push(line.replace("fold along ", ""));
    } else if (line !== "") {
      const dot = line.split(",").map((el) => parseInt(el, 10));
      data.dots[line] = true;
      data.dimmension = [
        Math.max(data.dimmension[0], dot[0] + 1),
        Math.max(data.dimmension[1], dot[1] + 1),
      ];
    }
  });
  return { folds, data };
};

const fold = (foldInstruction: string, data: IDots) => {
  const folding = foldInstruction.split("=");
  const dots = data.dots;
  const dimmension = data.dimmension;
  const foldPos = parseInt(folding[1], 10);
  if (folding[0] === "x") {
    for (let x = foldPos; x < dimmension[0]; x++) {
      for (let y = 0; y < dimmension[1]; y++) {
        if (dots[`${x},${y}`]) {
          dots[`${2 * foldPos - x},${y}`] = true;
          delete dots[`${x},${y}`];
        }
      }
    }
    dimmension[0] = foldPos;
  } else {
    for (let x = 0; x < dimmension[0]; x++) {
      for (let y = foldPos; y < dimmension[1]; y++) {
        if (dots[`${x},${y}`]) {
          dots[`${x},${2 * foldPos - y}`] = true;
          delete dots[`${x},${y}`];
        }
      }
    }
    dimmension[1] = foldPos;
  }
  return { dimmension, dots };
};

const printData = (data: IDots) => {
  console.log("======");
  const lines = range(0, data.dimmension[1] - 1).map((l) => {
    const line = range(0, data.dimmension[0] - 1).map((c) =>
      data.dots[`${c},${l}`] ? "*" : "."
    );
    return line.join("");
  });

  lines.forEach((l) => {
    console.log(l);
  });
  console.log(lines.length, lines[0].length);
};

const firstProblem = (input: string[]) => {
  const { folds, data } = getFoldAndDots(input);

  folds.forEach((foldInstruction) => {
    const { dimmension, dots } = fold(foldInstruction, data);
    data.dots = dots;
    data.dimmension = dimmension;
  });

  printData(data);
  return Object.keys(data.dots).length;
};

const secondProblem = (input: string[]) => {};

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
