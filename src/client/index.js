// plain react stuff
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('lodash');
const { createStore, applyMiddleware, combineReducers } = require('redux');
const { Provider, connect } = require('react-redux');
const { Route, Router, Switch } = require('react-router');
const createHistory = require('history/createBrowserHistory').default;

const { routerReducer, routerMiddleware } = require('react-router-redux');

const thunkMiddleware = require('redux-thunk').default;
const { createLogger } = require('redux-logger');

const DEFAULT_STATE = {
  // data: {
  //
  // },
  // loading: { },
  // error: { },
  // localStorage: _.reduce({
  // }, (memo, value, key) => {
  //   memo[key] = window.localStorage.getItem(key) || value;
  //   return memo;
  // }, {})
};

const myReducers = {};
const allReducers = _.assign({ routing: routerReducer }, myReducers);

const history = createHistory();
const store = createStore(
  combineReducers(allReducers),
  DEFAULT_STATE,
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history),
    createLogger())
);

const Landing = require('./Landing');

const App = <Provider store={store}>
  <Router history={history}>
    <Switch>
      <Route
        exact
        path="/"
        component={connect(state => state)(Landing)}
      />
      <Route
        component={() => <div>not found</div>}
      />
    </Switch>
  </Router>
</Provider>;

ReactDOM.render(App, document.getElementById('root'));
