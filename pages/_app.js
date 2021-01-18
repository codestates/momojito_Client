import { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import "swiper/swiper-bundle.css";

const GlobalStyle = createGlobalStyle`
.ReactModal__Overlay {
  transform: translateX(+375px);
  transition: all 250ms ease-in-out;
}

.ReactModal__Overlay--after-open {
  transform: translateX(0px);
}

.ReactModal__Overlay--before-close {
  transform: translateX(+375px);
}
`;
export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({
    isLogin: false,
    email: "", //! 추가했는데 합의필요(changeInfo에서 state를 따로 관리할것인가?)
    profileImg: "", //!
    username: "", //! API에서는 nickname이라 되어있어 합의필요 //닉네임 길이제한 합의필요
    authToken: "",
    myCocktailList: [],
  });
  return (
    <>
      <Reset />
      <GlobalStyle></GlobalStyle>
      <ThemeProvider
        theme={{
          main: "limegreen",
          sub: "rgba(238, 250, 214, 1)",
          grey: "grey",
          userContext: {
            user: user,
            setUser: setUser,
          },
        }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
