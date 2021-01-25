import styled from "styled-components";
import Button from "./Button";
import ButtonM from "./ButtonM"
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0.5rem;
  justify-content: ${(props) => (props.all ? "flex-start" : "center")};
`;

export default function ButtonList({
  page,
  buttonList,
  buttonSelected,
  setButtonSelected,
  all,
}) {
  return (
    <Container all={all}>
      {buttonList.map((v, i) => {
        if (page === "main" || page === "mypage") {
          return (
            <ButtonM
            key={v}
            selected={all ? true : i === buttonSelected}
            onClick={(e) => {
              setButtonSelected(i);
            }}
          >
            {v}
          </ButtonM>
          )
        }
        else {
          return (
            <Button
              m={all ? "0.2rem 0.25rem" : "0 0.5rem"}
              key={v}
              selected={all ? true : i === buttonSelected}
              onClick={(e) => {
                setButtonSelected(i);
              }}
            >
              {v}
            </Button>
          )
        }
      }
      )}
    </Container>
  );
}
