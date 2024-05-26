// TODO
// ! ternary operator (if else)

/*
  (a, b)
  
  let's take a look at constant functions
  const f = () => 42;

  now if we need to represent another number we need to define another function
  const g = () => 43;
  const h = () => 44;
  ...

  if we look closer, we realize that we can generate all those functions
  (actually also the ones that we didn't define :P) by using a single function
  const wrap = (x) => () => x;
  with this we can rewrite the previous functions as
  const f = wrap(42);
  const g = wrap(43);
  const h = wrap(44);

  note that the wrap function can also be written as
  const wrap = (x) => (y) => x;

  given the way we defined the wrap function, we have that
  for every y, wrap(x)(y) === x

  in other words, given a pair (x, y) we can always extract the first element (aka the head!)
  by calling wrap(x)(y)

  what if we want to extract the second element (aka the tail!)?

  we can define a function that shifts the pair to the left
  const id = (x) => x;
  wrap(id) === (id) => (y) => id;
  wrap(id) === (y) => (x) => x;
  wrap(id)(x)(y) === y;

  BTW you're not going to loose your jobs to AI: both chatgpt and copilot f*****g failed to generate this code!
*/

type Selector<T> = (x: T) => (y: Pair<T>) => T | Pair<T>;
type Pair<T> = undefined | ((selector: Selector<T>) => T | Pair<T>);

const wrap =
  <T>(x: T) =>
  (y: Pair<T>): T =>
    x;
const id = <T>(x: T): T => x;

const head = wrap;
const tail = wrap(id) as <T>(x: T) => (y: Pair<T>) => Pair<T>;

const pair =
  <T>(x: T, y: Pair<T>): Pair<T> =>
  (selector: Selector<T>): T | Pair<T> =>
    selector(x)(y);

const len = <T>(list: Pair<T>): number => {
  const loop = (list: Pair<T>, acc: number): number =>
    list === undefined || list(head) === undefined
      ? acc
      : loop(list(tail) as Pair<T>, acc + 1);

  return loop(list, 0);
};

export const emptyList: Pair<number> = undefined;
export const singletonList: Pair<number> = pair(1, emptyList);
export const manyItemsList: Pair<number> = pair(1, pair(2, pair(3, emptyList)));

export default len;
