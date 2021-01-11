import styled from "styled-components";
import Button from "./Button";

export default function ButtonList({
  buttonList,
  buttonSelected,
  setButtonSelected,
}) {
  const Container = styled.div`
    display: flex;
    padding: 1rem;
    justify-content: space-evenly;
  `;
  const handleClick = (e) => {
    setButtonSelected(i);
  };
  return (
    <Container>
      {buttonList.map((v, i) => (
        <Button
          key={v}
          selected={i === buttonSelected}
          onClick={(e) => {
            setButtonSelected(i);
          }}
        >
          {v}
        </Button>
      ))}
    </Container>
  );
}
