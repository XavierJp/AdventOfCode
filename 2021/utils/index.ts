import fs from "fs";

const extractLines = (file, parseCallback = (el) => parseInt(el, 10)) => {
  const input = fs.readFileSync(file);
  const lines = input.toString().split("\n");
  return lines.filter((line) => line !== "").map(parseCallback);
};

export const extractInput = () => extractLines("./input");
export const extractTest = () => extractLines("./test");
