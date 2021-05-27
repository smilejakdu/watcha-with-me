import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// redux
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas"

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// saga를 redux store에 연결하기 위해서는 미들웨어를 사용해야 한다.
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers , applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


