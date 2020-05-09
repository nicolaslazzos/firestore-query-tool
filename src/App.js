import React, { useState } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import QueryDrawer from './components/QueryDrawer';
import QueryResult from './components/QueryResult';
import MainHeader from './components/MainHeader';
import firebaseConfig from './environment';
import store from './reducers';
import './App.css';

firebase.initializeApp(firebaseConfig());
firebase.auth().signInWithEmailAndPassword('test@test.com', 'password').then(() => console.log('Logged In'))

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
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <MainHeader onMenuClick={toggleDrawer} />
        <QueryDrawer open={openDrawer} onClose={toggleDrawer} />
        <QueryResult />
      </ThemeProvider>
    </Provider>
  );
}
