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
    editing: false,
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
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

  editContact = (contact) => {
    axios.put(`http://localhost:3002/contacts/${contact.id}`, contact)
      .then(res => {
        this.closeDialog();
        this.getContacts();
      });
  }

  openDialogForEdit = (contact) => {
    this.setState({
      editing: true,
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      city: contact.city,
      state: contact.state,
      zip: contact.zip,
      email: contact.email,
      phone: contact.phone,
      dialog: true,
    });
  }

  openDialog = () => {
    this.setState({ dialog: true });
  }

  closeDialog = () => {
    this.setState({ 
      dialog: false,
      editing: false
    });
    this.resetDialog();
  }

  resetDialog = () => {
    this.setState({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      phone: '',
    });
  }

  submitForm = () => {
    // get data from state
    let contact = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      email: this.state.email,
      phone: this.state.phone,
    }
    if (this.state.editing) {
      contact = {...contact, id: this.state.id};
    }

    // check if anything is missing
    for (const prop in contact) {
      if (contact[prop] === '') {
        console.log('Please fill out all fields');
        return false;
      }
    }

    // submit
    if (this.state.editing) {
      this.editContact(contact);
    } else {
      this.createContact(contact);
    }
  }

  onChangeForm = (field, value) => {
    this.setState({
      [field]: value,
    });
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
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#3f51b5" }}>{ contact.firstName.charAt(0).toUpperCase() + contact.lastName.charAt(0).toUpperCase() }</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => this.openDialogForEdit(contact)}>
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
          <DialogTitle>{this.state.editing ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
          <DialogContent style={{overflowY:'hidden'}}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name" 
                  fullWidth
                  variant="outlined"
                  value={this.state.firstName}
                  onChange={event => this.onChangeForm('firstName', event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Last Name" 
                  fullWidth
                  variant="outlined"
                  value={this.state.lastName}
                  onChange={event => this.onChangeForm('lastName', event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Address" 
                  fullWidth
                  variant="outlined"
                  value={this.state.address}
                  onChange={event => this.onChangeForm('address', event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="City" 
                  fullWidth
                  variant="outlined"
                  value={this.state.city}
                  onChange={event => this.onChangeForm('city', event.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField 
                  label="State"
                  variant="outlined"
                  value={this.state.state}
                  onChange={event => this.onChangeForm('state', event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Zip"
                  variant="outlined"
                  value={this.state.zip}
                  onChange={event => this.onChangeForm('zip', event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Email"
                  fullWidth
                  type="email"
                  variant="outlined"
                  value={this.state.email}
                  onChange={event => this.onChangeForm('email', event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone"
                  fullWidth
                  type="tel"
                  variant="outlined"
                  value={this.state.phone}
                  onChange={event => this.onChangeForm('phone', event.target.value)}
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
              onClick={this.submitForm}
            >
              { this.state.editing ? 'Update' : 'Create' }
            </Button>
          </DialogActions>
        </Dialog>

      </Fragment>
    )
  }
}

export default ContactList;