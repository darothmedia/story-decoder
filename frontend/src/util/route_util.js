import React from 'react';
import { connect } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const Auth = ({ element: Element, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Element {...props} />
    ) : (
      <Navigate to="/" />
    )
  )} />
);

const Protected = ({ element: Element, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Element {...props} />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
);

const mapStateToProps = state => (
  { loggedIn: state.session.isSignedIn }
);

export const AuthRoute = connect(mapStateToProps)(Auth);

export const ProtectedRoute = connect(mapStateToProps)(Protected);