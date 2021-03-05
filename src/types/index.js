import { shape, string } from 'prop-types';

export default shape({
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
});
