import React, { Component } from 'react';
import {Grid, Loader, Dimmer, Form, Button, Message, Input} from 'semantic-ui-react';
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
      host: 'gb4olxxq6c.execute-api.us-east-1.amazonaws.com',
      method:'POST',
      url:'https://gb4olxxq6c.execute-api.us-east-1.amazonaws.com/dev/chatbot',
      path:'/dev/chatbot',
      headers: {
        'content-type': 'application/json',
        'x-api-key':'rNCqmeZd5aRdx4TUAQLO1Yh02nolwQDazR32z7d9',
      },
      secretAccessKey: config.accessKeyId,
      accessKeyId: config.secretAccessKey,
      data:request,
      body:request
    })

    delete signedRequest.headers['Host']
    delete signedRequest.headers['Content-Length']

    let response = await axios(signedRequest);
    console.log(response.data);
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
      statusMessage = <Message floating positive header="Bot says" content={this.state.msg} />;
    }

    return (
      <div>
        <h2>Type Away :D</h2>
        <Grid stackable>
          <Grid.Column width={12}>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Chat Message</label>
                {/*<textarea onChange={event => this.setState({chatMsg:event.target.value})} ></textarea>*/}
                <Input onChange={event => this.setState({chatMsg:event.target.value})} ></Input>
              </Form.Field>
              <Message error header="Oops!" content={this.state.errorMessage} />
              <Button primary basic loading={this.state.loading}>
                Send
              </Button>
              {statusMessage}
            </Form>
          </Grid.Column>
          <Grid.Column width={4}>
            <Grid.Row>
              Chatting!
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Chat;