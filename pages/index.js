import { useState } from "react";
import { Root, Body } from "../components/PageUtils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardGrid from "../components/CardGrid";
import ButtonList from "../components/ButtonList";
import Carousel from "../components/Carousel";
export default function Home() {
  const [buttonSelected, setButtonSelected] = useState(0);
  return (
    <Root>
      <Header></Header>
      <Body>
        <Carousel
          carouselList={[
            {
              url: 'url("/bar0.jpeg");',
              heading: "성향에 따라 맞춤 칵테일을 추천 받으려면?",
            },
            {
              url: 'url("/bar1.jpeg");',
              heading: "당신의 칵잘알 퀴즈 점수는?",
            },
            {
              url: 'url("/bar2.jpeg");',
              heading: "칵테일 이상형 월드컵 16강",
            },
          ]}
        ></Carousel>
        <ButtonList
          buttonList={["클래식 칵테일", "이색 칵테일 in 서울", "인기 TOP 10"]}
          buttonSelected={buttonSelected}
          setButtonSelected={setButtonSelected}
        ></ButtonList>
        {buttonSelected === 0 ? (
          <CardGrid indexList={[1, 3, 5]}></CardGrid>
        ) : buttonSelected === 1 ? (
          <CardGrid indexList={[4, 5]} type="signature"></CardGrid>
        ) : (
          <CardGrid indexList={[3]} type="ranking"></CardGrid>
        )}
      </Body>
      <Footer></Footer>
    </Root>
  );
}
