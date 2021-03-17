import { shape, string } from 'prop-types';

export default shape({
  fields: shape({
    value: string,
    description: string,
    currency: string,
    method: string,
    tag: string,
  }).isRequired,
});
