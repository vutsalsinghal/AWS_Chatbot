import React, { Component } from 'react';
import {Grid, Loader, Dimmer, Form, Button, Message} from 'semantic-ui-react';
import config from '../config';

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
//const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const poolData = {
  UserPoolId: config.cognito.userPoolId,
  ClientId: config.cognito.clientId
};

class Logout extends Component {
  state = {
    loadingData:false,
    loading:false,
    errorMessage:'',
    msg:'',
    cognitoUser:'',
  }

  async componentDidMount(){
    this.setState({loadingData:true});
    document.title = "Bootmaster";

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    this.setState({loadingData:false, cognitoUser});
  }

  onSubmit = async () => {
    this.setState({errorMessage:''});
    
    if (this.state.cognitoUser != null) {
      this.state.cognitoUser.signOut();
      this.setState({msg:"You've been logged out!"});
    }
    
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
        <Grid stackable>
          <Grid.Column>
            {this.state.cognitoUser!=null &&
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                  Are you sure you want to logout?
                  <Button floated='right' primary loading={this.state.loading}>
                    Logout
                  </Button>
                <Message error header="Oops!" content={this.state.errorMessage} />
                {statusMessage}
              </Form>
            }

            {this.state.cognitoUser==null &&
              <h3>You not loggedin!</h3>
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Logout;