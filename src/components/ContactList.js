import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

class ContactList extends Component {
  state = {
    contacts: [],
  }

  componentDidMount() {
    axios.get('http://localhost:3002/contacts')
      .then(res => {
        this.setState({ contacts: res.data.contacts });
      });
  }

  render() {
    return (
      <Fragment>
        <List>
          { this.state.contacts.map(contact => {
            const name = `${contact.firstName} ${contact.lastName}`;
            return (

              <ListItem>
                <ListItemText primary={name} />
              </ListItem>
            )
          }) }
        </List>
      </Fragment>
    )
  }
}

export default ContactList;