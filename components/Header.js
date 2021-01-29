import { useRouter } from "next/router";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Button from "./Button";
import Logout from "./Logout";
import Modal from "react-modal";
const Container = styled.div`
  flex: none;
  border-bottom: 1px solid rgba(219, 219, 219);
  padding: 0.5rem;
  @media (min-width: 1024px) {
    padding: 1.5rem;
    box-sizing: border-box;
    height: 75px;
  }
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  h1 {
    /* font-family: 'Pacifico', cursive; */
    /* font-family: 'Lobster', cursive; */
    font-family: 'Kaushan Script', cursive;
    margin: 0;
    margin-left: 0.25rem;
    color: ${(props) => props.theme.main};
    font-size: 1.5rem;
  }

  .logo-img {
    /* margin-right: 5px; */
    margin-bottom: 5px;
    width: 32px;
    height: 32px;
  }
`;

const ButtonPart = styled.div`
  display: flex;
  visibility: ${(props) => (props.isLogin ? "hidden" : "visible")};
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
    background-color: rgba(255, 255, 255, 0.75);
    position: fixed;
    z-index: 10;
    inset: 0;
  }

  &__content {
    overflow: auto;
    background-color: white;
    position: absolute;
    inset: 40%;
  }
`;

export default function Header() {
  const { user, setUser } = useContext(ThemeContext).userContext;
  const router = useRouter();
  return (
    <Container>
      <StyledModal isOpen={!!router.query.logout}>
        <Logout></Logout>
      </StyledModal>
      <>
        <LogoPart></LogoPart>
        <ButtonPart isLogin={user.isLogin}>
          <Button onClick={(e) => router.push("/signin")} selected>
            Log in
          </Button>
        </ButtonPart>
      </>
    </Container>
  );
}

function LogoPart() {
  const router = useRouter();
  return (
    <Logo
      onClick={(e) => {
        router.push("/");
      }}
    >
      <img
        // onClick={(e) => {
        //   router.push("/");
        // }}
        className="logo-img"
        src="logo.png"
        alt="no-img"
      />
      <h1>Momojito</h1>
    </Logo>
  );
}
