import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";

const Container = styled.div``;

export default function Logout() {
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;
  useEffect(() => {
    setUser({ ...user, isLogin: false });
    setTimeout(() => {
      router.push("/");
    }, 1000);
  });
  return (
    <Container>
      <h1>로그아웃 중입니다...</h1>
    </Container>
  );
}
