import React from 'react';
import firebase from 'firebase';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import QueryDrawer from './components/QueryDrawer';
import firebaseConfig from './environment';
import './App.css';

// firebase.initializeApp(firebaseConfig());
// firebase.auth().signInWithEmailAndPassword('test@test.com', 'password');

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#ff9800'
    }
  },
  typography: {
    fontSize: 12
  },
  props: {
    MuiButtonBase: {
      style: {
        outline: 'none'
      }
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <QueryDrawer />
      </div>
    </ThemeProvider>
  );
}
