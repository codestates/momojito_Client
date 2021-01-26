import styled, { ThemeContext } from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import PageUtils from "../components/PageUtils";
import DefaultButton from "../components/DefaultButton";
import NaverButton from "../components/NaverButton";
import KakaoButton from "../components/KakaoButton";
import WaveBackground from "../components/WaveBackground";

const SignInText = styled.div`
  text-align: center;
  margin-block-start: 30%;
  font-size: 30px;
  font-weight: 500;
`;
const InputText = styled.input`
  display: flex;
  margin: auto;
  width: 300px;
  height: 30px;
  margin-block-start: 1rem;
  border-radius: 0.25rem;
  border: 1px solid grey;
`;
const Validation = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 3%;
  color: red;
  font-size: 80%;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 5%;
  h1 {
    color: grey;
    font-size: 60%;
  }
  h2 {
    text-decoration: underline;
    font-size: 60%;
    margin-left: 1%;
    :hover {
      cursor: pointer;
    }
  }
`;
const Outer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  /* margin-bottom: -7.3rem; //Outer밖에 있는 svg가 너무 내려가있어서 올릴 때 사용 */
`;
const Inner = styled.div``;

export default function Login() {
  const { user, setUser } = useContext(ThemeContext).userContext;
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validate, setValidate] = useState();

  function eTargetValueEmail(e) {
    setEmail(e.target.value);
  }
  function eTargetValuePassword(e) {
    setPassword(e.target.value);
  }
  function validation() {
    if (!email) {
      return "가입하신 이메일 주소를 입력해 주세요.";
    } else if (!password) {
      return "비밀번호를 입력해 주세요.";
    }
  }
  function handleSignIn() {
    setValidate(validation);
    if (email && password) {
      axios
        .post(
          "https://server.momo-jito.com/auth/signin",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setUser({ ...user, accessToken: res.data.accessToken });
          {
            axios
              .get("https://server.momo-jito.com/auth/accesstoken", {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res);
                if (
                  res.data.data.userInfo.profile ===
                  "https://avatars1.githubusercontent.com/u/47313528?s=88&v=4"
                ) {
                  res.data.data.userInfo.profile = null;
                }
                if (res.status === 200) {
                  setUser({
                    ...user,
                    userInfo: res.data.data.userInfo,
                    myCocktailList: res.data.data.cocktailList,
                    accessToken: res.data.data.accessToken,
                    isLogin: true,
                  });
                  localStorage.setItem(
                    "accessToken",
                    res.data.data.accessToken
                  );
                  router.push("/");
                }
              });
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setValidate("존재하지 않는 이메일 입니다.");
            return validate;
          } else if (err.response.status === 402) {
            setValidate("올바른 비밀번호를 입력해 주세요.");
            return validate;
          }
        });
    }
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.href.includes("?code")) {
      let authorizationCode = url.search.split("=")[1];
      authorizationCode = authorizationCode.split("&")[0];
      let callback = url.search.split("=")[2];
      if (authorizationCode && callback) {
        axios
          .post(
            `https://server.momo-jito.com/auth/${callback}`,
            { authorizationCode },
            { withCredentials: true }
          )
          .then((res) => {
            //여서 jwt토큰 받아서 setUser해줌.
            setUser({
              ...user,
              userInfo: res.data.data.userInfo,
              myCocktailList: res.data.data.cocktailList,
              accessToken: res.data.data.accessToken,
              isLogin: true,
            });
            localStorage.setItem("accessToken", res.data.data.accessToken);
            router.push("/");
          })
          .catch((err) => {
            if (err) {
              router.push("/signin");
              alert("소셜로그인이 실패하였습니다");
            }
          });
      }
    }
  }, []);

  useEffect(() => {
    if (user.isLogin) {
      router.push("/");
    }
  }, [user]);

  function handleNaver() {
    window.location.assign(
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=PTisZDNi6hMVQyFoFNm6&redirect_uri=https://server.momo-jito.com/auth/navercallback&state=rara"
    );
  }
  function handleKakao() {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=f03c58d925a4fe0e1fdd2e3ea7617c09&redirect_uri=https://server.momo-jito.com/auth/kakaocallback`
    );
  }

  function redirection() {
    router.push("/signup");
  }
  function onKeyDown(e) {
    if (e.keyCode == 13) {
      handleSignIn();
    }
  }

  return (
    <PageUtils>
      <Outer>
        <Inner>
          <SignInText>로그인</SignInText>
          <InputText
            onChange={eTargetValueEmail}
            placeholder="  이메일 주소를 입력해 주세요."
            onKeyDown={onKeyDown}
          ></InputText>
          <InputText
            onChange={eTargetValuePassword}
            placeholder="  비밀번호를 입력해 주세요."
            type="password"
            onKeyDown={onKeyDown}
          ></InputText>
          <Validation>{!validate ? <div>ㅤ</div> : validate}</Validation>
          <DefaultButton onClick={handleSignIn}>로그인</DefaultButton>
          <NaverButton onClick={handleNaver}>
            <img src="/naver.png" width="30px" alt=""></img>
            네이버 계정으로 로그인
            <div className="blank"></div>
          </NaverButton>
          <KakaoButton onClick={handleKakao}>
            <img src="/kakao.png" width="25px" alt=""></img>
            카카오 계정으로 로그인
            <div className="blank"></div>
          </KakaoButton>
          <Bottom>
            <h1>다른 이메일로 가입하시려면?</h1>
            <h2 onClick={redirection}>회원가입</h2>
          </Bottom>
        </Inner>
      </Outer>
    </PageUtils>
  );
}
