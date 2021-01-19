import styled, { ThemeContext } from "styled-components";
import { useRouter } from "next/router";
import { useContext } from "react";
const Container = styled.div`
  display: none;
  padding: 1rem;
  @media (min-width: 1024px) {
    display: block;
  }
  .big {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    background: white;
    color: black;
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
        Home
      </div>
      <div onClick={(e) => router.push("/contents")} className="big">
        Contents
      </div>
      <div onClick={(e) => router.push("/quiz")} className="small">
        칵테일 Quiz
      </div>
      <div onClick={(e) => router.push("/worldcup")} className="small">
        칵테일 이상형 월드컵
      </div>
      <div onClick={(e) => router.push("/test")} className="small">
        칵테일 성향테스트
      </div>
      <div
        onClick={(e) => {
          if (userContext.user.isLogin) router.push("/mypage");
          else router.push("/signin");
        }}
        className="big"
      >
        My page
      </div>
    </Container>
  );
}
