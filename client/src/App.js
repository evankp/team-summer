import React, { useState } from 'react';
import { MuiThemeProvider, makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { theme } from './themes/theme';

import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Toast, { ToastContext } from './components/Toast';

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

  const [toastProperties, setToastProperties] = useState({
    text: '',
    button: 'CLOSE',
    variant: 'neutral'
  });
  const [showToast, toggleToast] = useState(false);

  const activateToast = (text, variant = 'neutral', button = 'CLOSE') => {
    setToastProperties({text, variant, button});
    toggleToast(true);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {/* Placeholder user object */}
        <NavBar user={{ name: 'Joe' }} />

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
          buttonText={toastProperties.button}
          toastMessage={toastProperties.text}
          variant={toastProperties.variant}
          toggleToast={toggleToast}
          showToast={showToast}
        />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
