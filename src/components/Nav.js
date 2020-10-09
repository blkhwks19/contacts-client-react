import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
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
            color="inherit" 
            startIcon={<AddIcon />}
          >
            ADD
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
