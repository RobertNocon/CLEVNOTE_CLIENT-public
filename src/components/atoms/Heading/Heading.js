import styled, { css } from 'styled-components';

const Heading = styled.h1`
  font-size: ${({ theme, big }) => (big ? theme.fontSize.xl : theme.fontSize.l)};
  font-weight: ${({ theme }) => theme.bold};

  @media (max-width: 500px) {
    font-size: 22px;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  ${({ card }) =>
    card &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

export default Heading;
