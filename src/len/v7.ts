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

type Selector<T> = (x: T) => (y: Node<T>) => T | Node<T>;
type Pair<T> = (selector: Selector<T>) => T | Node<T>;
type EmptyBranch = () => number;
type NonEmptyBranch<T> = (pair: Pair<T>) => number;
type Node<T> = (ifEmpty: EmptyBranch, ifNotEmpty: NonEmptyBranch<T>) => number;

const wrap =
  <T>(x: T) =>
  (y: Pair<T>): T =>
    x;
const id = <T>(x: T): T => x;

const tail = wrap(id) as <T>(x: T) => (y: Node<T>) => Node<T>;

const pair =
  <T>(x: T, y: Node<T>): Pair<T> =>
  (selector: Selector<T>): T | Node<T> =>
    selector(x)(y);

const wrappedPair =
  <T>(x: T) =>
  (y: Node<T>): Node<T> =>
  (_ifEmpty: EmptyBranch, ifNotEmpty: NonEmptyBranch<T>) =>
    ifNotEmpty(pair(x, y));

const len = <T>(list: Node<T>) => {
  const loop = (list: Node<T>, acc: number): number =>
    list(
      () => acc,
      (pair) => loop(pair(tail) as Node<T>, acc + 1)
    );

  return loop(list, 0);
};

export const emptyList = (
  ifEmpty: EmptyBranch,
  _ifNotEmpty: NonEmptyBranch<number>
) => ifEmpty();
export const singletonList = wrappedPair(1)(emptyList);
export const manyItemsList = wrappedPair(1)(
  wrappedPair(2)(wrappedPair(3)(emptyList))
);

export default len;
