import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* background-color: lightgray; */
`;

const StyledLi = styled.li`
  float: left;
  padding: 10px 15px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.5);
  }
`;

const StyledLiActive = styled(StyledLi)`
  color: black;
  font-weight: bold;
`;

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  //   console.log(itemsPerPage);
  //   console.log(totalItems);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // === No pagination returning if only one page ===
  if (pageNumbers.length === 1) {
    return null;
  }

  return (
    <StyledWrapper>
      Pages:
      <StyledUl>
        {pageNumbers.map(number =>
          number === currentPage ? (
            <StyledLiActive key={number} onClick={() => paginate(number)}>
              {number}
            </StyledLiActive>
          ) : (
            <StyledLi key={number} onClick={() => paginate(number)}>
              {number}
            </StyledLi>
          ),
        )}
      </StyledUl>
    </StyledWrapper>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  paginate: PropTypes.func,
  currentPage: PropTypes.number,
};

Pagination.defaultProps = {
  itemsPerPage: 24,
  totalItems: 0,
  paginate: () => null,
  currentPage: 1,
};

export default Pagination;
