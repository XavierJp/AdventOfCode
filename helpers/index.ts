export const range = (start: number, to: number): number[] => {
  if (to < start) {
    return range(to, start).reverse();
  }
  const arr = [...Array(to + 1).keys()];
  return arr.slice(start);
};

export const sum = (input: number[]) =>
  input.reduce((sum, elem) => sum + elem, 0);
