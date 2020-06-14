import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  /* position: fixed; */
  /* border: 1px red dotted; */
  /* display: flex; */
`;

const Star = ({ starId, rating, onMouseEnter, onMouseLeave, onClick }) => {
  const starFilled = {
    fill: 'gold',
    // fill: '#d96459',
  };

  const starBlank = {
    fill: '#eeeeee',
  };

  let styleClass = starBlank;
  if (rating && rating > starId) {
    styleClass = starFilled;
  }

  return (
    <StyledDiv onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
      <svg height="35px" width="33px" style={styleClass} viewBox="0 0 25 23" data-rating="1">
        <polygon strokeWidth="0" points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
      </svg>
    </StyledDiv>
  );
};

Star.propTypes = {
  starId: PropTypes.number,
  rating: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
};

Star.defaultProps = {
  starId: 0,
  rating: 0,
  onMouseEnter: () => null,
  onMouseLeave: () => null,
  onClick: () => null,
};

export default Star;
