import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import {useState} from 'react';
import {useRouter} from 'next/router';

const SignInText = styled.div`
  text-align: center;
  margin-block-start: 30%;
`;

const InputText = styled.input`
  display: flex;
  margin: auto;
  width: 75%;
  height: 30px;
  margin-block-start: 3%;
  border-radius: 5px;
  border: 1px solid grey;
`;

const Validation = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 3%;
  color: red;
  font-size: 80%;
`;


const Default = styled.button`
display: flex;
justify-content: center;
align-items: center;
background-color: #000000;
border-radius: 0.25rem;
border: none;
width: 75%;
height: 36px;
margin: auto;//?
margin-block-start: 3%;
h1 {
  color: white;
}
:hover {
    cursor: pointer;
  }
`;

const Kakao = styled.button`
  display: flex;
  background-color: #FFE812;
  justify-content: space-between;
  border-radius: 0.25rem;
  border: none;
  width: 75%;
  align-items: center;
  margin: auto;
  margin-block-start: 20px;
  .blank {
    width: 30px
  }
  :hover {
    cursor: pointer;
  }
`;

const Facebook = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  height: 36px;
  background-color: #1E4799;
  border-radius: 5px;
  border: none;
  margin: auto;
  margin-block-start: 20px;
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

export default function Login() {
  
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [validate, setValidate] = useState();

  const router = useRouter();

  function eTargetValueEmail(e) {
    setEmail(e.target.value);
  }
  function eTargetValuePassword(e) {
    setPassword(e.target.value);
  }

  function validation() {
    if(!email) {
      return '가입하신 이메일 주소를 입력해 주세요.'
    }
    else if(!password) {
      return '비밀번호를 입력해 주세요.'
    }
  }

  function handleSignIn() {
    setValidate(validation);
    if(email && password) {
      axios.post('http://localhost:5000/auth/signin', {
        email,
        password
      },{
        withCredentials: true
      })
      .then((res)=>{
        router.push('/mypage');
        // if(존재하지 않는 아이디의 경우) {
        //   setValidate('존재하지 않는 아이디 입니다.');
        //   return validate;
        // }
        // else if(비밀번호가 틀린 경우) {
        //   setValidate('올바른 비밀번호를 입력해 주세요.');
        //   return validate;
        // }
      })
    }
  }

  function handleKakao() {
    axios.post()
  }

  function handleFacebook() {
    axios.post()
  }
  
  const redirection = (e) => {
    router.push('/signup');
  }

  return (
    <div>
      <Header/>
      <SignInText>로그인</SignInText>
        <InputText onChange={eTargetValueEmail} placeholder='  이메일 주소를 입력해 주세요.'></InputText>
        <InputText type='password' onChange={eTargetValuePassword} placeholder='  비밀번호를 입력해 주세요.'></InputText>
      
      <Validation>{!validate ? <div>ㅤ</div> : validate}</Validation>
      
      <Default onClick={handleSignIn}>
        <h1>로그인</h1>
      </Default>
      <Kakao onClick={handleKakao}>
        <img src='/kakao.svg' width='30px' alt=''></img>
        <div>카카오 계정으로 신규 가입</div>
        <div className='blank'></div>
      </Kakao>
      <Facebook onClick={handleFacebook}>
        <img src='/facebook.png' width='30px' alt=''></img>
        <h1>페이스북 계정으로 신규 가입</h1>
        <div className='blank'></div>
      </Facebook>

      <Bottom>
        <h1>회원이 아니신가요?</h1>
        <h2 onClick={redirection}>회원가입</h2>
      </Bottom>
      <Footer/>
    </div>
  )
}