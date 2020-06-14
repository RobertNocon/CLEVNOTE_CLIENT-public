import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ids from 'short-id';
import UserPageTemplate from 'templates/UserPageTemplate';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';
import Star from 'components/atoms/Stars/Stars';
// import shortid from 'shortid';

const StyledWrapper = styled.div`
  padding: 25px 150px 25px 70px;
  max-width: 50vw;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 80vw;
  }
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
  /* border: 5px dotted red; */
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  /* margin: 0; */
  border-bottom: 1px lightgray solid;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledLink = styled.a`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

// const StyledImage = styled.img`
//   position: absolute;
//   right: -80px;
//   top: 50px;
//   width: 120px;
//   height: 120px;
//   border-radius: 50%;
// `;

const StyledRatingDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 14px;
`;

const StyledButtonsWrapper = styled.div`
  padding: 50px 0;
  display: flex;
`;

const stars = [0, 1, 2, 3, 4];

const DetailsTemplate = ({
  pageContext,
  title,
  content,
  // type,
  dateUser,
  created,
  lastEdit,
  rating,
  // isActive,
  openEdit,
  articleUrl,
  // twitterName,
}) => (
  <UserPageTemplate>
    <StyledWrapper>
      <StyledPageHeader>
        <StyledHeading big as="h1">
          {title}
        </StyledHeading>
        {dateUser && <StyledParagraph>Todo: {dateUser}</StyledParagraph>}
        <StyledParagraph>Created: {created}</StyledParagraph>
        <StyledParagraph>Edited: {lastEdit}</StyledParagraph>
      </StyledPageHeader>

      {pageContext === 'articles' && (
        <StyledRatingDiv>
          {stars.map((star, i) => (
            <Star key={ids.generate()} starId={i} rating={rating} />
          ))}
        </StyledRatingDiv>
      )}

      <Paragraph>{content}</Paragraph>

      {pageContext === 'articles' &&
        (articleUrl.includes('http') ? (
          <StyledLink target="_blank" href={articleUrl}>
            {articleUrl}
          </StyledLink>
        ) : (
          <StyledLink target="_blank" href={`https://${articleUrl}`}>
            {articleUrl}
          </StyledLink>
        ))}

      <StyledButtonsWrapper>
        <Link to={`/${pageContext}`} activecolor={pageContext}>
          <Button>CLOSE</Button>
        </Link>
        <Button onClick={openEdit}>EDIT</Button>
      </StyledButtonsWrapper>
    </StyledWrapper>
  </UserPageTemplate>
);

DetailsTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'articles', 'todos']).isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  // type: PropTypes.string,
  dateUser: PropTypes.string,
  created: PropTypes.string,
  lastEdit: PropTypes.string,
  rating: PropTypes.number,
  // isActive: PropTypes.number,
  articleUrl: PropTypes.string,
  openEdit: PropTypes.func.isRequired,
  // twitterName: PropTypes.string,
};

DetailsTemplate.defaultProps = {
  title: '',
  content: '',
  // type: '',
  dateUser: '',
  created: '',
  lastEdit: '',
  rating: 1,
  // isActive: 1,
  articleUrl: '',
  // twitterName: '',
};

export default withContext(DetailsTemplate);
