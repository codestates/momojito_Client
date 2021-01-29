import styled, { ThemeContext } from "styled-components";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import HoverButton from "./HoverButton";
import Modal from "react-modal";

const Image = styled.div`
  display: flex;
  justify-content: center;
`;

const Profile = styled.img`
  width: 200px;
  height: 200px;
  max-width: 10rem;
  max-height: 10rem;
  border-radius: 50%;
`;

const Validation = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 3%;
  color: red;
  font-size: 80%;
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
    border: 1px solid #31c460;
    border-radius: 5px;
    transition: all 0.5s;
    color: #31c460;
    margin: 1.5%;
    font-size: 70%;
    width: 20%;
    height: 70%;
    padding-top: 1%;
  }

  label:hover {
    background-color: #31c460;
    color: white;
    cursor: pointer;
  }
  label:before {
    content: "";
    z-index: -1;
    position: absolute;
    background: #31c460;
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
    border: 1px solid #31c460;
    border-radius: 5px;
    transition: all 0.5s;
    border: 1px solid #31c460;
    color: #31c460;
    vertical-align: 18%; //내려가있는거 올리기
    font-size: 60%;
    padding-top: 3%;
    margin-left: 100px;
  }

  button:hover {
    background-color: #31c460;
    color: white;
    cursor: pointer;
  }
  button:before {
    content: "";
    z-index: -1;
    position: absolute;
    background: #31c460;
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
    border: 1px solid #31c460;
    border-radius: 5px;
    transition: all 0.5s;
    color: #31c460;
    font-size: 60%;
    padding-top: 0.3%;
  }

  button:hover {
    background-color: #31c460;
    color: white;
    cursor: pointer;
  }
  button:before {
    content: "";
    z-index: -1;
    position: absolute;
    background: #31c460;
    transition: all 1s;

    left: 0;
    top: 0;
    width: 100%;
  }
`;

const Email = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10%;
  color: #31c460;

  span {
    margin-left: 50px;
    color: black;
  }
`;

const Nickname = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10%;
  color: #31c460;
  span {
    margin-left: 50px;
    color: black;
  }
`;

const Password = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10%;
  color: #31c460;
`;

const InputText = styled.input`
  display: flex;
  margin: auto;
  width: 300px;
  height: 30px;
  margin-block-start: 1rem;
  border-radius: 0.25rem;
  border: 1px solid grey;
  padding-left: 10px;
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
    margin-top: 1.5rem;
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

export default function ChangeInfo() {
  const { user, setUser } = useContext(ThemeContext).userContext;
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [nickname, setNickname] = useState();
  const [isChangeNickname, setIsChangeNickname] = useState(false);

  const [content, setContent] = useState();
  const [uploadedImg, setUploadedImg] = useState({ filePath: null });

  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const [validateCheck, setValidateCheck] = useState(false);
  const [validatePassword, setValidatePassword] = useState();
  const [validateNickname, setValidateNickname] = useState();

  var subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#23B366";
  }

  function closeModal() {
    if (content) {
      return;
    }
    setMessage();
    setNickname();
    setIsChangeNickname();
    setValidatePassword();
    setValidateNickname();
    setIsOpen(false);
    window.location.reload();
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
    if (password && passwordCheck && password === passwordCheck) {
      setValidateCheck(true);
    } else {
      setValidateCheck(false);
    }
  }
  useEffect(checkPasswordCheck, [passwordCheck]);
  useEffect(validation, [validateCheck]);
  function validation() {
    if (!password || !passwordCheck) {
      return "비밀번호를 입력해 주세요.";
    } else if (password !== passwordCheck) {
      return "비밀번호가 일치하지 않습니다.";
    }
    if (!currentPassword) {
      return "현재 비밀번호를 입력해 주세요.";
    }
  }

  function removeProfileImg() {
    if (!user.userInfo.profile) {
      setMessage("삭제할 프로필 이미지가 존재하지 않습니다");
      openModal();
      return;
    }
    axios
      .post("https://server.momo-jito.com/mypage/profileDelete", "", {
        withCredentials: true,
      })
      .then((res) => {
        setUser({ userInfo: { profile: null } });
        window.location.reload();
      })
      .catch((err) => {
        setMessage(`${err}`);
        openModal();
      });
  }

  function clickNicknameChange() {
    setIsChangeNickname(true);
    setMessage();
    openModal();
  }

  function updateNickname() {
    if (nickname) {
      axios
        .post(
          "https://server.momo-jito.com/mypage/nicknameChange",
          {
            nickname,
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setUser({
              userInfo: {
                nickname: nickname,
              },
            });
            setValidateNickname("닉네임이 성공적으로 변경되었습니다");
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setValidateNickname("이미 존재하는 닉네임 입니다");
          } else {
            setMessage(`${err}`);
            openModal();
          }
        });
    }
  }

  function updatePassword() {
    setValidatePassword(validation);
    setValidateCheck();
    if (currentPassword && password && passwordCheck) {
      if (password === passwordCheck) {
        axios
          .post(
            "https://server.momo-jito.com/mypage/passwordChange",
            {
              currentPassword,
              newPassword: password,
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              setMessage("패스워드가 성공적으로 변경되었습니다");
              openModal();
            }
          })
          .catch((err) => {
            if (err.response.status === 400) {
              setValidatePassword("올바른 현재 비밀번호를 입력해 주세요");
            } else {
              setMessage(`${err}`);
              openModal();
            }
          });
      }
    }
  }

  const onChange = (e) => {
    setContent(e.target.files[0]);
    // onSubmit(e.target.files[0]);
  };

  const forSubmit = () => {
    if (content) {
      onSubmit();
    }
  };
  useEffect(forSubmit, [content]);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("uploadImg", content);
    console.log("content->", content);
    setMessage("이미지를 업로드 하는 중입니다");
    openModal();

    axios
      .post("https://server.momo-jito.com/mypage/profileChange", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res);
        setUploadedImg({ filePath: res.data.imageUrl });
        setUser({ userInfo: { profile: res.data.imageUrl } });
      });
  };
  useEffect(() => {
    setMessage("이미지 업로드가 완료되었습니다");
    setContent();
  }, [uploadedImg]);

  return (
    <Outer>
      <Inner>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            {message ? message : <></>}
          </h2>
          {content ? (
            <Image>
              <img src={"/loading.gif"} width="300px" alt=""></img>
            </Image>
          ) : (
            <></>
          )}
          {isChangeNickname ? (
            <InputText
              maxLength="8"
              onChange={eTargetValueNickname}
              placeholder="  변경할 닉네임을 입력해 주세요"
            ></InputText>
          ) : (
            <></>
          )}
          {isChangeNickname ? (
            <Validation>
              {!validateNickname ? <></> : validateNickname}
            </Validation>
          ) : (
            <></>
          )}
          {isChangeNickname ? (
            <HoverButton onClick={updateNickname}>
              <button>변경하기</button>
            </HoverButton>
          ) : (
            <></>
          )}
          <HoverButton onClick={closeModal}>
            <button>확인</button>
          </HoverButton>
        </Modal>
        <ButtonDiv>
          <form onSubmit={onSubmit}>
            {user.userInfo.profile ? (
              <Image>
                <Profile src={user.userInfo.profile} alt=""></Profile>
              </Image>
            ) : (
              <Image>
                <svg
                  width="230px"
                  height="230px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#31C460"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Image>
            )}

            <div></div>
            <ButtonDiv1>
              {/* <label class="btn fileUpload btn-default">https://stackoverflow.com/a/57051918/14914253 */}
              <label className="btn fileUpload btn-default">
                등록
                <input type="file" onChange={onChange} hidden />
              </label>
              <label onClick={removeProfileImg}>삭제</label>
            </ButtonDiv1>
          </form>
        </ButtonDiv>

        <Email>
          이메일 <span>{user.userInfo.email}</span>
        </Email>
        <Nickname>
          닉네임
          <span>{user.userInfo.nickname}</span>
          <ButtonDiv2>
            <button onClick={clickNicknameChange}>변경하기</button>
          </ButtonDiv2>
        </Nickname>
        <Password>비밀번호 변경</Password>
        <InputText
          type="password"
          onChange={eTargetValueCurrentPassword}
          placeholder="현재 비밀번호"
          className="currentPassword"
        />
        <InputText
          type="password"
          onChange={eTargetValuePassword}
          placeholder="새 비밀번호"
          className="newPassword"
        />
        <Div>
          <CheckImageDiv>
            <InputText
              type="password"
              onChange={eTargetValuePasswordCheck}
              placeholder="새 비밀번호 확인"
              className="newPasswordCheck"
            />
            <span>{validateCheck ? <img src="/check.png"></img> : <></>}</span>
          </CheckImageDiv>
        </Div>
        {validatePassword ? (
          <Validation>
            {!validatePassword ? <></> : validatePassword}
          </Validation>
        ) : (
          <></>
        )}
        <ButtonDiv3>
          <button onClick={updatePassword}>변경하기</button>
        </ButtonDiv3>
      </Inner>
    </Outer>
  );
}
