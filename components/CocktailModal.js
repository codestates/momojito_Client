import { useRouter } from "next/router";
import { useContext } from "react";
import Modal from "react-modal";
import styled, { ThemeConsumer, ThemeContext } from "styled-components";
import CocktailInfo from "./CocktailInfo";
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
    overflow: auto;
    background-color: white;
    position: absolute;
    top: 75px;
    bottom: 75px;
    right: 0px;
    left: auto;
    width: 35%;
    height: 100%;
  }
`;
export default function CocktailModal({ pid }) {
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;
  return (
    <StyledModal
      closeTimeoutMS={250}
      isOpen={!!router.query.cocktailId}
      onRequestClose={() => {
        if (pid) {
          router.push(`/ingredients/${pid}`);
        } else {
          router.push(router.query);
        }
      }}
      contentLabel="Cocktail Modal"
    >
      <CocktailInfo
        id={router.query.cocktailId ? router.query.cocktailId : user.pastquery}
      ></CocktailInfo>
    </StyledModal>
  );
}
