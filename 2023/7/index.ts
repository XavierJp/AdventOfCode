const defaultCards = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
const JCards = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

const countCard = (hand: string[]): { [key: string]: number } =>
  hand.reduce((counter, card) => {
    counter[card] = (counter[card] || 0) + 1;
    return counter;
  }, {});

const strength = (handAsString: string, withJ = false) => {
  let hand = handAsString.split(" ")[0].split("");
  let J = 0;

  if (withJ) {
    J = hand.filter((e) => e === "J").length;
  }

  const cardCounts = Object.values(countCard(hand)).sort().reverse().join("");
  switch (cardCounts) {
    case "5":
      return 6;
    case "41":
      if (J === 4 || J === 1) {
        return 6;
      }
      return 5;
    case "32":
      if (J === 2 || J === 3) {
        return 6;
      }
      return 4;
    case "311":
      if (J === 3 || J === 1) {
        return 5;
      }
      return 3;
    case "221":
      if (J === 2) {
        return 5;
      }
      if (J === 1) {
        return 4;
      }
      return 2;
    case "2111":
      if (J === 2 || J === 1) {
        return 3;
      }
      return 1;
    case "11111":
      if (J === 1) {
        return 1;
      }
      return 0;
  }
  throw new Error("Should not happen");
};

const compare = (handA: string, handB: string, withJ = false) => {
  const strengthA = strength(handA, withJ);
  const strengthB = strength(handB, withJ);
  const cards = withJ ? JCards : defaultCards;

  if (strengthA < strengthB) {
    return -1;
  }
  if (strengthB < strengthA) {
    return +1;
  }

  for (let i = 0; i < 5; i++) {
    const cardAStrength = cards.indexOf(handA[i]);
    const cardBStrength = cards.indexOf(handB[i]);
    if (cardAStrength < cardBStrength) {
      return 1;
    }
    if (cardAStrength > cardBStrength) {
      return -1;
    }
  }
  throw new Error("should not happen");
};

const firstProblem = (input: string[]) => {
  return input
    .sort(compare)
    .map((e, index) => {
      const score = parseInt(e.split(" ")[1], 10) * (index + 1);
      return score;
    })
    .reduce((sum, el) => sum + el, 0);
};

const secondProblem = (input: string[]) => {
  return input
    .sort((a, b) => compare(a, b, true))
    .map((e, index) => {
      console.log(e);
      const score = parseInt(e.split(" ")[1], 10) * (index + 1);
      return score;
    })
    .reduce((sum, el) => sum + el, 0);
};

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
