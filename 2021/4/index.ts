import { sum, range } from "../../helpers/index.ts";
interface ICard2 {
  lines: number[][];
  draws: (number | string)[][];
  hasWon: boolean;
}
const parseCardLine = (line: string): number[] =>
  line
    .split(" ")
    .filter((el) => el !== "")
    .map((el) => parseInt(el, 10));

const verifyCard = (card: ICard2) => {
  for (let i = 0; i < 5; i++) {
    const lineSuccess = card.draws[i].filter((el) => el === "*").length === 0;
    const columnSuccess =
      card.draws.map((el) => el[i]).filter((el) => el === "*").length === 0;

    if (lineSuccess || columnSuccess) {
      return true;
    }
  }

  return false;
};

const getScore = (card: ICard2, draw: number) => {
  let score = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (card.draws[i][j] === "*") {
        score += card.lines[i][j];
      }
    }
  }
  return score * draw;
};

const playBingo2 = (input: string[], strategyLast = false) => {
  const draws = input[0].split(",").map((el) => parseInt(el, 10));

  const bingoCards = range(0, Math.floor((input.length - 1) / 5) - 1).reduce(
    (bingoCards: ICard2[], cardIdx: number) => {
      bingoCards.push({
        lines: input
          .slice(cardIdx * 5 + 1, (cardIdx + 1) * 5 + 1)
          .map(parseCardLine),
        draws: [
          ["*", "*", "*", "*", "*"],
          ["*", "*", "*", "*", "*"],
          ["*", "*", "*", "*", "*"],
          ["*", "*", "*", "*", "*"],
          ["*", "*", "*", "*", "*"],
        ],
        hasWon: false,
      });
      return bingoCards;
    },
    []
  );

  let score = 0;
  draws.forEach((draw) => {
    bingoCards.forEach((card) => {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (card.lines[i][j] === draw) {
            card.draws[i][j] = 1;
          }
        }
      }
      const hasWon = verifyCard(card);

      if (score === 0 && hasWon) {
        if (strategyLast) {
          card.hasWon = true;
          if (bingoCards.every((c) => c.hasWon)) {
            score = getScore(card, draw);
          }
        } else {
          if (!card.hasWon) {
            score = getScore(card, draw);
            card.hasWon = true;
          }
        }
      }
    });
  });
  return score;
};

const firstProblem = (input: string[]) => playBingo2(input);

const secondProblem = (input: string[]) => playBingo2(input, true);

const lineParser = (el: string) => el;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
