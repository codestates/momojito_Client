import styled from "styled-components";
import PageUtils from "./PageUtils";
import StarList from "./StarList";
import db from "../public/cocktaildb";
import Carousel from "./Carousel";
import Button from "./Button";
import ButtonList from "./ButtonList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 375px;
    height: 375px;
    margin-bottom: 0.5rem;
  }
  .nameheart,
  .signature {
    display: flex;
    align-items: center;
    text-align: left;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    svg {
      margin-left: 2rem;
      width: 15px;
      height: 15px;
    }
    button {
      margin-left: 1rem;
      margin-bottom: 0.5rem;
    }
  }
  .stars {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    h2 {
      margin-left: 1rem;
    }
    button {
      margin-left: 1rem;
    }
  }
  .ingredients {
    justify-content: flex-start;
  }
  p {
    padding: 0.5rem 1rem;
    line-height: 1.5rem;
  }
  .recommend {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    h1 {
      font-size: 1.25rem;
      margin-bottom: 2rem;
    }
  }
`;
export default function CocktailInfo({ id }) {
  const cocktail = db[id];
  const carouselImages = [{ url: 'url("/bar0.jpeg");' }];
  return (
    <Container>
      <Carousel
        carouselList={[
          {
            url: `url("/cocktails/${id}.jpeg");`,
          },
        ]}
      ></Carousel>
      {cocktail.barname ? (
        <div className="signature">
          <h1>{cocktail.barname}</h1>
          <div className="barloc">
            <Button s="0.5rem">{cocktail.barlocation}</Button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="nameheart">
        <h1>{`${cocktail.koreanName}(${cocktail.name})`}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <div className="stars">
        <StarList rating={cocktail.rating}></StarList>
        <h2>평균별점 {cocktail.rating}</h2>
        <Button>평가하기</Button>
      </div>
      <div className="ingredients">
        <ButtonList
          all
          buttonList={cocktail.ingredients.split(",")}
        ></ButtonList>
      </div>
      <p>{cocktail.description}</p>
      <div className="recommend">
        <h1>
          {cocktail.barname
            ? `${cocktail.barname}에서 찍은 다른 사진`
            : "이곳에서 드시겠어요?"}
        </h1>
        <Carousel
          carouselList={[
            {
              url: 'url("/bar0.jpeg");',
              heading: "JASE",
              buttonText: "홍대",
            },
            {
              url: 'url("/bar1.jpeg");',
              heading: "PAVOX",
              buttonText: "강남",
            },
            {
              url: 'url("/bar2.jpeg");',
              heading: "청춘예찬",
              buttonText: "성신여대",
            },
          ]}
        ></Carousel>
      </div>
    </Container>
  );
}
