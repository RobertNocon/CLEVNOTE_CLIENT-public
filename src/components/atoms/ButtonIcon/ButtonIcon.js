import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 67px;
  height: 67px;
  border-radius: 20px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50% 50%;
  border: none;

  &.active {
    background-color: white;
  }

  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 500px) {
    width: 43px;
    height: 43px;
  }
`;

export default ButtonIcon;
