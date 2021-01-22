import { useRouter } from "next/router";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import CardGrid from "../../components/CardGrid";
import CocktailInfo from "../../components/CocktailInfo";
import PageUtils from "../../components/PageUtils";
import db from "../../public/cocktaildb";
import Modal from "react-modal";

const H1 = styled.h1`
  font-size: 2rem;
  padding: 2rem;
`;
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
    overflow: auto;
    background-color: white;
    position: absolute;
    top: 75px;
    bottom: 75px;
    right: 0px;
    left: auto;
    width: 375px;
  }
`;
export default function Post() {
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;
  const { pid } = router.query;

  return (
    <PageUtils>
      <StyledModal
        closeTimeoutMS={250}
        isOpen={!!router.query.cocktailId}
        onRequestClose={() => router.push(`/ingredients/${pid}`)}
        contentLabel="Cocktail Modal"
      >
        <CocktailInfo
          id={
            router.query.cocktailId ? router.query.cocktailId : user.pastquery
          }
        ></CocktailInfo>
      </StyledModal>
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
