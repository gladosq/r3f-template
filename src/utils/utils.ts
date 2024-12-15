export const getRandomNumber = (min: number, max: number): number => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === 8 || num === 15) ? getRandomNumber(min, max) : num;
};
