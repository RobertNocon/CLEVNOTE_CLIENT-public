import styled, { css } from 'styled-components';
// import magnifierIcon from 'assets/icons/magnifier.svg';

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  /* max-width: 320px; */
  padding: 1px 20px 1px 30px;
  min-height: 40px;
  border: none;
  border-radius: 50px;
  font-weight: ${({ theme }) => theme.regular};
  font-size: ${({ theme }) => theme.fontSize.m};
  background-color: ${({ theme }) => theme.grey100};

  @media (max-width: 480px) {
    min-height: 19px;
    height: 16px;
    font-size: 14px;
  }

  ${({ stars }) =>
    stars &&
    css`
      font-size: 24px;
      /* margin-bottom: -50px; */
      color: gold;
    `}

  ${({ status }) =>
    status &&
    css`
      font-size: ${({ theme }) => theme.fontSize.s};
      color: #778899;
    `}

    option {
    color: gold;
    background: white;
    /* display: flex; */
    white-space: pre;
    /* min-height: 20px; */
    /* padding: 0px 2px 1px; */

    ${({ stars }) =>
      stars &&
      css`
        font-size: 30px;
        color: gold;
      `}

    ${({ status }) =>
      status &&
      css`
        font-size: ${({ theme }) => theme.fontSize.s};
        color: #3ca6f7;
      `}
  }
`;

export default Select;
// &:nth-child(2) {
//   /* color: red !important; */
//   background-color: ${({ theme }) => theme.value.unimp};
// }

// &:nth-child(3) {
//   /* color: red !important; */
//   background-color: ${({ theme }) => theme.value.normal};
// }

// &:nth-child(4) {
//   /* color: red !important; */
//   background-color: ${({ theme }) => theme.value.important};
// }

// &:nth-child(5) {
//   /* color: red !important; */
//   background-color: ${({ theme }) => theme.value.veryimp};
// }

// const Input = styled.input`
//   padding: 15px 30px;
//   font-size: ${({ theme }) => theme.fontSize.s};
//   font-weight: ${({ theme }) => theme.regular};
//   background-color: ${({ theme }) => theme.grey100};
//   border: none;
//   border-radius: 50px;

//   ::placeholder {
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     color: ${({ theme }) => theme.grey300};
//   }

//   ${({ search }) =>
//     search &&
//     css`
//     margin-right:50px
//       padding: 10px 20px 10px 40px;
//       font-size: ${({ theme }) => theme.fontSize.xs};
//       background-image: url(${magnifierIcon});
//       background-size: 15px;
//       background-position: 15px 50%;
//       background-repeat: no-repeat;
//     `}
// `;
