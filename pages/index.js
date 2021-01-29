import { useState, useContext } from "react";
import PageUtils from "../components/PageUtils";
import CardGrid from "../components/CardGrid";
import ButtonList from "../components/ButtonList";
import Carousel from "../components/Carousel";
import { useRouter } from "next/router";
import db from "../public/cocktaildb";
import { ThemeContext } from "styled-components";
import CocktailModal from "../components/CocktailModal";

export default function Home() {
  const [buttonSelected, setButtonSelected] = useState(0);
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;
  const { ratingList, setRatingList } = useContext(ThemeContext).ratingContext;
  const dbIndexList = db.map((el) => el.id);

  return (
    <PageUtils>
      <CocktailModal></CocktailModal>
      <Carousel
        carouselList={[
          {
            url: 'url("/bar0.png");',
            heading: "당신의 칵잘알 점수는?",
            sub: "재미 있는 퀴즈와 함께 칵테일 지식을 업그레이드 하세요!",
            handleClick: (e) => {
              router.push("/quiz");
            },
          },
          {
            url: 'url("/bar2.png");',
            heading: "칵테일 이상형 월드컵 16강",
            sub: "당신의 최애 칵테일을 알고 싶으신가요?",
            handleClick: (e) => {
              router.push("/worldcup");
            },
          },
        ]}
      ></Carousel>
      <ButtonList
        page="main"
        buttonList={["인기 TOP 10", "재료별 칵테일", "전체 보기"]}
        buttonSelected={buttonSelected}
        setButtonSelected={setButtonSelected}
      ></ButtonList>
      {buttonSelected === 0 ? (
        <CardGrid
          indexList={ratingList
            .slice()
            .sort((a, b) => Number(b.avrRate) - Number(a.avrRate))
            .slice(0, 10)
            .map((v) => v.id - 1)}
          type="ranking"
        ></CardGrid>
      ) : buttonSelected === 1 ? (
        <Ingredientsfilter db={db}></Ingredientsfilter>
      ) : (
        <CardGrid indexList={dbIndexList}></CardGrid>
      )}
    </PageUtils>
  );
}

const baseList = ["진", "럼", "보드카", "위스키", "데킬라", "깔루아"];

function Ingredientsfilter({ db }) {
  const [buttonSelected, setButtonSelected] = useState(0);
  return (
    <div>
      <ButtonList
        buttonList={baseList}
        buttonSelected={buttonSelected}
        setButtonSelected={setButtonSelected}
      ></ButtonList>
      <CardGrid
        indexList={db
          .map(({ ingredients }, i) => {
            if (ingredients.includes(baseList[buttonSelected])) {
              return i;
            } else {
              return undefined;
            }
          })
          .filter((v) => v !== undefined)}
      ></CardGrid>
    </div>
  );
}
