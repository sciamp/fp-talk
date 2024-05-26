import len, { emptyList, manyItemsList, singletonList } from "./len/v6";

const test = <T>(expression: string, cb: () => T, expected: T) => {
  const title = `${expression} should be ${expected}`;
  const result = cb();
  const resultIndicator = result === expected ? "🟢" : "🔴";

  return `${resultIndicator} ${title} (${expression} = ${result})`;
};

console.log(test("len([])", () => len(emptyList), 0));
console.log(test("len([1])", () => len(singletonList), 1));
console.log(test("len([1, 2, 3])", () => len(manyItemsList), 3));
