import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const H1 = styled.h1`
  padding: 1rem;
`;

export default function Logout() {
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;
  useEffect(() => {
    setUser({
      ...user,
      isLogin: false,
      accessToken: "",
      myCocktailList: [],
    });
    setTimeout(() => {
      router.push("/");
    }, 2000);
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .post("http://localhost:5000/auth/signout", "", {
          withCredentials: true,
        })
        .then((res) => {
          localStorage.removeItem("accessToken");
        });
    }
  }, []);

  return (
    <Container>
      <H1>로그아웃 중입니다...</H1>
    </Container>
  );
}
