import React from 'react';
import axios from 'axios';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetInputs();
  };

  const resetInputs = () => {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('zip').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
  }

  const handleSubmit = () => {
    // get inputs
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
    axios.post('http://localhost:3002/contacts', contact)
      .then(res => {
        handleClose();
        // axios.get('http://localhost:3002/contacts')
        //   .then(res => {
        //     this.setState({ contacts: res.data.contacts });
        //   });
      });
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            className={classes.title}
          >
            Contacts Client
          </Typography>
          <Button
            variant="outlined" 
            color="inherit" 
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            ADD
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose}>
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
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
