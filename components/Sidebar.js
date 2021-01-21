import styled, { ThemeContext } from "styled-components";
import { useRouter } from "next/router";
import { useContext } from "react";
const Container = styled.div`
  display: none;
  padding: 1rem;
  border-right: 1px solid rgba(219, 219, 219);
  @media (min-width: 1024px) {
    display: block;
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

export default function Sidebar() {
  const userContext = useContext(ThemeContext).userContext;
  const router = useRouter();

  return (
    <Container>
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
  );
}
