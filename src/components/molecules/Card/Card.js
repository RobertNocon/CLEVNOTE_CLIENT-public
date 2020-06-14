import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItem as removeItemAction } from 'actions/itemsActions';
import ids from 'short-id';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import LinkIcon from 'assets/icons/link.svg';
import Star from 'components/atoms/Stars/Stars';

import withContext from 'hoc/withContext';

const StyledWrapper = styled.div`
  height: 500px;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.3);
  }
`;

const InnerWrapper = styled.div`
  position: relative;
  padding: 17px 30px;
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : 'white')};
  /* white-space: nowrap; */

  :first-of-type {
    z-index: 9999;
    &:hover {
      cursor: pointer;
    }
  }

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`;

const DateInfoLarge = styled(Paragraph)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.s};
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.4); */
  color: red;
`;

const DateInfo = styled(Paragraph)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledHeading = styled(Heading)`
  color: #606060;
  margin: 5px 0 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const StyledStatus = styled.span`
  color: #548aff;
  &::before {
    content: '[ ';
  }
  &::after {
    content: ' ]';
  }
`;

// const StyledAvatar = styled.img`
//   width: 86px;
//   height: 86px;
//   border: 5px solid ${({ theme }) => theme.todos};
//   border-radius: 50px;
//   position: absolute;
//   right: 25px;
//   top: 25px;
// `;

const StyledLinkButton = styled.a`
  display: block;
  width: 47px;
  height: 47px;
  border-radius: 50px;
  background: white url(${LinkIcon}) no-repeat;
  background-size: 60%;
  background-position: 50%;
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledRatingDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 14px;
`;

const stars = [1, 2, 3, 4, 5];

// By działało trzeba doinstalować babel-eslint -> npm install babel-eslint --save-dev
class Card extends Component {
  state = {
    redirect: false,
  };

  handleCardClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    const {
      id,
      pageContext,
      title,
      dateUser,
      created,
      lastEdit,
      rating,
      // todoName,
      articleUrl,
      content,
      removeItem,
    } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`${pageContext}/details/${id}`} />;
    }

    let status = '';
    if (pageContext === 'todos') {
      if (rating === 0) {
        status = 'New';
      }
      if (rating === 1) {
        status = 'In Progress';
      }
      if (rating === 2) {
        status = 'Done';
      }
    }

    return (
      <StyledWrapper key={id}>
        <InnerWrapper onClick={this.handleCardClick} activeColor={pageContext}>
          <StyledHeading card>
            {pageContext === 'todos' && <StyledStatus> {status} </StyledStatus>} {title}
          </StyledHeading>

          {dateUser && <DateInfoLarge card>{`todo: ${dateUser}`}</DateInfoLarge>}
          <DateInfo>{`created: ${created}`}</DateInfo>
          {lastEdit && <DateInfo>{`edited:  ${lastEdit}`}</DateInfo>}
          {/* {pageContext === 'todos' && (
            <StyledAvatar src={`https://avatars.io/twitter/${twitterName}`} />
          )} */}
          {pageContext === 'articles' && <StyledLinkButton href={articleUrl} />}

          {pageContext === 'articles' && (
            <StyledRatingDiv>
              {stars.map((star, i) => (
                <Star key={ids.generate()} starId={i} rating={rating} />
              ))}
            </StyledRatingDiv>
          )}
        </InnerWrapper>
        <InnerWrapper flex>
          <Paragraph card>{content}</Paragraph>
          <Button onClick={() => removeItem(pageContext, id)} secondary>
            REMOVE
          </Button>
        </InnerWrapper>
      </StyledWrapper>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number,
  pageContext: PropTypes.oneOf(['notes', 'todos', 'articles']),
  // twitterName: PropTypes.string,
  title: PropTypes.string,
  dateUser: PropTypes.string,
  created: PropTypes.string,
  lastEdit: PropTypes.string,
  rating: PropTypes.number,
  // todoName: PropTypes.string,
  articleUrl: PropTypes.string,
  content: PropTypes.string,
  removeItem: PropTypes.func.isRequired,
};

Card.defaultProps = {
  id: null,
  pageContext: 'notes',
  // todoName: null,
  articleUrl: null,
  content: null,
  dateUser: null,
  created: null,
  lastEdit: null,
  title: null,
  rating: 0,
};

// Akcja do wykonania, funkcja connect pozwala użyć poniższe removeItem jak props w klasie
const mapDispatchToProps = dispatch => ({
  // zwraca ---> nazwę funkcji do wykonania: argumenty(dowolne - co usunąć) => dispatch(zaimportowana akcja(co usunac) )
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

// mapDispatchToProps musi byc drugim argumentem, podajemy akcje do reducerów
export default connect(null, mapDispatchToProps)(withContext(Card));
