// --- Przekazuje do aplikacji context ---

import React from 'react';
import PageContext from 'context';

// Przyjmuje komponent (jako argument) który opleciemy
const withContext = Component => {
  return function contextComponent(props) {
    return (
      <PageContext.Consumer>
        {/* podajemy jego własne propsy by nie przepadły & orzekazujemy context */}
        {context => <Component {...props} pageContext={context} />}
      </PageContext.Consumer>
    );
  };
};

export default withContext;
