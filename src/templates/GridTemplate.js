import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserPageTemplate from 'templates/UserPageTemplate';
import Input from 'components/atoms/Input/Input';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import plusIcon from 'assets/icons/plus.svg';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';
import Pagination from 'components/organisms/Pagination/Pagination';
import Select from 'components/atoms/Select/Select';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: 250px 1fr 70px;
  min-height: 100vh;
  position: relative;
  padding: 25px 150px 25px 70px;

  @media (max-width: 1500px) {
    grid-template-rows: 320px 1fr 70px;
    padding: 25px 110px 25px 20px;
  }
  @media (max-width: 850px) {
    padding: 25px 10px 25px 20px;
  }

  @media (max-width: 750px) {
    grid-template-rows: 435px 1fr 70px;
  }
`;

const StyledFiltersWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 50px 0;
  grid-gap: 15px;

  @media (max-width: 1500px) {
    grid-gap: 25px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 750px) {
    grid-gap: 25px;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-flow: row;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 65px;

  @media (max-width: 2000px) {
    grid-gap: 35px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1500px) {
    grid-gap: 25px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
`;

const StyledPageHeader = styled.div`
  margin: 0px 0 30px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0 0;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;
// == Add new ===
const StyledButtonIcon = styled(ButtonIcon)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: ${({ activecolor, theme }) => theme[activecolor]};
  background-size: 45%;
  border-radius: 50px;
  z-index: 10000;
  border: 10px solid white;
  outline: none;
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 0;
`;

class GridTemplate extends Component {
  state = {
    isNewItemBarVisible: false,
  };

  toggleNewItembar = () => {
    this.setState(prevState => ({
      isNewItemBarVisible: !prevState.isNewItemBarVisible,
    }));
  };

  render() {
    const {
      children,
      pageContext,

      searchTitleFn,
      searchContentFn,
      searchDateFn,
      searchRatingFn,
      clearFiltersFn,

      allElement,
      filteredElementCount,

      filterSearchTitleValue,
      filterSearchContentValue,
      filterSearchDateValue,
      filterSearchRatingValue,

      itemsPerPage,
      setCurrentPage,
      currentPage,
    } = this.props;
    const { isNewItemBarVisible } = this.state;
    // console.log(pageContext);
    return (
      <UserPageTemplate>
        <StyledWrapper>
          <StyledPageHeader>
            <StyledHeading big as="h1">
              {pageContext}
            </StyledHeading>
            <StyledParagraph>
              Found: {filteredElementCount} of {allElement} {pageContext}
            </StyledParagraph>

            <StyledFiltersWrapper>
              {(pageContext === 'notes' || 'todos') && (
                <Input
                  search
                  value={filterSearchTitleValue}
                  placeholder="title"
                  onChange={searchTitleFn}
                />
              )}
              {(pageContext === 'notes' || 'todos') && (
                <Input
                  search
                  value={filterSearchContentValue}
                  placeholder="content"
                  onChange={searchContentFn}
                />
              )}
              {(pageContext === 'notes' || 'todos') && (
                <Input
                  type="date"
                  search
                  value={filterSearchDateValue}
                  placeholder="date"
                  onChange={searchDateFn}
                />
              )}

              {pageContext === 'todos' && (
                <Select
                  status
                  value={filterSearchRatingValue}
                  onChange={searchRatingFn}
                  type="number"
                  // name="rating"
                  placeholder="rating"
                >
                  <option value="0">New</option>
                  <option value="1">In Progres</option>
                  <option value="2">Done</option>
                </Select>
              )}

              {pageContext === 'articles' && (
                <Select
                  stars
                  value={filterSearchRatingValue}
                  onChange={searchRatingFn}
                  type="number"
                  // name="rating"
                  placeholder="rating"
                >
                  <option value="0">☆ ☆ ☆ ☆ ☆</option>
                  <option value="1">★ ☆ ☆ ☆ ☆</option>
                  <option value="2">★ ★ ☆ ☆ ☆</option>
                  <option value="3">★ ★ ★ ☆ ☆</option>
                  <option value="4">★ ★ ★ ★ ☆</option>
                  <option value="5">★ ★ ★ ★ ★</option>
                </Select>
              )}

              <StyledButton onClick={clearFiltersFn} wide>
                RESET FILTERS
              </StyledButton>
            </StyledFiltersWrapper>
          </StyledPageHeader>
          <StyledGrid>{children}</StyledGrid>
          <StyledButtonIcon
            onClick={this.toggleNewItembar}
            icon={plusIcon}
            activecolor={pageContext}
          />
          <NewItemBar handleClose={this.toggleNewItembar} isVisible={isNewItemBarVisible} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredElementCount}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </StyledWrapper>
      </UserPageTemplate>
    );
  }
}

GridTemplate.propTypes = {
  allElement: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearFiltersFn: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  filterSearchContentValue: PropTypes.string,
  filterSearchDateValue: PropTypes.string,
  filterSearchTitleValue: PropTypes.string,
  filterSearchRatingValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  filteredElementCount: PropTypes.number,
  itemsPerPage: PropTypes.number,
  pageContext: PropTypes.string,
  setCurrentPage: PropTypes.func.isRequired,
  searchContentFn: PropTypes.func.isRequired,
  searchDateFn: PropTypes.func.isRequired,
  searchTitleFn: PropTypes.func.isRequired,
  searchRatingFn: PropTypes.func.isRequired,
};

GridTemplate.defaultProps = {
  pageContext: 'notes',
  allElement: 0,
  currentPage: 0,
  filterSearchContentValue: '',
  filterSearchDateValue: '',
  filterSearchTitleValue: '',
  filterSearchRatingValue: 0,
  filteredElementCount: 0,
  itemsPerPage: 24,
};

export default withContext(GridTemplate);
