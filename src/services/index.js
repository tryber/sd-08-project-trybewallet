const ROUND_UP = 4;
const DECIMAL = 10;

export const roundUp = (num, decimal) => {
  const n = parseFloat(num);
  return parseFloat((n + (ROUND_UP / ((DECIMAL ** (decimal + 1))))).toFixed(decimal));
};

export const objectToArray = (object) => {
  const array = Object.keys(object);
  array.splice(1, 1);
  return array;
};
