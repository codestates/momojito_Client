import styled, {ThemeContext} from 'styled-components';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import HoverButton from './HoverButton';
import Modal from 'react-modal';
import PageUtils from "../components/PageUtils";


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

const Validation = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 3%;
  color: red;
  font-size: 50%;
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

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

export default function ChangeInfo() {

  const {user, setUser} = useContext(ThemeContext).userContext;
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [nickname, setNickname] = useState();
  const [isChangeNickname, setIsChangeNickname] = useState(false);

  const [content, setContent] = useState();
  const [uploadedImg, setUploadedImg] = useState({filePath: null});

  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const [validateCheck, setValidateCheck] = useState(false);
  const [validate, setValidate] = useState();

  var subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#23B366';
  }

  function closeModal() {
    setIsOpen(false);
    if(message === '닉네임이 성공적으로 변경되었습니다') {
      router.push('/');
    }
    if(message === '비밀번호가 성공적으로 변경되었습니다') {
      router.push('/');
    }
  }

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

  function checkPasswordCheck() {
    if((password && passwordCheck) && password === passwordCheck) {
      setValidateCheck(true);
    }
    else {
      setValidateCheck(false);
    }
  }
  useEffect(checkPasswordCheck,[passwordCheck]);
  useEffect(validation,[validateCheck]);
  function validation() {
    if (!password || !passwordCheck) {
      return "비밀번호를 입력해 주세요.";
    } else if (password !== passwordCheck) {
      return "비밀번호가 일치하지 않습니다.";
    }
  }


  // function getUserData() {
  //   axios.get('http://localhost:5000/mypage/getUserData',{
  //     headers: {
  //       Authorization: `Bearer ${user.accessToken}`
  //     },
  //     withCredentials: true
  //   })
  // };



  function removeProfileImg() {
    axios.post('http://localhost:5000/mypage/profileDelete', {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      },
      withCredentials: true
    })
    .then((res)=>{
      setUser({userInfo: {profileImg: null}});
    })
  }
  useEffect(()=>{},[user.userInfo.profileImg]);//!

  function clickNicknameChange() {
    setIsChangeNickname(true);
    openModal();
  }

  function updateNickname(e) {

    axios.post('http://localhost:5000/mypage/nicknameChange',{
      nickname,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    },{
      withCredentials: true
    })
    .then((res)=>{
      if(res.status === 400) {
        setValidate('이미 존재하는 닉네임 입니다');
        openModal();
      }
      else if(res.status === 200) {
        setUser({userInfo: {
          nickname: nickname,
        }});
        setValidate('닉네임이 성공적으로 변경되었습니다');
        openModal();
      }
    })
  }

  function updatePassword() {
    
    axios.post('http://localhost:5000/mypage/passwordChange',{
      currentPassword,
      newPassword: password,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    },{
      withCredentials: true
    })
    .then((res)=>{
      if(res.status === 400) {
        setMessage('올바른 현재 비밀번호를 입력해 주세요');
      }
      else if(res.status === 200) {
        setMessage('패스워드가 성공적으로 변경되었습니다');
      }
    })
    .catch((err)=>{
      setMessage(err);
      openModal();
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

  const onSubmit = (content) => {
    const formData = new FormData();
    formData.append("uploadImg", content);

    axios
    .post("http://localhost:5000/mypage/profileChange", formData, {withCredentials: true})
    .then(res => {
      setUploadedImg({filePath: res.data.imageUrl});
      setUser({userInfo: {profileImg: res.data.imageUrl}});
    })
  };

  
  return (
    <PageUtils>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>{message}</h2>
        <Validation>{!validate ? <></> : validate}</Validation>
        <InputText maxLength='8' onChange={eTargetValueNickname} placeholder='변경할 닉네임을 입력해 주세요'></InputText>
        {isChangeNickname? <HoverButton onClick={updateNickname}>변경하기</HoverButton> : <></>}
        <HoverButton onClick={closeModal}><button>확인</button></HoverButton>
      </Modal>
      <ButtonDiv>
        <form onSubmit={onSubmit}>

        {
          user.userInfo.profileImg ?
          (
            <Image>
              <Profile src={user.userInfo.profileImg} alt="">
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

      <Email>이메일 <Span>{user.userInfo.email}</Span></Email>
      <Nickname>닉네임 {!user.userInfo.nickname ? <Span>내닉네임</Span> : <Span>{user.userInfo.nickname}</Span>}
      <ButtonDiv2><button onClick={clickNicknameChange}>변경하기</button></ButtonDiv2>
      </Nickname>
      <Password>비밀번호 변경</Password>
        <InputText type='password' onChange={eTargetValuePassword} placeholder='  현재 비밀번호'/>
        <InputText type='password' onChange={eTargetValueCurrentPassword} placeholder='  새 비밀번호'/>
        <InputText type='password' onChange={eTargetValuePasswordCheck} placeholder='  새 비밀번호 확인'/>
      <ButtonDiv3><button onClick={updatePassword}>변경하기</button></ButtonDiv3>
    </PageUtils>
  )
}