import styled, { ThemeContext } from "styled-components";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Transition } from "react-transition-group";
const Container = styled.div`
  position: absolute;
  background-color: white;
  height: 100vh;
  display: none;
  opacity: 0;
  padding: 1rem;
  border-right: 1px solid rgba(219, 219, 219);
  z-index: 2;

  @media (min-width: 1024px) {
    display: block;
    opacity: ${({ state }) =>
      state === "entering" || state === "entered" ? 1 : 0};
    transition: transform 250ms ease-in-out;
    transform: translateX(
      ${({ state }) =>
        state === "entering" || state === "entered" ? 0 : -375}px
    );
  }
  .big {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    background: white;
    color: black;
    cursor: pointer;
    &:hover {
      background: ${(props) => props.theme.main};
      color: white;
    }
  }
  .small {
    padding: 1rem 2rem;
    margin-left: 2rem;
    background: white;
    color: black;
    cursor: pointer;
    &:hover {
      background: ${(props) => props.theme.main};
      color: white;
    }
  }
`;

export default function Sidebar({ visible }) {
  const userContext = useContext(ThemeContext).userContext;
  const router = useRouter();

  return (
    <Transition in={visible} timeout={250}>
      {(state) => (
        <Container state={state}>
          <div onClick={(e) => router.push("/")} className="big">
            Homepage
          </div>
          <div onClick={(e) => router.push("/quiz")} className="big">
            Cocktail Quiz
          </div>
          <div onClick={(e) => router.push("/worldcup")} className="big">
            Cocktail Worldcup
          </div>
          <div
            onClick={(e) => {
              if (userContext.user.isLogin) router.push("/mypage");
              else router.push("/signin");
            }}
            className="big"
          >
            Mypage
          </div>
          {userContext.user.isLogin ? (
            <div onClick={(e) => router.push("?logout=true")} className="big">
              Logout
            </div>
          ) : (
            ""
          )}
        </Container>
      )}
    </Transition>
  );
}
