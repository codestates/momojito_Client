import styled from "styled-components";
import { Root, Body } from "../../components/PageUtils";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import StarList from "../../components/StarList";
import db from "../../public/cocktaildb";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 375px;
    height: 375px;
    margin-bottom: 0.5rem;
  }
  h1 {
    text-align: left;
    font-size: 1.5rem;
    padding: 1rem;
  }
  p {
    padding: 1rem;
    line-height: 1.5rem;
  }
`;

export default function Cocktail({ id }) {
  const cocktail = db[id];
  return (
    <Root>
      <Header></Header>
      <Body>
        <Container>
          <img src={`${cocktail.id}.jpeg`}></img>
          <h1>{`${cocktail.koreanName}(${cocktail.name})`}</h1>
          <StarList rating={cocktail.rating}></StarList>
          <p>{cocktail.description}</p>
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
