import { createStore, applyMiddleware, compose } from 'redux';

// Middlewere
import thunk from 'redux-thunk';

import rootReducer from 'reducers';
// import rootReducer from 'reducers/itemsReducer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
/* eslint-enable */

export default store;

// bez api
// import { createStore } from 'redux';
// import notesApp from 'reducers'; //zmieniamy nazwę

// // Dodajemy do store dane, to wystarczy
// // const store = createStore(notesApp);

// // poniżej kod potrzebny do dev tools + wyłącza ESlinta w tym fragnemcie. trzeba dodac window do konfiguracji ESLinta
// /* eslint-disable no-underscore-dangle */
// // Dodajemy do store dane
// const store = createStore(
//   notesApp /* preloadedState, */,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );
// /* eslint-enable */

// // Eksportujemy obecny stan store
// export default store;
