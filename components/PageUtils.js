import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Divider = styled.div`
  flex: 1;
  overflow: auto;
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const Body = styled.div`
  // 라임, 스카이 gradient
  ${(props) =>
    props.page === "quiz"
      ? "background: linear-gradient(90deg, rgba(215,246,193,1) 0%, rgba(194,251,240,1) 100%);"
      : ""}
  flex: 1;
  overflow: auto;
  height: 100%;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default function PageUtils({ children, page }) {
  return (
    <Root>
      <Header></Header>
      <Divider>
        <Sidebar></Sidebar>
        <Body page={page}>{children}</Body>
      </Divider>
      <Footer></Footer>
    </Root>
  );
}
