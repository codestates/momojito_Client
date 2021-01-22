import styled from "styled-components";

const ButtonM = styled.button`
  margin: 10px 5px 0px 5px;
  font-size: 16px;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  border-color: ${(props) => props.theme.main};
  border-width: 2px;
  background: ${(props) => {
    if (props.selected) return props.theme.main;
    else return "white";
  }};
  color: ${(props) => {
    if (props.selected) return "white";
    else return "black";
  }};
  &:hover {
    color: white;
    background-color: ${(props) => props.theme.main}
  }
  z-index: 10;
  cursor: pointer;
`;

export default ButtonM;
