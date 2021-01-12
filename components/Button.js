import styled from "styled-components";

const Button = styled.button`
  margin: ${(props) => (props.m ? props.m : "")};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border-color: green;
  border-width: ${(props) => {
    if (props.primary) {
      return "0px";
    } else {
      return "1px";
    }
  }};
  background: ${(props) => {
    if (props.primary) {
      if (props.selected) return props.theme.main;
      else return props.theme.grey;
    } else {
      return "white";
    }
  }};
  color: ${(props) => {
    if (props.primary) {
      return "white";
    } else {
      return "black";
    }
  }};
`;

export default Button;
