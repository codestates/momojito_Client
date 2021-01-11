import styled from "styled-components";

export default function Button({ children, primary, selected, onClick }) {
  const Button = styled.button`
    padding: 0.25rem 1rem;
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

  Button.defaultProps = {
    theme: {
      main: "limegreen",
      grey: "grey",
    },
  };
  return (
    <Button primary selected={selected} onClick={onClick}>
      {children}
    </Button>
  );
}
