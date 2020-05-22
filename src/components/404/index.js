import React from 'react';

const NoMatch = ({ location }) => (
  <div className="error-404-container">
    <h3 style={{ textAlign: 'center' }}>
      404 La ruta <code>{location.pathname}</code> no existe
    </h3>
  </div>
);

export default NoMatch;
