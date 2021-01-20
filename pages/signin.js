import styled, { ThemeContext } from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import PageUtils from "../components/PageUtils";
// import Modal from 'react-modal';
const SignInText = styled.div`
  text-align: center;
  margin-block-start: 30%;
`;
const InputText = styled.input`
  display: flex;
  margin: auto;
  width: 300px;
  height: 30px;
  margin-block-start: 10px;
  border-radius: 5px;
  border: 1px solid grey;
`;
const Validation = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 3%;
  color: red;
  font-size: 50%;
`;
const Default = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  border-radius: 0.25rem;
  border: none;
  width: 300px;
  height: 36px;
  margin: auto; //?
  margin-block-start: 3%;
  h1 {
    color: white;
  }
  :hover {
    cursor: pointer;
  }
`;
const Naver = styled.button`
  display: flex;
  background-color: #23b366;
  justify-content: space-between;
  border-radius: 0.25rem;
  border: none;
  width: 300px;
  height: 36px;
  align-items: center;
  margin: auto;
  margin-block-start: 15px;
  .blank {
    width: 30px;
  }
  :hover {
    cursor: pointer;
  }
  h1 {
    color: white;
  }
`;
const Kakao = styled.button`
  display: flex;
  background-color: #ffe812;
  justify-content: space-between;
  border-radius: 0.25rem;
  border: none;
  width: 300px;
  height: 36px;
  align-items: center;
  margin: auto;
  margin-block-start: 15px;
  img {
    margin-left: 3px;
  }
  .blank {
    width: 30px;
  }
  :hover {
    cursor: pointer;
  }
`;
const Facebook = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 36px;
  background-color: #3a579c;
  border-radius: 5px;
  border: none;
  margin: auto;
  margin-block-start: 15px;
  img {
    margin-bottom: 3px;
  }
  h1 {
    color: white;
  }
  .blank {
    width: 30px;
  }
  :hover {
    cursor: pointer;
  }
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
`;
const Inner = styled.div``;

export default function Login() {
  const { user, setUser } = useContext(ThemeContext).userContext;
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validate, setValidate] = useState();
  // const [modalIsOpen, setIsOpen] = useState(false);
  // const [message, setMessage] = useState('로그인이 완료되었습니다');
  // function openModal() {
  //   setIsOpen(true);
  // }
  // function afterOpenModal() {
  //   subtitle.style.color = '#23B366';
  // }
  // function closeModal() {
  //   setIsOpen(false);
  //   if(message === '로그인이 완료되었습니다') {
  //     router.push('/');
  //   }
  // }
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
          "http://localhost:5000/auth/signin",
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
          if (res.status === 401) {
            alert("존재하지 않는 이메일 입니다.");
            setValidate("존재하지 않는 이메일 입니다.");
            return validate;
          } else if (res.status === 402) {
            alert("올바른 비밀번호를 입력해 주세요.");
            setValidate("올바른 비밀번호를 입력해 주세요.");
            return validate;
          } else {
            axios
              .get("http://localhost:5000/auth/accesstoken", {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res);
                setUser({
                  ...user,
                  userInfo: res.data.data.userInfo,
                  myCocktailList: res.data.data.cocktailList,
                  accessToken: res.data.data.accessToken,
                  isLogin: true,
                });
                localStorage.setItem("accessToken", res.data.data.accessToken);
                router.push("/");
              });
          }
        });
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
  function redirection() {
    router.push("/signup");
  }
  function onKeyDown(e) {
    if (e.keyCode == 13) {
      handleSignIn();
    }
  }
  useEffect(() => {
    if (user.isLogin) {
      router.push("/");
    }
  }, [user]);
  return (
    <PageUtils>
      {/* <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>{message}</h2>
        <HoverButton onClick={closeModal}><button>확인</button></HoverButton>
      </Modal> */}
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
          <Default onClick={handleSignIn}>
            <h1>로그인</h1>
          </Default>
          <Naver onClick={handleNaver}>
            <img src="/naver.png" width="30px" alt=""></img>
            <h1>네이버 계정으로 신규 가입</h1>
            <div className="blank"></div>
          </Naver>
          <Kakao onClick={handleKakao}>
            <img src="/kakao.png" width="25px" alt=""></img>
            <div>카카오 계정으로 신규 가입</div>
            <div className="blank"></div>
          </Kakao>
          <Facebook onClick={handleFacebook}>
            <img src="/facebook.png" width="20px" alt=""></img>
            <h1>페이스북 계정으로 신규 가입</h1>
            <div className="blank"></div>
          </Facebook>
          <Bottom>
            <h1>회원이 아니신가요?</h1>
            <h2 onClick={redirection}>회원가입</h2>
          </Bottom>
        </Inner>
      </Outer>
    </PageUtils>
  );
}

// import styled, {ThemeContext} from "styled-components";
// import axios from "axios";
// import { useState, useContext } from "react";
// import { useRouter } from "next/router";
// import PageUtils from "../components/PageUtils";
// // import Modal from 'react-modal';

// const SignInText = styled.div`
//   text-align: center;
//   margin-block-start: 30%;
// `;

// const InputText = styled.input`
//   display: flex;
//   margin: auto;
//   width: 300px;
//   height: 30px;
//   margin-block-start: 10px;
//   border-radius: 5px;
//   border: 1px solid grey;
// `;

// const Validation = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-block-start: 3%;
//   color: red;
//   font-size: 50%;
// `;

// const Default = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #000000;
//   border-radius: 0.25rem;
//   border: none;
//   width: 300px;
//   height: 36px;
//   margin: auto; //?
//   margin-block-start: 3%;
//   h1 {
//     color: white;
//   }
//   :hover {
//     cursor: pointer;
//   }
// `;

// const Naver = styled.button`
//   display: flex;
//   background-color: #23B366;
//   justify-content: space-between;
//   border-radius: 0.25rem;
//   border: none;
//   width: 300px;
//   height: 36px;
//   align-items: center;
//   margin: auto;
//   margin-block-start: 15px;
//   .blank {
//     width: 30px;
//   }
//   :hover {
//     cursor: pointer;
//   }
//   h1 {
//     color: white;
//   }
// `;

// const Kakao = styled.button`
//   display: flex;
//   background-color: #ffe812;
//   justify-content: space-between;
//   border-radius: 0.25rem;
//   border: none;
//   width: 300px;
//   height: 36px;
//   align-items: center;
//   margin: auto;
//   margin-block-start: 15px;
//   img {
//     margin-left: 3px;
//   }
//   .blank {
//     width: 30px;
//   }
//   :hover {
//     cursor: pointer;
//   }
// `;

// const Facebook = styled.button`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 300px;
//   height: 36px;
//   background-color: #3A579C;
//   border-radius: 5px;
//   border: none;
//   margin: auto;
//   margin-block-start: 15px;
//   img {
//     margin-bottom: 3px;
//   }
//   h1 {
//     color: white;
//   }
//   .blank {
//     width: 30px;
//   }
//   :hover {
//     cursor: pointer;
//   }
// `;

// const Bottom = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-block-start: 5%;
//   h1 {
//     color: grey;
//     font-size: 60%;
//   }
//   h2 {
//     text-decoration: underline;
//     font-size: 60%;
//     margin-left: 1%;
//     :hover {
//       cursor: pointer;
//     }
//   }
// `;

// export default function Login() {
//   const { user, setUser } = useContext(ThemeContext).userContext;
//   const router = useRouter();

//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [validate, setValidate] = useState();

//   // const [modalIsOpen, setIsOpen] = useState(false);
//   // const [message, setMessage] = useState('로그인이 완료되었습니다');

//   // function openModal() {
//   //   setIsOpen(true);
//   // }

//   // function afterOpenModal() {
//   //   subtitle.style.color = '#23B366';
//   // }

//   // function closeModal() {
//   //   setIsOpen(false);
//   //   if(message === '로그인이 완료되었습니다') {
//   //     router.push('/');
//   //   }
//   // }

//   function eTargetValueEmail(e) {
//     setEmail(e.target.value);
//   }
//   function eTargetValuePassword(e) {
//     setPassword(e.target.value);
//   }

//   function validation() {
//     if (!email) {
//       return "가입하신 이메일 주소를 입력해 주세요.";
//     } else if (!password) {
//       return "비밀번호를 입력해 주세요.";
//     }
//   }

//   function handleSignIn() {
//     setValidate(validation);
//     if(email && password) {
//       axios.post('http://localhost:5000/auth/signin', {
//         email,
//         password
//       },{
//         withCredentials: true
//       })
//       .then((res)=>{
//         setUser({...user, accessToken: res.accessToken});
//         axios.get('http://localhost:5000/auth/accesstoken',{
//           headers: {
//             Authorization: `Bearer ${user.accessToken}`
//           },
//           withCredentials: true
//         })
//       })
//       .then((res)=>{
//         if(res.status === 401) {
//             setValidate('존재하지 않는 이메일 입니다.');
//             return validate;
//           }
//           else if(res.status === 402) {
//               setValidate('올바른 비밀번호를 입력해 주세요.');
//               return validate;
//           } else {
//             setUser({...user,accessToken: res.accessToken, isLogin: true});
//             // openModal();
//           }
//       })
//       .catch((err)=>{
//         alert(err);
//       })
//     }
//   }

//   function handleNaver() {
//     axios.post();
//   }

//   function handleKakao() {
//     axios.post();
//   }

//   function handleFacebook() {
//     axios.post();
//   }

//   function redirection() {
//     router.push("/signup");
//   }

//   function onKeyDown(e) {
//     if(e.keyCode == 13) {
//       handleSignIn();
//     }
//   }

//   return (
//     <PageUtils>

//       {/* <Modal
//         isOpen={modalIsOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel='Example Modal'
//       >
//         <h2 ref={_subtitle => (subtitle = _subtitle)}>{message}</h2>
//         <HoverButton onClick={closeModal}><button>확인</button></HoverButton>
//       </Modal> */}

//       <SignInText>로그인</SignInText>
//       <InputText
//         onChange={eTargetValueEmail}
//         placeholder="  이메일 주소를 입력해 주세요."
//         onKeyDown={onKeyDown}
//       ></InputText>
//       <InputText
//         onChange={eTargetValuePassword}
//         placeholder="  비밀번호를 입력해 주세요."
//         type='password'
//         onKeyDown={onKeyDown}
//       ></InputText>

//       <Validation>{!validate ? <div>ㅤ</div> : validate}</Validation>

//       <Default onClick={handleSignIn}>
//         <h1>로그인</h1>
//       </Default>
//       <Naver onClick={handleNaver}>
//           <img src='/naver.png' width='30px' alt=''></img>
//           <h1>네이버 계정으로 신규 가입</h1>
//           <div className='blank'></div>
//         </Naver>
//       <Kakao onClick={handleKakao}>
//         <img src="/kakao.png" width="25px" alt=""></img>
//         <div>카카오 계정으로 신규 가입</div>
//         <div className="blank"></div>
//       </Kakao>
//       <Facebook onClick={handleFacebook}>
//         <img src="/facebook.png" width="20px" alt=""></img>
//         <h1>페이스북 계정으로 신규 가입</h1>
//         <div className="blank"></div>
//       </Facebook>

//       <Bottom>
//         <h1>회원이 아니신가요?</h1>
//         <h2 onClick={redirection}>회원가입</h2>
//       </Bottom>
//     </PageUtils>
//   );
// }
