import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import QueryDrawer from './components/QueryDrawer';
import QueryResult from './components/QueryResult';
import MainHeader from './components/MainHeader';
import Alerts from './components/Alerts';
import store from './reducers';
import './App.css';

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
        outline: 'none',
      }
    }
  }
});

const App = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Alerts />
        <MainHeader onMenuClick={toggleDrawer} />
        <QueryDrawer open={openDrawer} onClose={toggleDrawer} />
        <QueryResult />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
