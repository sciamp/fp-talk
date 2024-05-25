// TODO
// ! for loop
// ! array

const len = <T>(list: T[]): number => {
  let count = 0;
  for (const _item of list) {
    count++;
  }
  return count;
};

export default len;
