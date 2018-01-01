// plain react stuff
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('lodash');
const { createStore, applyMiddleware, combineReducers } = require('redux');
const { Provider, connect } = require('react-redux');
const { Route } = require('react-router');
const createHistory = require('history/createBrowserHistory').default;

const { routerReducer, routerMiddleware, ConnectedRouter } = require('react-router-redux');

const thunkMiddleware = require('redux-thunk').default;
const { createLogger } = require('redux-logger');

const DEFAULT_STATE = {
  data: {

  },
  loading: { },
  error: { },
  localStorage: _.reduce({
  }, (memo, value, key) => {
    memo[key] = window.localStorage.getItem(key) || value;
    return memo;
  }, {})
};

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

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route
        exact
        path="/admin"
        component={connect(state => state)(() => <div>hello</div>)}
      />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
