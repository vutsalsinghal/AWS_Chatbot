import React, { Component } from 'react';
import {Grid, Loader, Dimmer, Form, Button, Message, Input, Image, Card} from 'semantic-ui-react';
import config from '../config';
import axios from 'axios';
import aws4 from 'aws4';

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
  UserPoolId: config.cognito.userPoolId,
  ClientId: config.cognito.clientId
};

class Chat extends Component {
    state = {
    loadingData:false,
    loading:false,
    errorMessage:'',
    msg:'',
    chatMsg:'',
  }

  async componentDidMount(){
    this.setState({loadingData:true});
    document.title = "DiningConcierge | Chat";

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    this.setState({loadingData:false, cognitoUser});
  }

  onSubmit = async () => {
    this.setState({loadingData:true,chatMsg:''});

    let request = {
      'chatMsg':this.state.chatMsg,
      'username':this.state.cognitoUser.username
    }

    let signedRequest = aws4.sign({
      host: '8j56nswfh9.execute-api.us-east-1.amazonaws.com',
      method:'POST',
      url:'https://8j56nswfh9.execute-api.us-east-1.amazonaws.com/dev/chatbot',
      path:'/dev/chatbot',
      headers: {
      'content-type': 'application/json',
      'x-api-key':config.apiKey,
      },
      secretAccessKey: config.accessKeyId,
      accessKeyId: config.secretAccessKey,
      data:request,
      body:request
    })

    delete signedRequest.headers['Host']
    delete signedRequest.headers['Content-Length']

    try{
      let response = await axios(signedRequest);
      this.setState({msg:response.data.body});
    }catch(err){
      console.log(err);
      this.setState({errorMessage:err.message});
    }

    this.setState({loadingData:false});
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
      <Card fluid>
        <Card.Content>
        <Image floated='left' size='mini' src={require('../media/molly.png')} />
        <Card.Header>Molly</Card.Header>
        <Card.Description>
          {this.state.msg}
        </Card.Description>
        </Card.Content>
      </Card>
      );
    }

    return (
      <div>
        <h2>Molly from DiningConcierge. How can I Help?</h2><br/>
        <Grid stackable>
          {this.state.cognitoUser!=null &&
            <Grid.Column>
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Chat Message</label>
                  <Input onChange={event => this.setState({chatMsg:event.target.value, msg:''})} ></Input>
                </Form.Field>
                <Button floated='right' primary basic loading={this.state.loading}>
                  Send
                </Button>
                
                <Message error header="Oops!" content={this.state.errorMessage} />
                {statusMessage}
              </Form>
            </Grid.Column>
          }

          {this.state.cognitoUser==null &&
            <h3>Register/LogIn please!</h3>
          }
        </Grid>
      </div>
    );
  }
}

export default Chat;