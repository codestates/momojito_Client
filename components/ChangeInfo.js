import styled, {ThemeContext} from 'styled-components';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import HoverButton from './HoverButton';

const Image = styled.div`
  display: flex;
  justify-content: center;
`;

const Profile = styled.img`
  width: auto;
  height: auto;
  max-width: 40%;
  max-height: 40%;
  border-radius: 50%;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const ButtonDiv1 = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  label {
    overflow: hidden;
    position: relative;
    display: inline-block;
    text-align: center;
    background: 0 none;
    border: 1px solid #31C460;
    border-radius: 5px;
    transition: all 0.5s;
    color: #31C460;
    margin: 1.5%;
    font-size: 70%; width:20%; height:70%;
    padding-top: 1%;
  }

  label:hover {
    background-color: #31C460;
    color: white;
    cursor: pointer;
  }
  label:before {
    content: '';
    z-index: -1;
    position: absolute;
    background: #31C460;
    transition: all 1s;

    left: 0;
    top: 0;
    width: 100%;
  }
`;

const ButtonDiv2 = styled.div`
  margin: auto;
  position: relative;

  button {
    overflow: hidden;
    position: relative;
    display: inline-block;
    text-align: center;
    background: 0 none;
    border: 1px solid #31C460;
    border-radius: 5px;
    transition: all 0.5s;
    border: 1px solid #31C460;
    color: #31C460;
    vertical-align: 18%;//내려가있는거 올리기
    font-size: 60%;
    padding-top: 3%;
  }

  button:hover {
    background-color: #31C460;
    color: white;
    cursor: pointer;
  }
  button:before {
    content: '';
    z-index: -1;
    position: absolute;
    background: #31C460;
    transition: all 1s;

    left: 0;
    top: 0;
    width: 100%;
  }
`;

const ButtonDiv3 = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 5%;

  button {
    overflow: hidden;
    position: relative;
    display: inline-block;
    text-align: center;
    background: 0 none;
    border: 1px solid #31C460;
    border-radius: 5px;
    transition: all 0.5s;
    color: #31C460;
    font-size: 60%;
    padding-top: 0.3%;
  }

  button:hover {
    background-color: #31C460;
    color: white;
    cursor: pointer;
  }
  button:before {
    content: '';
    z-index: -1;
    position: absolute;
    background: #31C460;
    transition: all 1s;

    left: 0;
    top: 0;
    width: 100%;
  }
`;

const Email = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10%;
  margin-left: 10%;
  color: #31C460;
`;

const Nickname = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10%;
  margin-left: 10%;
  color: #31C460;
`;

const Span = styled.span`
  margin: auto;
  color: black;
`;

const Password = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10%;
  margin-left: 10%;
  color: #31C460;
`;

const InputText = styled.input`
  display: flex;
  margin: auto;
  width: 50%;
  height: 30px;
  margin-block-start: 5%;
  border-radius: 5px;
  border: 1px solid grey;
`;

export default function ChangeInfo() {

  const {user, setUser} = useContext(ThemeContext).userContext;
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [nickname, setNickname] = useState();

  const [content, setContent] = useState();
  const [uploadedImg, setUploadedImg] = useState({filePath: null});

  function eTargetValueCurrentPassword(e) {
    setCurrentPassword(e.target.value);
  }
  function eTargetValuePassword(e) {
    setPassword(e.target.value);
  }
  function eTargetValuePasswordCheck(e) {
    setPasswordCheck(e.target.value);
  }
  function eTargetValueNickname(e) {
    setNickname(e.target.value);
  }

  function profile() {
    axios.get('http://localhost:5000/mypage/getUserData',{
      headers: {
        Authorization: `Bearer ${user.authToken}`
      }
    })
  };



  function removeProfileImg() {
    axios.post('http://localhost:5000/mypage/profileDelete', {
      withCredentials: true
    })
    .then((res)=>{
      setUser({profileImg: null});
    })
  }

  function updateNickname(e) {
    // if(닉네임이 8글자를 초과할 경우) {
    //   -> 모달창 '닉네임은 최대 8자까지 가능합니다.'
    // }
    axios.post('http://localhost:5000/mypage/nicknameChange',{
      nickname
    },{
      withCredentials: true
    })
    .then((res)=>{
      // if(이미 존재하는 닉네임이 있는 경우) {
          // -> 모달창 '이미 존재하는 닉네임 입니다'
      // }
      // else {
      //   setUser({
      //     username: res.body.nickname,
      //   });
      //   -> 모달창 '닉네임을 성공적으로 변경 하였습니다.'
      // }
      setUser({
        username: res.body.nickname,
      })
    })
  }

  function updatePassword() {
    
    axios.post('http://localhost:5000/mypage/passwordChange',{
      currentPassword,
      password,
      passwordCheck
    },{
      withCredentials: true
    })
    .then((res)=>{
      //if(currentPassword가 일치하지 않을 때)
      //else(일치하면?) -> 모달창 '패스워드가 성공적으로 변경되었습니다'
    })
  }

  const onChange = e => {
    setContent(e.target.files[0]);
    // onSubmit(e.target.files[0]);
  };
  
  
  const forSubmit = () => {
    if(content) {
      onSubmit();
    }
  }
  useEffect(forSubmit,[content]);

  const onSubmit = () => {
    // e.preventDefault();
    console.log('----->',content);
    const formData = new FormData();
    formData.append("uploadImg", content);

    axios
    .post("http://localhost:5000/mypage/profileChange", formData, {withCredentials: true})
    .then(res => {
      console.log('=======>>>>>>>',res);
      setUploadedImg({filePath: res.data.imageUrl});
      setUser({profileImg: res.data.imageUrl});
      console.log('profileImg----->>>>>>',user.profileImg)
      // alert("The file is successfully uploaded");-> 모달창으로 변경
    })
  };

  return (
    <div>
      <ButtonDiv>
        <form onSubmit={onSubmit}>

        {
          user.profileImg ?
          (
            <Image>
              <Profile src={user.profileImg} alt="">
              </Profile>
            </Image>
          )
        :
          (
        <Image>
        <svg
        width='40%'
        height='40%' 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="#31C460"
        >
        <path strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
        </svg>
        </Image>
          )
        }

        <div>
        </div>
        <ButtonDiv1>
        {/* <label class="btn fileUpload btn-default">https://stackoverflow.com/a/57051918/14914253 */}
        <label class="btn fileUpload btn-default">
            등록<input type="file" onChange={onChange} hidden/>
        </label>
        <label onClick={removeProfileImg}>삭제</label>
        </ButtonDiv1>
        </form>
      </ButtonDiv>

      <Email>이메일 <Span>{user.email}</Span></Email>
      <Nickname>닉네임 {!user.username ? <Span>내닉네임</Span> : <Span>{user.username}</Span>}
      <ButtonDiv2><button>변경하기</button></ButtonDiv2>
      </Nickname>
      <Password>비밀번호 변경</Password>
        <InputText type='password' onChange={eTargetValuePassword} placeholder='  현재 비밀번호'/>
        <InputText type='password' onChange={eTargetValueCurrentPassword} placeholder='  새 비밀번호'/>
        <InputText type='password' onChange={eTargetValuePasswordCheck} placeholder='  새 비밀번호 확인'/>
      <ButtonDiv3><button>변경하기</button></ButtonDiv3>
    </div>
  )
}