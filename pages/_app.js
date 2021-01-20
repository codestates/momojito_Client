import { useState, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import axios from "axios";
import { useRouter } from "next/router";
import "swiper/swiper-bundle.css";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState({
    isLogin: false,
    pastquery: 0,
    userInfo: {},
    accessToken: "",
    myCocktailList: [],
  });
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get("http://localhost:5000/auth/accesstoken", {
          withCredentials: true,
        })
        .then((res) => {
          setUser({
            ...user,
            userInfo: res.data.data.userInfo,
            myCocktailList: res.data.data.cocktailList,
            accessToken: res.data.data.accessToken,
            isLogin: true,
          });

          localStorage.setItem("accessToken", res.data.data.accessToken);
        });
    }
  }, []);
  return (
    <>
      <Reset />
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
