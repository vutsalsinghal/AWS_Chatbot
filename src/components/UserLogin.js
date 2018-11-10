import React, { Component } from 'react';
import {Grid, Loader, Dimmer, Form, Button, Message, Input} from 'semantic-ui-react';
import config from '../config';

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: config.cognito.userPoolId,
  ClientId: config.cognito.clientId
};

class Login extends Component {
  state = {
    loadingData:false,
    loading:false,
    errorMessage:'',
    msg:'',
    email:'',
    password:'',
    loggedin:false,
  }

  async componentDidMount(){
    this.setState({loadingData:true});
    document.title = "Bootmaster | Login";

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    
    if (cognitoUser != null) {
      this.setState({loggedin:true});
      cognitoUser.getSession((err, session) => {
        if (err) {
          alert(err);
          return;
        }
        //console.log('session validity: ' + session.isValid());
        
      });
    }
    this.setState({loadingData:false});
  }

  onSubmit = async () => {
    this.setState({errorMessage:''});

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({Username:this.state.email, Password:this.state.password});
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
      Username: this.state.email,
      Pool: userPool,
    };
    
    let msg = '';
    let errorMessage = '';
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        //var accessToken = result.getAccessToken().getJwtToken();
        msg ="You're Logged In!";
      },
      
      onFailure: function(err) {
        errorMessage = err.message;
      },
    });

    const tmr = setInterval(() => {
      if (msg === '' && errorMessage === '') {
      }else{
        clearInterval(tmr);
        this.setState({msg:msg,errorMessage:errorMessage});
      }
    }, 1000);
    
  }

  render() {
    if(this.state.loadingData){
      return (
        <Dimmer active inverted>
          <Loader size='massive'>Loading...</Loader>
        </Dimmer>
      );
    }

    let statusMessage;

    if (this.state.msg === ''){
      statusMessage = null;
    }else{
      statusMessage = (
      <Message positive>
        <Message.Header>Success!</Message.Header>
        {this.state.msg}
      </Message>
      );
    }

    return (
      <div>
        <h2>User Login</h2>
        <Grid stackable>
          <Grid.Column>
          {this.state.loggedin===false && 
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Group>
                <Form.Field width={5}>
                  <label>Email</label>
                  <Input onChange={event => this.setState({email:event.target.value})} ></Input>
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field width={5}>
                  <label>Password</label>
                  <Input onChange={event => this.setState({password:event.target.value})} ></Input>
                </Form.Field>
                <Button floated='right' primary basic loading={this.state.loading}>
                  Login
                </Button>
              </Form.Group>
              <Message error header="Oops!" content={this.state.errorMessage} />
              {statusMessage}
            </Form>
          }

          {this.state.loggedin===true &&
            <h3>You're Logged in</h3>
          }
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;