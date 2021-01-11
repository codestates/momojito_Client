import styled from "styled-components";
import StarList from "./StarList";
const Container_card = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;
export default function CardGrid() {
  return (
    <Container_card>
      {["무제.001", "무제.002", "무제.003", "무제.004"].map((v) => (
        <Card name={v} key={v}></Card>
      ))}
    </Container_card>
  );
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 150px;
    height: 150px;
    margin-bottom: 0.5rem;
  }
  .last {
    margin-bottom: 0.5rem;
  }
`;
const H1 = styled.h1`
  text-align: center;
`;

function Card({ name }) {
  return (
    <Container>
      <img src={`cocktails/${name}.jpeg`}></img>
      <H1>{name}</H1>
      <H1 className="last">(Cosmopolitan)</H1>
      <StarList></StarList>
    </Container>
  );
}
