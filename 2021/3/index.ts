const gammaAndEpsilon = (input: number[][]) => {
  const gamma = [] as number[];
  const epsilon = [] as number[];
  const bitCount = input[0].length;

  for (let i = 0; i < bitCount; i++) {
    gamma[i] = mostCommonBit(input, i);
    epsilon[i] = leastCommonBit(input, i);
  }

  return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
};

const mostCommonBit = (input: number[][], bitPosition: number) => {
  return sumBit(input, bitPosition) >= input.length / 2 ? 1 : 0;
};

const leastCommonBit = (input: number[][], bitPosition: number) => {
  return sumBit(input, bitPosition) < input.length / 2 ? 1 : 0;
};

const sumBit = (input: number[][], bitPosition: number) =>
  input.map((line) => line[bitPosition]).reduce((sum, el) => el + sum, 0);

const oxygenAndCO2 = (input: number[][]) => {
  let bitsOxygen = input;
  let position = 0;

  const maxPosition = input[0].length;
  while (position < maxPosition && bitsOxygen.length > 1) {
    const mostCommon = mostCommonBit(bitsOxygen, position);
    bitsOxygen = bitsOxygen.filter((bit) => bit[position] === mostCommon);
    position += 1;
  }
  const oxygen = parseInt(bitsOxygen[0].join(""), 2);

  let bitsCO2 = input;
  position = 0;
  while (position < maxPosition && bitsCO2.length > 1) {
    const leastCommon = leastCommonBit(bitsCO2, position);
    bitsCO2 = bitsCO2.filter((bit) => bit[position] === leastCommon);
    position += 1;
  }
  const CO2 = parseInt(bitsCO2[0].join(""), 2);
  return oxygen * CO2;
};

const firstProblem = (input: number[][]) => gammaAndEpsilon(input);

const secondProblem = (input: number[][]) => oxygenAndCO2(input);

const lineParser = (el: string) => el.split("").map((num) => parseInt(num, 10));

export { firstProblem, secondProblem, lineParser };
