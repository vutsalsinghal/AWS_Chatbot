import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Chat from './components/Chat';
import List from './components/List';
import Register from './components/UserRegister';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chat" component={Chat} />
            <Route path="/list" component={List} />
            <Route path="/register" component={Register} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;