const E10 = 10;

const formatByLanguage = (num, language) => {
  const arrOfNum = num.split(',');

  if (arrOfNum.length === 1) {
    if (arrOfNum[0] === '') return '';
    return parseInt(arrOfNum[0], 10).toLocaleString(language);
  }

  const arrOfNumParsed = arrOfNum.map((value) => {
    if (value.length < 1) return '';
    return value;
  });
  const integer = arrOfNumParsed[0];
  const decimal = arrOfNumParsed[1];
  const integerParsed = integer === '' ? ''
    : parseInt(integer, 10).toLocaleString(language);

  return `${integerParsed},${decimal}`;
};

const removeNonNumeric = (num) => num.replace(/[^0-9,]/g, '');

export const formatInputNumber = (num, language) => {
  const justNumeric = removeNonNumeric(num);
  return formatByLanguage(justNumeric, language);
};

export const toNumericValue = (str) => {
  const arrOfNum = removeNonNumeric(str).split(',');

  if (arrOfNum.length === 1) {
    if (arrOfNum[0] === '') return 0;
    return parseInt(arrOfNum[0], 10);
  }

  const arrOfNumParsed = arrOfNum.map((value) => {
    if (value.length < 1) return [0, 0];
    return [parseInt(value, 10), value.length];
  });
  const integer = arrOfNumParsed[0][0];
  const decimal = arrOfNumParsed[1][0];
  const nToDivide = E10 ** arrOfNumParsed[1][1];
  return integer + (decimal / nToDivide);
};
