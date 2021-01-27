import { useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import WaveBackground from "./WaveBackground";

const Divider = styled.div`
  flex: 1;
  overflow: auto;
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const Body = styled.div`
  // 라임, 스카이 gradient
  background: ${(props) =>
    props.page === "quiz"
      ? "linear-gradient(90deg, rgba(215,246,193,1) 0%, rgba(194,251,240,1) 100%);"
      : ""};

  // 스카이, 핑크 gradient
  background: ${(props) =>
    props.page === "worldcup"
      ? "linear-gradient(35deg, #CCFFFF, #FFCCCC);"
      : ""};

  flex: 1;
  overflow: auto;
  height: 100%;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Invisible = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
  position: absolute;
  width: 100px;
  height: 100%;
  z-index: 1;
`;

export default function PageUtils({ children, page }) {
  const [visible, setVisible] = useState(false);
  return (
    <Root>
      <Header></Header>
      <Invisible onMouseOver={(e) => setVisible(true)}></Invisible>
      <Divider>
        <Sidebar visible={visible}></Sidebar>
        <Body onMouseOver={(e) => setVisible(false)} page={page}>
          {children}
        </Body>
      </Divider>
      <Footer></Footer>
    </Root>
  );
}
