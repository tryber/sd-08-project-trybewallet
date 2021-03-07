import { shape, string, number } from 'prop-types';

const expenseType = shape({
  id: number,
  description: string,
  currency: string,
  method: string,
  tag: string,
});
export default expenseType;
