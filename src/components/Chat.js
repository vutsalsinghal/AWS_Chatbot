import React, { Component } from 'react';
import {Grid, Loader, Dimmer, Form, Button, Message, Input, Image, Card} from 'semantic-ui-react';
import config from '../config';
import axios from 'axios';
import aws4 from 'aws4';

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
    document.title = "Chatbot";
    this.setState({loadingData:false});
  }

  onSubmit = async () => {
    let request = {
      'chatMsg':this.state.chatMsg
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

    let response = await axios(signedRequest);
    //console.log(response.data);
    this.setState({msg:response.data.body});
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
        <h2>Type Away :D</h2>
        <Grid stackable>
          <Grid.Column>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Group>
                <Form.Field width={12}>
                  <label>Chat Message</label>
                  {/*<textarea onChange={event => this.setState({chatMsg:event.target.value})} ></textarea>*/}
                  <Input onChange={event => this.setState({chatMsg:event.target.value, msg:''})} ></Input>
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button floated='right' primary basic loading={this.state.loading}>
                  Send
                </Button>
              </Form.Group>
              {statusMessage}
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Chat;