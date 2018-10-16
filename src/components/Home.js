import React, { Component } from 'react';
import {Grid, Loader, Dimmer, Card, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Home extends Component {
  state = {
    loadingData:false,
  }

  async componentDidMount(){
    this.setState({loadingData:true});
    document.title = "Chatbot";
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

    return (
      <div>
        <h1></h1>
        <Grid centered stackable><br /><br /><br />
          <Card fluid color='green'>
            {/*<Image src='/images/avatar/large/matthew.png' />*/}
            <Card.Content>
              <br /><br />
              <Card.Header><h1>Hi There!</h1></Card.Header>
              <Card.Description>
                <br /><br /><br />
                <h3>Start Chatting Now!</h3>
                <br /><br />
                <Link to='/chat'><Button primary>Chat</Button></Link>
                <br /><br /><br />
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default Home;