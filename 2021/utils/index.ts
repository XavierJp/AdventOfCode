export const extractLines = async (
  filePath: string,
  parseCallback = (el: string) => parseInt(el, 10)
) => {
  const input = await Deno.readTextFile(filePath);
  const lines = input.toString().split("\n");
  return lines.filter((line) => line !== "").map(parseCallback);
};
