import styled from "styled-components";

const ButtonL = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: ${(props) => (props.m ? props.m : "")};
  font-size: 15px;
  padding: 0.25rem 0rem;
  border-radius: 40px;
  border-color: green;
  border-width: 0px;
  background: limegreen;
  color: white;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background: #1FB950;
    color: white;
  }

  .icon {
    font-size: 20px;
    margin-right: 10px;
  }
`;

export default ButtonL;
