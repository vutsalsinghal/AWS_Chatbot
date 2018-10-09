import React, { Component } from 'react';
import {Grid, Loader, Dimmer} from 'semantic-ui-react';
import axios from 'axios';

class Home extends Component {
  state = {
    loadingData:false,
    list:[],
  }

  async componentDidMount(){
    this.setState({loadingData:true});
    document.title = "Chatbot";
    this.getList();
    this.setState({loadingData:false});
  }

  getList = async () => {
    const res = await axios.get('/api/getList');
    this.setState({list:res.data});
  }


  render() {
    if(this.state.loadingData){
      return (
          <Dimmer active inverted>
            <Loader size='massive'>Loading...</Loader>
          </Dimmer>
      );
    }

    const list = this.state.list;
    
    return (
      <div>
        <h2>List of Items</h2>
        <Grid stackable>
          <Grid.Column width={12}>
            {list.length ? (
              <div>
                {list.map((item, id) => {return(<div key={id}>{item}</div>);})}
              </div>
            ) : (
              <div><h2>No List Items Found</h2></div>
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <Grid.Row>
              List Items
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;