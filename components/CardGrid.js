import styled from "styled-components";
import StarList from "./StarList";
import db from "../public/cocktaildb";
const Container_card = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

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
export default function CardGrid({ indexList }) {
  return (
    <Container_card>
      {indexList.map((v) => (
        <Card index={v} key={v}></Card>
      ))}
    </Container_card>
  );
}

function Card({ index }) {
  const cocktail = db[index];
  return (
    <Container>
      <img src={`cocktails/${cocktail.id}.jpeg`}></img>
      <H1>{cocktail.name}</H1>
      <H1 className="last">{cocktail.koreanName}</H1>
      <StarList rating={cocktail.rating}></StarList>
    </Container>
  );
}
