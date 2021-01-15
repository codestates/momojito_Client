import CocktailInfo from "../../components/CocktailInfo";
import PageUtils from "../../components/PageUtils";
import db from "../../public/cocktaildb";
import Carousel from "../../components/Carousel";
import Button from "../../components/Button";
import ButtonList from "../../components/ButtonList";

export default function CocktailInfoPage({ id }) {
  return (
    <PageUtils>
      <CocktailInfo id={id}></CocktailInfo>;
    </PageUtils>
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
