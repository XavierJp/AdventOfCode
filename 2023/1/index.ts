const calibrate = (input: string[]) => {
  let calibration = 0;
  input.forEach((line) => {
    const digits = line.match(/\d/g);
    if (digits) {
      calibration += parseInt(`${digits[0]}${digits[digits.length - 1]}`, 10);
    }
  });
  return calibration;
};

const firstProblem = (input: string[]) => calibrate(input);

const calibrateWithLetters = (input: string[]) => {
  const newInput = [];

  const digits = [
    "one", // 0
    "two", // 1
    "three", // 2
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const val = ["o", "t", "f", "s", "e", "n"];

  input.forEach((line) => {
    let newLine = "";
    let i = 0;
    while (i <= line.length) {
      const char = line[i];

      if (val.indexOf(char) > -1) {
        digits.forEach((d, index) => {
          if (line.indexOf(d, i) === i) {
            console.log(d);
            newLine += (index + 1).toString();
          }
        });
      } else if (/\d/.test(char)) {
        newLine += char;
      }
      i++;
    }
    newInput.push(newLine);
  });
  return calibrate(newInput);
};

const secondProblem = (input: number[]) => calibrateWithLetters(input);

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
