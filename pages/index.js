import { useState } from "react";

import { Root, Body } from "../components/PageUtils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardGrid from "../components/CardGrid";
import ButtonList from "../components/ButtonList";
import styled from "styled-components";

const Carousel = styled.img`
  width: 375px;
  height: 200px;
`;

export default function Home() {
  const [buttonSelected, setButtonSelected] = useState(0);
  return (
    <Root>
      <Header></Header>
      <Body>
        <Carousel src={`bar.jpeg`}></Carousel>
        <ButtonList
          buttonList={["클래식 칵테일", "이색 칵테일 in 서울", "인기 TOP 10"]}
          buttonSelected={buttonSelected}
          setButtonSelected={setButtonSelected}
        ></ButtonList>
        {buttonSelected === 0 ? (
          <CardGrid indexList={[1, 3, 5]}></CardGrid>
        ) : buttonSelected === 1 ? (
          <CardGrid indexList={[2, 4]}></CardGrid>
        ) : (
          <CardGrid indexList={[3]}></CardGrid>
        )}
      </Body>
      <Footer></Footer>
    </Root>
  );
}
