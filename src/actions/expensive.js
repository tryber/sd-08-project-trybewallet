export const EXPENSIVE = 'EXPENSIVE';

export const currentExpensive = (value) => ({
  type: EXPENSIVE,
  value,
});
