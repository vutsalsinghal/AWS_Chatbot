import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default () => {
  return (
    <Menu style={{ marginTop:'10px' }}>
      <Menu.Item><Link to='/'>Botmaster</Link></Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item><Link to='/chat'><Icon name='tasks' />Chat</Link></Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};