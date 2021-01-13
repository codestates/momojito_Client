import styled from "styled-components";

const Button = styled.button`
  margin: ${(props) => (props.m ? props.m : "")};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border-color: green;
  border-width: 0px;
  background: ${(props) => {
    if (props.selected) return props.theme.main;
    else return props.theme.grey;
  }};
  color: white;
`;

export default Button;
