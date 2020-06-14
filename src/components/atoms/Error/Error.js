import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledMassage = styled.div`
  width: 100%;
  text-align: center;
  color: red;
`;

const Error = ({ touched, message }) => {
  if (!touched) {
    return <StyledMassage> &nbsp; </StyledMassage>;
  }
  if (message) {
    return <StyledMassage> {message} </StyledMassage>;
  }
  return <StyledMassage> &nbsp; </StyledMassage>;
};

Error.propTypes = {
  touched: PropTypes.bool,
  message: PropTypes.string,
};

Error.defaultProps = {
  touched: false,
  message: '',
};

export default Error;
