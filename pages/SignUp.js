import Header from '../components/Header';
import Footer from '../components/Footer';
import styled, { ThemeContext } from "styled-components";
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';


const SignUpText = styled.div`
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
    margin: 0 auto;//
    margin-right: 0;
    margin-left: 0;
  }
  .checkbox:hover {
    cursor: pointer;
  }
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
margin-block-start: 20px;
h1 {
  color: white;
}
:hover {
    cursor: pointer;
  }
`;

const Kakao = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: #FFE812;
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

export default function SignUp() {
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;

  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [passwordCheck, setPasswordCheck] = useState();
  let [validate, setValidate] = useState();

  function eTargetValueEmail(e) {
    setEmail(e.target.value);
  }
  function eTargetValuePassword(e) {
    setPassword(e.target.value);
  }
  function eTargetValuePasswordCheck(e) {
    setPasswordCheck(e.target.value);
  }


  function validation() {
    if(!email) {
      return 'email을 입력해 주세요.'
    }
    else if(!email.includes('@')) {
      return '올바른 형식의 email을 입력해 주세요.'
    }
    else if(!password || !passwordCheck) {
      return '비밀번호를 입력해 주세요.'
    }
    else if(password !== passwordCheck) {
      return '비밀번호가 일치하지 않습니다.'
    }
    else if(document.querySelector('.checkbox').checked !== true) {
      return '회원가입 정책에 동의해 주세요.'
    }
  }

  function handleSignUp() {
    setValidate(validation);
    
    if(email && password && passwordCheck) {
      if(password === passwordCheck) {
        if(document.querySelector('.checkbox').checked === true) {//!
          axios.post('http://localhost:3000/auth/signup',{
            email,
            password
          })
          .then((res)=>{
            //if(이미 존재하는 이메일이 있는 경우)
            setUser({
              isLogin: true,
              username: res.body.username,
              authToken: res.body.authToken
            })
            router.push('/mainpage/getTopTen');
        })
        }
      }
    }
  }

  function handleKakao() {
    axios.post()
  }

  function handleFacebook() {
    axios.post()
  }

  return (
    <div>
      <Header/>
      <SignUpText>회원가입</SignUpText>
        <InputText className='email' onChange={eTargetValueEmail} placeholder='  사용하실 이메일 주소를 입력해주세요.'></InputText>
        <InputText className='password' type='password' onChange={eTargetValuePassword} placeholder='  사용하실 패스워드를 입력해 주세요.'></InputText>
        <InputText className='passwordCheck' type='password' onChange={eTargetValuePasswordCheck} placeholder='  패스워드를 다시 입력해 주세요.'></InputText>
      
      <Validation>{!validate ? <div>ㅤ</div> : validate}</Validation>

      <Checkbox>
        <input type='checkbox' className='checkbox'></input>
        <h1>만 19세 미만은 회원가입이 불가합니다.</h1>
      </Checkbox>

      <Default className='default' onClick={handleSignUp}>
        <h1>회원가입</h1>
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
      <Footer/>
    </div>
  )
}

