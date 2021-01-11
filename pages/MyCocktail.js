import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonList from "../components/ButtonList";
import styled from "styled-components";

const theme = {};

export default function MyCocktail() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `;
  const [buttonSelected, setButtonSelected] = useState(0);
  return (
    <Container>
      <Header></Header>
      <Body>
        <ButtonList
          buttonList={["회원정보 수정", "My 칵테일"]}
          buttonSelected={buttonSelected}
          setButtonSelected={setButtonSelected}
        ></ButtonList>
        <CardGrid></CardGrid>
      </Body>
      <Footer></Footer>
    </Container>
  );
}

function Body({ children }) {
  const Container = styled.div`
    flex-grow: 1;
  `;
  return <Container>{children}</Container>;
}

function CardGrid() {
  const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `;
  return (
    <Container>
      {["무제.001", "무제.002", "무제.003", "무제.004"].map((item) => (
        <Card name={item}></Card>
      ))}
    </Container>
  );
}

function Card({ name }) {
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

  return (
    <Container>
      <img src={`cocktails/${name}.jpeg`}></img>
      <H1>{name}</H1>
      <H1 className="last">(Cosmopolitan)</H1>
      <StarList></StarList>
    </Container>
  );
}

function StarList({ rating }) {
  rating = rating ? rating : 4;
  const Container = styled.div`
    display: flex;
    justify-content: center;
  `;
  return (
    <Container>
      {[0, 1, 2, 3, 4].map((item) => (
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 0L10.4084 5.87336L16.584 5.87336L11.5878 9.50329L13.4962 15.3766L8.5 11.7467L3.50383 15.3766L5.41219 9.50329L0.416019 5.87336L6.59163 5.87336L8.5 0Z"
            fill="#36CC3C"
          />
          <path
            d="M8.5 0L10.4084 5.87336L16.584 5.87336L11.5878 9.50329L13.4962 15.3766L8.5 11.7467L3.50383 15.3766L5.41219 9.50329L0.416019 5.87336L6.59163 5.87336L8.5 0Z"
            fill="#36CC3C"
          />
        </svg>
      ))}
    </Container>
  );
}
