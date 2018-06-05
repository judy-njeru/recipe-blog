import React, { Component } from 'react';
import './App.css';
import Auth from './Auth/Auth';
import { Redirect, Route, Router } from 'react-router-dom';
import Callback from './Callback';
import Home from './components/Home';
import Profile from './components/Profile';
import Header from './components/Header';
import Recipes from './components/Recipes';
import history from './history';
import Blog from './blog';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer/reducer';

const store = createStore(reducer);

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <Router history={history} component={Blog}>
          <div className="App">
          <Route path="/" render={(props) => <Header auth={auth} {...props} />} />
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/profile" render={(props) => (
                !auth.isAuthenticated() ? (
                  <Redirect to="/home"/>
                ) : (
                  <Profile auth={auth} {...props} />
                )
              )} />

              <Route path="/blog" render={(props) => (
                  !auth.isAuthenticated() ? (
                    <Redirect to="/blog"/>
                  ) : (
                    <Blog auth={auth} {...props} />
                  )
                )} />

                <Route path="/recipes" render={(props) => (
                    !auth.isAuthenticated() ? (
                      <Redirect to="/recipes"/>
                    ) : (
                      <Recipes auth={auth} {...props} />
                    )
                  )} />
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                  return <Callback {...props} />
              }} />

          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
