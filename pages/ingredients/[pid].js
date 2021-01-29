import { useRouter } from "next/router";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import CardGrid from "../../components/CardGrid";
import PageUtils from "../../components/PageUtils";
import db from "../../public/cocktaildb";
import CocktailModal from "../../components/CocktailModal";
const H1 = styled.h1`
  font-size: 2rem;
  padding: 2rem;
`;

export default function Post() {
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;
  const { pid } = router.query;

  return (
    <PageUtils>
      <CocktailModal pid={pid}></CocktailModal>
      <H1>{pid}</H1>
      <CardGrid
        indexList={db
          .map(({ ingredients }, i) => {
            if (ingredients.includes(pid)) {
              return i;
            } else {
              return undefined;
            }
          })
          .filter((v) => v !== undefined)}
      ></CardGrid>
    </PageUtils>
  );
}
