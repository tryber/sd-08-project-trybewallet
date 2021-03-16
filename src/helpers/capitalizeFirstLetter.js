const capitalizeFirstLetter = (string) => {
  const newString = string.substring(0, 1).toUpperCase() + string.substring(1);
  return newString;
};

export default capitalizeFirstLetter;
