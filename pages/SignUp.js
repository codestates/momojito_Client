import Header from '../components/Header';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { Router } from 'next/router';

const SignUpText = styled.div`
  text-align: center;
  margin-block-start: 30%;
`;

const InputText = styled.input`
  display: flex;
  margin: auto;
  width: 72.5%;
  height: 30px;
  margin-block-start: 20px;
`;

const Checkbox = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 20px;
  h1 {
    font-size: 70%;
  }
`; 

const Validation = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 20px;
  color: red;
  font-size: 10%;
`;

const Default = styled.button`
display: flex;
justify-content: center;
align-items: center;
background-color: #000000;
border-radius: 0.25rem;
width: 75%;
height: 36px;
margin-left: 12.5%;//?
margin-block-start: 20px;
h1 {
  color: white;
}
`;

const Kakao = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: #FFE812;
  border-radius: 0.25rem;
  width: 75%;
  align-items: center;
  margin-left: 12.5%;
  margin-block-start: 20px;
  .blank {
    width: 30px
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
  margin-left: 12.5%;
  margin-block-start: 20px;
  h1 {
    color: white;
  }
  .blank {
    width: 30px;
  }
`;

export default function SignUp() {
  
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [passwordCheck, setPasswordCheck] = useState();
  let [validate, setValidate] = useState();

  function setState(e) {
    setEmail(e.target.value);
    setPassword(e.target.value);
    setPasswordCheck(e.target.passwordCheck);
  }

  function validation() {
    if(!email) {
      return 'email을 입력해 주세요.'
    }
    else if(!email.includes('@','com')) {
      return '올바른 형식의 email을 입력해 주세요.'
    }
    else if(password !== passwordCheck) {
      return '비밀번호가 일치하지 않습니다.'
    }
  }
  
  function handleSignUp() {
    setValidate(validation());
    if(email || password || passwordCheck) {
      if(password === passwordCheck) {
        axios.post('http://localhost:3000/auth/signup',{
          email,
          password
        })
        .then((res)=>{
          axios.post(' http://localhost:3000/auth/signin',{
            email,
            password
          })
        })
        .then((res)=>{
          Router.push('/mainpage/getTopTen');
        })
      }
    }
  }

  return (
    <div>
      <Header/>
      <SignUpText>회원가입</SignUpText>
        <InputText className='email' onChange={setState} placeholder='사용하실 이메일 주소를 입력해주세요.'></InputText>
        <InputText className='password' placeholder='사용하실 패스워드를 입력해 주세요.'></InputText>
        <InputText className='passwordCheck' placeholder='패스워드를 다시 입력해 주세요.'></InputText>
      
      <Validation>{validate}</Validation>

      <Checkbox>
        <input type='checkbox'></input>
        <h1>만 19세 미만은 회원가입이 불가합니다.</h1>
      </Checkbox>

      <Default onClick={handleSignUp}>
        <h1>회원가입</h1>
      </Default>
      <Kakao>
        <img src='/kakao.svg' width='30px' alt=''></img>
        <div>카카오 계정으로 신규 가입</div>
        <div className='blank'></div>
      </Kakao>
      <Facebook>
        <img src='/facebook.png' width='30px' alt=''></img>
        <h1>페이스북 계정으로 신규 가입</h1>
        <div className='blank'></div>
      </Facebook>
    </div>
  )
}

