import styled from "styled-components";

const Button = styled.button`
  margin: ${(props) => (props.m ? props.m : "")};
  font-size: ${(props) => (props.s ? props.s : "")};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border-width: 0px;
  background: ${(props) => {
    if (props.selected) return props.theme.main;
    else return '#E8F5EC';
  }};
  color: ${(props) => {
    if (props.selected) return 'white';
  }};
  &:hover {
    background: limegreen;
    color: white;
  }
  z-index: 10;
  cursor: pointer;
`;

export default Button;
