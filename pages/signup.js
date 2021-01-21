import styled, { ThemeContext } from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import PageUtils from "../components/PageUtils";
import Modal from "react-modal";
import HoverButton from "../components/HoverButton";
import DefaultButton from "../components/DafaultButton";
import NaverButton from "../components/NaverButton";
import KakaoButton from "../components/KakaoButton";
import FacebookButton from "../components/FacebookButton";

const SignUpText = styled.div`
  text-align: center;
  margin-block-start: 30%;
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

const Checkbox = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 3%;
  h1 {
    font-size: 70%;
    margin-left: 1%;
  }
  .checkbox {
    zoom: 1.5;
    margin: 0 auto; //
    margin-right: 0;
    margin-left: 0;
  }
  .checkbox:hover {
    cursor: pointer;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0;
`;

const CheckImageDiv = styled.div`
  /* background-image: url('check.png'); */
  display: inline-block; //
  position: relative; //
  justify-content: center;
  span {
    position: absolute; //
    top: 0;
    margin-top: 1.3rem;
    right: 15px;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Outer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
`;
const Inner = styled.div``;

export default function SignUp() {
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;

  const [email, setEmail] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [validate, setValidate] = useState();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("회원가입이 완료되었습니다");
  const [validateCheck, setValidateCheck] = useState(false);

  var subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#23B366";
  }

  function closeModal() {
    setIsOpen(false);
    if (message === "회원가입이 완료되었습니다") {
      router.push("/");
    }
  }
  //
  function eTargetValueEmail(e) {
    setEmail(e.target.value);
  }
  function eTargetValueNickname(e) {
    setNickname(e.target.value);
  }
  function eTargetValuePassword(e) {
    setPassword(e.target.value);
  }
  function eTargetValuePasswordCheck(e) {
    setPasswordCheck(e.target.value);
  }
  function checkPasswordCheck() {
    if (password && passwordCheck && password === passwordCheck) {
      setValidateCheck(true);
    } else {
      setValidateCheck(false);
    }
  }
  useEffect(() => {
    if (user.isLogin) {
      router.push("/");
    }
  }, [user]);
  useEffect(checkPasswordCheck, [passwordCheck]);
  useEffect(validation, [validateCheck]);

  function validation() {
    if (!email) {
      return "email을 입력해 주세요.";
    } else if (!email.includes("@")) {
      return "올바른 형식의 email을 입력해 주세요.";
    } else if (!nickname) {
      return "닉네임을 입력해 주세요.";
    } else if (!password || !passwordCheck) {
      return "비밀번호를 입력해 주세요.";
    } else if (password !== passwordCheck) {
      return "비밀번호가 일치하지 않습니다.";
    } else if (document.querySelector(".checkbox").checked !== true) {
      return "회원가입 정책에 동의해 주세요.";
    }
  }

  function onKeyDown(e) {
    if (e.keyCode == 13) {
      handleSignUp();
    }
  }

  function handleSignUp() {
    setValidate(validation);

    if (email && nickname && password && passwordCheck) {
      if (password === passwordCheck) {
        if (document.querySelector(".checkbox").checked === true) {
          axios
            .post("https://server.momo-jito.com/auth/signup", {
              email,
              nickname,
              password,
              passwordCheck,
            })
            .then((res) => {
              if (res.status === 200) {
                openModal();
              }
            })
            .catch((err) => {
              if (err.response.status === 401) {
                setValidate("이미 존재하는 닉네임 입니다.");
              } else if (err.response.status === 402) {
                setValidate("이미 존재하는 이메일 입니다.");
              } else {
                setMessage(`${err}`);
                openModal();
              }
            });
        }
      }
    }
  }

  function handleNaver() {
    axios.post();
  }

  function handleKakao() {
    axios.post();
  }

  function handleFacebook() {
    axios.post();
  }

  return (
    <PageUtils>
      <Outer>
        <Inner>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{message}</h2>
            <HoverButton onClick={closeModal}>
              <button>확인</button>
            </HoverButton>
          </Modal>

          <SignUpText>회원가입</SignUpText>
          <InputText
            className="email"
            onChange={eTargetValueEmail}
            placeholder="  사용하실 이메일 주소를 입력해주세요."
            onKeyDown={onKeyDown}
          ></InputText>
          <InputText
            className="nickname"
            onChange={eTargetValueNickname}
            placeholder="  사용하실 닉네임을 입력해주세요."
            maxLength="8"
            onKeyDown={onKeyDown}
          ></InputText>
          <InputText
            className="password"
            type="password"
            onChange={eTargetValuePassword}
            placeholder="  사용하실 패스워드를 입력해 주세요."
            onKeyDown={onKeyDown}
          ></InputText>
          <Div>
            <CheckImageDiv>
              <InputText
                className="passwordCheck"
                type="password"
                onChange={eTargetValuePasswordCheck}
                placeholder="  패스워드를 다시 입력해 주세요."
                onKeyDown={onKeyDown}
              ></InputText>
              <span>
                {validateCheck ? <img src="/check.png"></img> : <></>}
              </span>
            </CheckImageDiv>
          </Div>

          <Validation>{!validate ? <div>ㅤ</div> : validate}</Validation>

          <Checkbox>
            <input type="checkbox" className="checkbox"></input>
            <h1>만 19세 미만은 회원가입이 불가합니다.</h1>
          </Checkbox>

          <DefaultButton className="default" onClick={handleSignUp}>
            회원가입
          </DefaultButton>
          <NaverButton className="naver" onClick={handleNaver}>
            <img src="/naver.png" width="30px" alt=""></img>
            네이버 계정으로 신규 가입
            <div className="blank"></div>
          </NaverButton>
          <KakaoButton className="kakao" onClick={handleKakao}>
            <img src="/kakao.png" width="25px" alt=""></img>
            카카오 계정으로 신규 가입
            <div className="blank"></div>
          </KakaoButton>
          <FacebookButton className="facebook" onClick={handleFacebook}>
            <img src="/facebook.png" width="20px" alt=""></img>
            페이스북 계정으로 신규 가입
            <div className="blank"></div>
          </FacebookButton>
        </Inner>
      </Outer>
    </PageUtils>
  );
}
