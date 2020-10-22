import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Divider,
  Button,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


class ContactList extends Component {
  state = {
    contacts: [],
    dialog: false,
  }

  componentDidMount() {
    this.getContacts();
  }

  getContacts = () => {
    axios.get('http://localhost:3002/contacts')
      .then(res => {
        this.setState({ contacts: res.data });
      });
  }

  createContact = (contact) => {
    axios.post('http://localhost:3002/contacts', contact)
      .then(res => {
        this.closeDialog();
        this.getContacts();
      });
  }

  deleteContact = (contact) => {
    axios.delete(`http://localhost:3002/contacts/${contact.id}`)
      .then(res => {
        this.getContacts();
      });
  }

  openDialog = () => {
    this.setState({ dialog: true });
  }

  closeDialog = () => {
    this.setState({ dialog: false });
    this.resetDialog();
  }

  resetDialog = () => {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('zip').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
  }

  submitDialog = () => {
    // get data from form
    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      zip: document.getElementById('zip').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
    };
    
    // check if anything is missing
    for (const prop in contact) {
      if (contact[prop] === '') {
        console.log('Please fill out all fields');
        return false;
      }
    }

    // submit request
    this.createContact(contact);
  }

  render() {
    return (
      <Fragment>
        <List>
          { this.state.contacts.map(contact => {
              const name = `${contact.firstName} ${contact.lastName}`;
              return (
                <div key={contact.id}>
                  <Divider />
                  <ListItem>
                    <ListItemAvatar color="primary">
                      <Avatar>{ contact.firstName.charAt(0).toUpperCase() + contact.lastName.charAt(0).toUpperCase() }</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name} />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <EditIcon color="primary" />
                      </IconButton> 
                      <IconButton onClick={() => this.deleteContact(contact)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              )
            }) 
          }
        </List>
        <Divider />


        <Fab 
          color="primary"
          onClick={this.openDialog}
          style={{ right: 20, bottom: 20, position: 'fixed' }}
        >
          <AddIcon />
        </Fab>
        

        <Dialog open={this.state.dialog} onClose={this.closeDialog}>
          <DialogTitle>Add Contact</DialogTitle>
          <DialogContent style={{overflowY:'hidden'}}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField 
                  label="First Name" 
                  fullWidth
                  id="firstName"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Last Name" 
                  fullWidth
                  id="lastName"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Address" 
                  fullWidth
                  id="address"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="City" 
                  fullWidth
                  id="city"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField 
                  label="State"
                  id="state"
                  variant="outlined" />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Zip"
                  id="zip"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Email"
                  fullWidth
                  id="email"
                  type="email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone"
                  fullWidth
                  id="phone"
                  type="tel"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={this.closeDialog}
            >
              Cancel
            </Button>
            <Button 
              color="primary"
              variant="contained"
              onClick={this.submitDialog}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

      </Fragment>
    )
  }
}

export default ContactList;