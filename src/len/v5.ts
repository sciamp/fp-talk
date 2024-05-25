// TODO
// ! ternary operator (if else)
// ! object

/*
  (1, |)
      v
      (2, |)
          v
          (3, EMPTY)
*/

type Pair<T> = { x: T; y: Pair<T> } | undefined;

const pair = <T>(x: T, y: Pair<T>) => ({ x, y });
const head = <T>(pair: Pair<T>): T | undefined => pair?.x;
const tail = <T>(pair: Pair<T>): Pair<T> => pair?.y;

type List<T> = Pair<T> | undefined;

const len = <T>(list: List<T>): number => {
  const loop = (list: List<T>, acc: number): number =>
    head(list) === undefined ? acc : loop(tail(list), acc + 1);

  return loop(list, 0);
};

export const emptyList = pair(undefined, undefined);
export const singletonList = pair(1, emptyList);
export const manyItemsList = pair(1, pair(2, pair(3, emptyList)));

export default len;
