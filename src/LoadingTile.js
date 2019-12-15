import React from 'react';

import Loader from 'react-loader-spinner';

export default function LoadingTile() {
  return (
    <div className="tile">
      <Loader type="Bars" color="#CCCCCC" />
    </div>
  );
}
