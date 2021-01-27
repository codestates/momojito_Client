import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import ButtonM from "./ButtonM"

const Wrap = styled.div`
  /* border: 1px solid black; */
  margin: 30px;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 80%;
  /* align-items: center; */
  .head {
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0px;
  .input-nickname, .nickname {
    align-self: flex-start;
    width: 150px;
  }

  .input-text {
    margin-top: 10px;
    width: 100%;
    height: 50px;
  }

  .submit-btn {
    margin-top: 10px;
    align-self: flex-end;
  }
`;
function Comments({commentsData}) {
  const { user, setUser } = useContext(ThemeContext).userContext;
  const commentData = [
    {
      nickname: "영권",
      profile:
        "https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg",
      date: "2021년 1월 25일",
      text: "와 개지리는데요??",
    },
    {
      nickname: "민구",
      profile:
        "https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg",
      date: "2021년 1월 25일",
      text: "지렷다",
    },
    {
      nickname: "정로",
      profile:
        "https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg",
      date: "2021년 1월 25일",
      text: "ㅋㅋㅋㅋㅋ굳이요",
    },
    {
      nickname: "도현",
      profile:
        "https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg",
      date: "2021년 1월 25일",
      text: "ㅁㄹㅇㄴㄹㅁㅁㅇㄹㄴ",
    },
  ];

  return (
    <Wrap>
      <div className="head">{commentData.length}개의 Comment</div>
      <Form>
         {user.isLogin? 
         <div className="nickname">
            닉네임:  {user.userInfo.nickname}
         </div>
         :
         <input
           className="input-nickname"
           placeholder="닉네임"
         ></input>
         } 
        <textarea className="input-text" placeholder="코멘트를 입력해주세요"></textarea>
        <ButtonM className="submit-btn">코멘트 작성</ButtonM>
        {/* <button className="submit-btn">코멘트 작성</button> */}
      </Form>
      {commentData.map((data) => {
        return <Comment data={data}></Comment>;
      })}
    </Wrap>
  );
}

const CommentWrap = styled.div`
  border-bottom: 1px solid grey;
  padding: 10px;
  .user {
    display: flex;
    align-items: center;
  }
  .profile-img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }

  .date {
    margin-top: 5px;
    font-size: 12px;
  }
  .text {
    font-size: 14px;
    margin: 15px 20px 0px 20px;
  }
`;

function Comment({ data }) {
  console.log(data);
  const { nickname, profile, date, text } = data;
  return (
    <CommentWrap>
      <div className="user">
        <img className="profile-img" src={profile} alt="" />
        <div>
          <div className="name">{nickname}</div>
          <div className="date">{date}</div>
        </div>
      </div>
      <div className="text">{text}</div>
    </CommentWrap>
  );
}
export default Comments;
