import { sum, range } from "../../helpers/index.ts";

const polymerize = (input: string[], steps: number) => {
  let polymer = input[0];
  const pairs = {} as { [key: string]: string };

  input.slice(1).forEach((line) => {
    const pair = line.split(" -> ");
    pairs[pair[0]] = pair[1];
  });

  for (let step = 0; step < steps; step++) {
    let tmpPolymer = polymer;
    let i = 0;
    while (i < tmpPolymer.length - 1) {
      const pair = `${tmpPolymer[i]}${tmpPolymer[i + 1]}`;
      if (pairs[pair]) {
        tmpPolymer =
          tmpPolymer.substring(0, i + 1) +
          pairs[pair] +
          tmpPolymer.substring(i + 1, tmpPolymer.length);

        i += 2;
      } else {
        i += 1;
      }
    }
    polymer = tmpPolymer;
  }
  return polymer;
};

const smartPolymerize = (input: string[], steps: number) => {
  const pairCounterFactory = () => {
    const tmp = {} as { [key: string]: number };
    input.slice(1).forEach((line) => {
      const pair = line.split(" -> ");
      tmp[pair[0]] = 0;
    });
    return tmp;
  };

  let initial = input[0].split("");
  const pairs = {} as { [key: string]: string };
  let pairCounter = pairCounterFactory();
  const letterCounter = {} as { [key: string]: number };

  input.slice(1).forEach((line) => {
    const pair = line.split(" -> ");
    pairs[pair[0]] = pair[1];
    pairCounter[pair[0]] = 0;
    letterCounter[pair[0][0]] = 0;
    letterCounter[pair[0][1]] = 0;
  });

  pairCounter = initial.reduce((acc, str, index) => {
    const pair = `${initial[index - 1]}${str}`;
    if (index > 0) {
      if (acc[pair]) {
        acc[pair] += 1;
      } else {
        acc[pair] = 1;
      }
    }
    return acc;
  }, {} as any);

  initial.forEach((letter) => (letterCounter[letter] += 1));

  for (let step = 0; step < steps; step++) {
    const newPairCounter = pairCounterFactory();
    Object.keys(pairCounter).forEach((pair) => {
      const newLetter = pairs[pair];
      letterCounter[newLetter] += pairCounter[pair];
      const pair1 = pair[0] + newLetter;
      const pair2 = newLetter + pair[1];
      newPairCounter[pair1] += pairCounter[pair];
      newPairCounter[pair2] += pairCounter[pair];
    });
    pairCounter = newPairCounter;
  }
  return letterCounter;
};

const firstProblem = (input: string[]) => {
  const polymer = polymerize(input, 10);

  const counter = polymer
    .split("")
    .reduce((acc: { [key: string]: number }, mol) => {
      if (acc[mol]) {
        acc[mol] += 1;
      } else {
        acc[mol] = 1;
      }
      return acc;
    }, {});

  const most = Math.max(...Object.values(counter));
  const least = Math.min(...Object.values(counter));
  return most - least;
};

const secondProblem = (input: string[]) => {
  const counter = smartPolymerize(input, 40);
  const most = Math.max(...Object.values(counter));
  const least = Math.min(...Object.values(counter));
  return most - least;
};

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
