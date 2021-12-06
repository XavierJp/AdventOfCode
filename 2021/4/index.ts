interface ICard {
  values: { [key: string]: number[][] };
  lines: number[][];
  draws: number[][];
}
const sum = (input: number[]) => input.reduce((sum, elem) => sum + elem, 0);

const verify = (card: ICard) => {
  const columns = [0, 0, 0, 0, 0];
  const lines = [0, 0, 0, 0, 0];
  for (let i = 0; i < card.draws.length; i++) {
    const lineIdx = card.draws[i][0];
    lines[lineIdx] += 1;
    if (lines[lineIdx] === 5) {
      return true;
    }
    const colIdx = card.draws[i][1];
    columns[colIdx] += 1;
    if (columns[colIdx] === 5) {
      return true;
    }
  }
  return false;
};

const parseCardLine = (line: string): number[] =>
  line
    .split(" ")
    .filter((el) => el !== "")
    .map((el) => parseInt(el, 10));

const playBingo = (input: string[]) => {
  const draws = input[0].split(",").map((el) => parseInt(el, 10));

  const bingosCards = input
    .slice(1)
    .reduce((cards: ICard[], line: string, index: number) => {
      const valueList = parseCardLine(line);
      if (index % 5 === 0) {
        cards.push({ lines: [], values: {}, draws: [] });
      }
      cards[cards.length - 1].lines.push(parseCardLine(line));

      const linePosition = cards[cards.length - 1].lines.length;
      valueList.forEach((val, index) => {
        if (cards[cards.length - 1].values[val]) {
          cards[cards.length - 1].values[val].push([linePosition, index]);
        } else {
          cards[cards.length - 1].values[val] = [[linePosition, index]];
        }
      });
      return cards;
    }, []);

  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];
    for (let j = 0; j < bingosCards.length; j++) {
      const card = bingosCards[j];
      if (card.values[draw]) {
        bingosCards[j].draws = [...card.draws, ...card.values[draw]];
      }
      if (verify(card)) {
        const allValues = Object.keys(card.values).map((el) =>
          parseInt(el, 10)
        );
        const allDraws = draws.slice(0, i + 1);

        return (
          sum(allValues.filter((el) => allDraws.indexOf(el) === -1)) * draw
        );
      }
    }
  }
};

const lastBingoWin = (input: string[]) => {
  const draws = input[0].split(",").map((el) => parseInt(el, 10));

  const bingosCards = input
    .slice(1)
    .reduce((cards: ICard[], line: string, index: number) => {
      const valueList = parseCardLine(line);
      if (index % 5 === 0) {
        cards.push({ lines: [], values: {}, draws: [] });
      }
      cards[cards.length - 1].lines.push(parseCardLine(line));

      const linePosition = cards[cards.length - 1].lines.length;
      valueList.forEach((val, index) => {
        if (cards[cards.length - 1].values[val]) {
          cards[cards.length - 1].values[val].push([linePosition, index]);
        } else {
          cards[cards.length - 1].values[val] = [[linePosition, index]];
        }
      });
      return cards;
    }, []);

  const cardWinner = {} as any;
  let lastWinner = null;

  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];
    for (let j = 0; j < bingosCards.length; j++) {
      const card = bingosCards[j];
      if (card.values[draw]) {
        bingosCards[j].draws = [...card.draws, ...card.values[draw]];
      }
      if (verify(card)) {
        cardWinner[j] = true;
        lastWinner = card;
      }
    }
    if (Object.keys(cardWinner).length === bingosCards.length && lastWinner) {
      const allValues = Object.keys(lastWinner.values).map((el) =>
        parseInt(el, 10)
      );
      const allDraws = draws.slice(0, i + 1);

      console.log(draw, lastWinner);
      console.log(allValues.filter((el) => allDraws.indexOf(el) === -1));
      console.log(allDraws);
      return sum(allValues.filter((el) => allDraws.indexOf(el) === -1)) * draw;
    }
  }
};

const firstProblem = (input: string[]) => playBingo(input);

const secondProblem = (input: string[]) => lastBingoWin(input);

const lineParser = (el: string) => el;

const shouldRunProd = false;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
