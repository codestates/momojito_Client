import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PageUtils from "../components/PageUtils";
import CardGrid from "../components/CardGrid";
import ButtonList from "../components/ButtonList";
import Carousel from "../components/Carousel";
import CocktailInfo from "../components/CocktailInfo";
import { useRouter } from "next/router";
import Modal from "react-modal";
import db from "../public/cocktaildb";
import styled, { ThemeContext } from "styled-components";
Modal.setAppElement("#__next");

function ReactModalAdapter({ className, ...props }) {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <Modal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
}

const StyledModal = styled(ReactModalAdapter)`
  &__overlay {
    background-color: rgba(255, 255, 255, 0);
    z-index: 10;
    position: fixed;
    inset: 0;
    transform: translateX(+375px);
    transition: all 250ms ease-in-out;
    &.ReactModal__Overlay--after-open {
      transform: translateX(0px);
    }
    &.ReactModal__Overlay--before-close {
      transform: translateX(+375px);
    }
  }

  &__content {
    background-color: white;
    position: absolute;
    top: 42px;
    bottom: 69px;
    right: 0px;
    left: auto;
    width: 375px;
  }
`;

export default function Home() {
  const [buttonSelected, setButtonSelected] = useState(0);
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;
  const dbIndexList = db.map((el) => el.id);
  const [topTenList, setTopTenList] = useState([]);
  // useEffect(() => {
  //   axios.get("http://localhost:5000/mainpage/getTopTen").then((res) => {
  //     const data = res.data.data.map((el) => {
  //       return el.id;
  //     });
  //     setTopTenList(data);
  //   });
  // }, []);

  return (
    <PageUtils>
      <StyledModal
        closeTimeoutMS={250}
        isOpen={!!router.query.cocktailId}
        onRequestClose={() => router.push("/")}
        contentLabel="Cocktail Modal"
      >
        <CocktailInfo
          id={
            router.query.cocktailId ? router.query.cocktailId : user.pastquery
          }
        ></CocktailInfo>
      </StyledModal>
      <Carousel
        carouselList={[
          {
            url: 'url("/bar0.jpeg");',
            heading: "성향에 따라 맞춤 칵테일을 추천 받으려면?",
            handleClick: (e) => {
              router.push("/test");
            },
          },
          {
            url: 'url("/bar1.jpeg");',
            heading: "당신의 칵잘알 퀴즈 점수는?",
            handleClick: (e) => {
              router.push("/quiz");
            },
          },
          {
            url: 'url("/bar2.jpeg");',
            heading: "칵테일 이상형 월드컵 16강",
            handleClick: (e) => {
              router.push("/worldcup");
            },
          },
        ]}
      ></Carousel>
      <ButtonList
        buttonList={["클래식 칵테일", "이색 칵테일 in 서울", "인기 TOP 10"]}
        buttonSelected={buttonSelected}
        setButtonSelected={setButtonSelected}
      ></ButtonList>
      {buttonSelected === 0 ? (
        <CardGrid indexList={dbIndexList}></CardGrid>
      ) : buttonSelected === 1 ? (
        <CardGrid indexList={[4, 5]} type="signature"></CardGrid>
      ) : (
        <CardGrid indexList={topTenList} type="ranking"></CardGrid>
      )}
    </PageUtils>
  );
}
