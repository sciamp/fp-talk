// TODO
// ! toString
// ! slice
// ! ternary operator (if else)
// ! array

const len = <T>(list: T[]): number => {
  const loop = (list: T[], acc: number): number =>
    list.toString() === "" ? acc : loop(list.slice(1), acc + 1);

  return loop(list, 0);
};

export default len;
