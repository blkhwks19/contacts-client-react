import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
  
} from '@material-ui/core';

class ContactList extends Component {
  state = {
    contacts: [],
  }

  componentDidMount() {
    axios.get('http://localhost:3002/contacts')
      .then(res => {
        this.setState({ contacts: res.data });
      });
  }

  render() {
    return (
      <Fragment>
        <ul>
          { this.state.contacts.map(contact => <li>{contact.firstName}</li>)}
        </ul>
      </Fragment>
    )
  }
}

export default ContactList;