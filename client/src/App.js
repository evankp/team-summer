import React, { useState } from 'react';
import { MuiThemeProvider, makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { theme } from './themes/theme';

import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Toast from './components/Toast';
import { ToastContext } from './components/withToast';

const globalStyles = makeStyles({
  '@global': {
    '.MuiButton-root': {
      // Custom styling for buttons according to specs
      width: 220,
      height: 64,
      boxShadow: 'none'
    },
    // Styling links
    a: {
      textDecoration: 'none',
      color: '#000000',

      '&:hover': {
        color: theme.palette.primary.main
      }
    }
  }
});

const App = () => {
  globalStyles();

  const [toastButton, setButtonText] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');
  const [showToast, toggleToast] = useState(false);

  const activateToast = (text, variant, button = 'CLOSE') => {
    setToastMessage(text);
    setButtonText(button);
    setToastVariant(variant);
    toggleToast(true);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {/* Placeholder user object */}
        <NavBar user={{ name: 'Joe' }}/>

        {/* Routes */}
        {/*- Base route uses a Redirect Component to redirect to
            /signup. Change render to component with the home page
            component if changing landing page.
        */}
        <ToastContext.Provider value={activateToast}>
          <Route exact path="/" render={() => <Redirect to="/signup"/>}/>
          <Route path="/signup" render={(routeProps) => <SignUp activateToast={activateToast} {...routeProps}/>}/>
          <Route path="/login" component={Login}/>
        </ToastContext.Provider>
        <Toast
          buttonText={toastButton}
          toastMessage={toastMessage}
          toggleToast={toggleToast}
          showToast={showToast}
          variant={toastVariant}
        />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
