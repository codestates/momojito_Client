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
  flex: 1;
  overflow: auto;
  height: 100%;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default function PageUtils({ children }) {
  return (
    <Root>
      <Header></Header>
      <Divider>
        <Sidebar></Sidebar>
        <Body>{children}</Body>
      </Divider>
      <Footer></Footer>
    </Root>
  );
}
