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
            <Route exact path="/AWS_Chatbot" component={Home} />
            <Route path="/AWS_Chatbot/chat" component={Chat} />
            <Route path="/AWS_Chatbot/list" component={List} />
            <Route path="/AWS_Chatbot/register" component={Register} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;