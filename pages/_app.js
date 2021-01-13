import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import "swiper/swiper-bundle.css";

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({
    isLogin: false,
    username: "",
    authToken: "",
  });
  return (
    <>
      <Reset />
      <ThemeProvider
        theme={{
          main: "limegreen",
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
