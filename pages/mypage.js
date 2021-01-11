import { useState } from "react";
import { Root, Body } from "../components/PageUtils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonList from "../components/ButtonList";
import CardGrid from "../components/CardGrid";

export default function MyPage() {
  const [buttonSelected, setButtonSelected] = useState(0);
  return (
    <Root>
      <Header></Header>
      <Body>
        <ButtonList
          buttonList={["회원정보 수정", "My 칵테일"]}
          buttonSelected={buttonSelected}
          setButtonSelected={setButtonSelected}
        ></ButtonList>
        {buttonSelected === 0 ? "" : <CardGrid></CardGrid>}
      </Body>
      <Footer></Footer>
    </Root>
  );
}
