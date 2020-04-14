import React from 'react';

import loadingGif from '../images/loading-arrow.gif';

function Loading() {
  return (
    <div>
      <img src={loadingGif} alt="loading" className="" />
    </div>
  );
}

export default Loading;
