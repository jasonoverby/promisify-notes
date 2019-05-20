import chalk from 'chalk';

const notANumber = (num: any): boolean => typeof num !== 'number' || Number.isNaN(num);
const getWaitedSecsMsg = (num: number): string => `waited for ${num} seconds`;
const getNotANumberMsg = (num1: number, num2: number): string => (
  `"One or both of these arguments is not a number: ${num1}, ${num2}`);

const getRandomIntBetweenMinAndMax = (num1: number, num2: number): number => {
  // ensures non-negative integers
  const [abs1, abs2] = [num1, num2].map(Math.abs).map(Math.floor);
  const [min, max] = [Math.min(abs1, abs2), Math.max(abs1, abs2)];
  return Math.floor((Math.random() * (max - min)) + min);
};

export {
  getNotANumberMsg,
  getRandomIntBetweenMinAndMax,
  getWaitedSecsMsg,
  notANumber,
};
