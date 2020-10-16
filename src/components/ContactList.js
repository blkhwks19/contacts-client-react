import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

  getInitials(c) {
    return c.firstName.charAt(0).toUpperCase() + c.lastName.charAt(0).toUpperCase();
  }

  render() {
    return (
      <Fragment>
        <List>
          { 
            this.state.contacts.map(contact => {
              const name = `${contact.firstName} ${contact.lastName}`;
              return (
                <Fragment key={contact.id}>
                  <Divider />
                  <ListItem>
                    <ListItemAvatar color="primary">
                      <Avatar>AA</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name} />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <EditIcon color="primary" />
                      </IconButton> 
                      <IconButton>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Fragment>
              )
            }) 
          }
        </List>
        <Divider />
      </Fragment>
    )
  }
}

export default ContactList;