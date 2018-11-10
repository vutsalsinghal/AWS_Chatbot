import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon, Modal} from 'semantic-ui-react';
import Logout from './UserLogout';

export default () => {
  return (
    <Menu style={{ marginTop:'10px' }}>
      <Menu.Item><Link to='/AWS_Chatbot'>Botmaster</Link></Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item><Link to='/AWS_Chatbot/chat'><Icon name='tasks' />Chat</Link></Menu.Item>
        
        <Modal size={'mini'} trigger={<Menu.Item>Logout</Menu.Item>}>
          <Modal.Header>Logout</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Logout />      
            </Modal.Description>
          </Modal.Content>
        </Modal>
        
      </Menu.Menu>
    </Menu>
  );
};