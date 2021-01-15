import { Root, Body } from "../components/PageUtils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardGrid from "../components/CardGrid";
import db from "../public/cocktaildb";
import styled from "styled-components";
import { useState } from "react";

const Container_Big = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export default function WorldCup() {
  const [remain, setRemain] = useState(
    Array.from({ length: db.length }, (v, i) => i)
  );
  const handleLeft = (e) => {};
  const handleRight = (e) => {};
  return (
    <Root>
      <Header></Header>
      <Body>
        <H1>칵테일 이상형 월드컵 {2 ** Math.floor(remain.length / 2)}강</H1>
        <Container_Big className="">
          <Card index={0} handleClick={handleLeft}></Card>
          <H1>VS</H1>
          <Card index={1} handleClick={handleRight}></Card>
        </Container_Big>
      </Body>
      <Footer></Footer>
    </Root>
  );
}

const Container = styled.div`
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  img {
    width: 150px;
    height: 150px;
    position: relative;
    place-self: center;
    margin-bottom: 0.5rem;
  }
  .last {
    margin-bottom: 0.5rem;
  }
`;

const H1 = styled.h1`
  padding: 0.25rem;
  text-align: center;
`;

function Card({ index, handleClick }) {
  const cocktail = db[index];
  return (
    <Container onClick={handleClick}>
      <img src={`cocktails/${cocktail.id}.jpeg`}></img>
      <H1>{cocktail.name}</H1>
      <H1 className="last">{cocktail.koreanName}</H1>
    </Container>
  );
}
