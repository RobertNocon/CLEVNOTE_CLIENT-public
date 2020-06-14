import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import withContext from 'hoc/withContext';

import bulbIcon from 'assets/icons/bulb.svg';
import logoutIcon from 'assets/icons/logout.svg';
import penIcon from 'assets/icons/pen.svg';
import checkIcon from 'assets/icons/check.svg';
import logoIcon from 'assets/icons/logo.svg';

// import font from 'assets/icons/font.svg';

import store from 'store';
// import { logout } from '../../../actions/itemsActions';
import { logout } from 'actions/authActions';
// import { check } from 'prettier';

// import { connect } from 'react-redux';

const StyledWrapper = styled.nav`
  /* border: 5px red dotted; */
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 150px;
  height: 100vh;
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : theme.note)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-items: center;

  @media (max-width: 750px) {
    width: 100px;
  }
  @media (max-width: 500px) {
    width: 50px;
  }
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 67px;
  height: 67px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 10vh;

  @media (max-width: 500px) {
    width: 47px;
    height: 47px;
  }
`;

const StyledLogoutButton = styled(ButtonIcon)`
  margin-top: auto;
`;

const StyledLinksList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
  min-height: 50%;
`;

const Span = styled.span`
  display: block;
  margin-top: 10px;
  @media (max-width: 500px) {
    display: none;
  }
`;

const logoutUser = e => {
  e.preventDefault();
  // console.log('click logout on sidebar!');
  // logout();

  // store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  // store.dispatch(logout());
  store.dispatch(logout());
};

const Sidebar = ({ pageContext }) => (
  <StyledWrapper activeColor={pageContext}>
    <StyledLogoLink to="/" />
    <StyledLinksList>
      <li>
        <ButtonIcon as={NavLink} to="/notes" icon={penIcon} activeclass="active" />
        <Span>Notes</Span>
      </li>
      <li>
        <ButtonIcon as={NavLink} to="/todos" icon={checkIcon} activeclass="active" />
        <Span>Todos</Span>
      </li>
      <li>
        <ButtonIcon as={NavLink} to="/articles" icon={bulbIcon} activeclass="active" />
        <Span>Articles</Span>
      </li>
      <li>
        {/* <ButtonIcon as={NavLink} to="/articles" icon={font} activeclass="active" />
        <span>text</span> */}
      </li>
    </StyledLinksList>
    <StyledLogoutButton as={NavLink} to="/login" icon={logoutIcon} onClick={logoutUser} />
  </StyledWrapper>
);

Sidebar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'todos', 'articles']),
};

Sidebar.defaultProps = {
  pageContext: 'notes',
};

// function mapStateToProps(state){
//   return{
//     state.is
//   }
// }

// HOC - pageContext = withContext zapewnia kolor

// export default connect(mapStateToProps, { logout })(withContext(Sidebar));

export default withContext(Sidebar);
