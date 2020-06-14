import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import AuthTemplate from 'templates/AuthTemplate';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import { routes } from 'routes';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  loginUser as loginUserAction,
  registerUser as registerUserAction,
} from 'actions/authActions';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 30px 0;
  height: 40px;
  width: 300px;
`;

const StyledButton = styled(Button)`
  margin: 20px 0;
`;

const StyledHeading = styled(Heading)`
  margin-top: 12px;

  ::first-letter {
    text-transform: uppercase;
  }
`;

class LoginPage extends React.Component {
  state = {
    isLoginOpen: true,
    isRegisterOpen: false,
  };

  toogleRegister = () => {
    this.setState(prevState => ({
      isLoginOpen: !prevState.isLoginOpen,
      isRegisterOpen: !prevState.isRegisterOpen,
    }));
  };

  render() {
    const { isAuthenticated = null, loginUser, registerUser } = this.props;
    const { isLoginOpen, isRegisterOpen } = this.state;
    if (isAuthenticated) {
      return <Redirect to={routes.home} />;
    }
    return (
      <AuthTemplate>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={({ username, password }) => {
            if (isLoginOpen) {
              loginUser(username, password);
            }
            if (isRegisterOpen) {
              registerUser(username, password);
            }
          }}
        >
          {({ handleChange, handleBlur, values }) => {
            if (isAuthenticated) {
              return <Redirect to={routes.home} />;
            }
            return (
              <>
                <StyledHeading>{isLoginOpen ? 'Login' : 'Register'}</StyledHeading>
                <StyledForm>
                  <StyledInput
                    type="text"
                    name="username"
                    placeholder="Login"
                    autocomplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <StyledInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <StyledButton activecolor="notes" type="submit">
                    {isLoginOpen ? 'sign in' : 'register'}
                  </StyledButton>
                </StyledForm>
                <StyledButton type="button" onClick={this.toogleRegister}>
                  I want my account!
                </StyledButton>
              </>
            );
          }}
        </Formik>
      </AuthTemplate>
    );
  }
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated = null } = state.auth;
  return { isAuthenticated };
};

const mapDispatchToProps = dispatch => ({
  loginUser: (username, password) => dispatch(loginUserAction(username, password)),
  registerUser: (username, password) => dispatch(registerUserAction(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
