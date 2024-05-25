// TODO
// ! ...
// ! ternary operator (if else)
// ! array

const len = <T>(list: T[]): number => {
  const loop = ([head, ...tail]: T[], acc: number): number =>
    head === undefined ? acc : loop(tail, acc + 1);

  return loop(list, 0);
};

export default len;
