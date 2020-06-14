import styled, { css } from 'styled-components';
import refreshIcon from 'assets/icons/refreshIcon.svg';

const Button = styled.button`
  padding: 0;
  margin-right: 15px;
  background-color: ${({ theme }) => theme.note};
  width: 220px;
  height: 47px;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;

  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }

  ${({ secondary }) =>
    secondary &&
    css`
      background-color: hsl(0, 0%, 90%);
      width: 130px;
      height: 30px;
      font-size: 12px;
    `}

  ${({ wide }) =>
    wide &&
    css`
      /* background-color: hsl(0, 0%, 0%); */
      background-color:  hsl(0, 0%, 95%);
      /* color: hsl(0, 0%, 61%); */
      width: 200px;
      height: 30px;
      font-size: 12px;

      background-image: url(${refreshIcon});
      background-size: 15px;
      background-position: 15px 50%;
      background-repeat: no-repeat;

      }
    `}
`;

export default Button;
