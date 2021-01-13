import styled from "styled-components";
import { Root, Body } from "../../components/PageUtils";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import StarList from "../../components/StarList";
import db from "../../public/cocktaildb";
import Carousel from "../../components/Carousel";
import Button from "../../components/Button";
import ButtonList from "../../components/ButtonList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 375px;
    height: 375px;
    margin-bottom: 0.5rem;
  }
  .nameheart {
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
`;
export default function Cocktail({ id }) {
  const cocktail = db[id];
  const carouselImages = [{ url: 'url("/bar0.jpeg");' }];
  return (
    <Root>
      <Header></Header>
      <Body>
        <Container>
          <Carousel
            carouselList={[
              {
                url: `url("/cocktails/${id}.jpeg");`,
              },
            ]}
          ></Carousel>
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
          <div className=""></div>
        </Container>
      </Body>
      <Footer></Footer>
    </Root>
  );
}

export async function getStaticPaths() {
  const paths = db.map((v) => ({
    params: { id: String(v.id) },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { id: params.id } };
}
