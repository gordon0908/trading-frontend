import React from 'react';

const Spinner = () => (
  <div className='connecting'>
    <div className="spinner-bn">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>

    <h2>Connecting Websocket ...</h2>
  </div>
);

export { Spinner };
