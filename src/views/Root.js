import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from 'routes';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import Notes from 'views/Notes';
import Articles from 'views/Articles';
import todos from 'views/Todos';
import DetailsPage from 'views/DetailsPage';
import LoginPage from 'views/LoginPage';
// import RegisterPage from 'views/RegisterPage';
import { loadUser } from 'actions/authActions';

// === On setup, check if theres any token in localstorage and set it===
/* global localStorage */
if (localStorage.token) {
  store.dispatch(loadUser(localStorage.token));
}

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.login} component={LoginPage} />
          {/* <Route exact path={routes.register} component={RegisterPage} /> */}
          <Route exact path={routes.home} render={() => <Redirect to="/notes" />} />
          <Route exact path={routes.notes} component={Notes} />
          <Route path={routes.note} component={DetailsPage} />
          <Route exact path={routes.articles} component={Articles} />
          <Route path={routes.article} component={DetailsPage} />
          <Route exact path={routes.todos} component={todos} />
          <Route path={routes.twitter} component={DetailsPage} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
