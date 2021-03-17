import React from 'react';

import Spinner from '../assets/spinner.gif';

const Loading = () => (
  <div>
    <img src={ Spinner } alt="loading" />
  </div>
);

export default React.memo(Loading);
