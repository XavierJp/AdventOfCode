const firstProblem = (input: string[]) => {
  return input
    .map((game, index) => {
      try {
        game
          .split(": ")[1]
          .split("; ")
          .forEach((tirage) => {
            let sum = 0;
            tirage.split(", ").forEach((colorTirage) => {
              const [count, color] = colorTirage.split(" ");
              const countInt = parseInt(count, 10);

              if (
                (color === "red" && countInt > 12) ||
                (color === "green" && countInt > 13) ||
                (color === "blue" && countInt > 14)
              ) {
                throw new Error("cant do");
              }

              sum += countInt;
            });
          });
        return index + 1;
      } catch {
        return 0;
      }
    })
    .reduce((sum, el) => sum + el, 0);
};

const secondProblem = (input: string[]) => {
  return input
    .map((game, index) => {
      let mins = {};
      game
        .split(": ")[1]
        .split("; ")
        .forEach((tirage) => {
          tirage.split(", ").forEach((colorTirage) => {
            const [count, color] = colorTirage.split(" ");
            const countInt = parseInt(count, 10);

            mins[color] = Math.max(countInt, mins[color] || 0);
          });
        });
      return Object.values(mins).reduce((product, el) => product * el, 1);
    })
    .reduce((sum, el) => sum + el, 0);
};

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
