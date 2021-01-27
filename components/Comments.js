import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import ButtonM from "./ButtonM";
import Pagination from "./Pagination";

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

  .lgn-msg {
    margin: 20px 0px;
    font-weight: bold;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0px;
  .input-nickname,
  .nickname {
    align-self: flex-start;
    width: 150px;
  }

  .input-text {
    margin-top: 10px;
    padding: 10px 0px 0px 10px;
    width: 100%;
    height: 50px;
  }

  .submit-btn {
    margin-top: 10px;
    align-self: flex-end;
  }
`;
function Comments({ page }) {
  const { user, setUser } = useContext(ThemeContext).userContext;
  const [text, setText] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(5);

  useEffect(() => {
    // 코멘트 받아오기
    const getComments = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://server.momo-jito.com/comment/get/?contents=${page}`
      );
      setCommentsData(res.data.data);
      setLoading(false);
    };
    
    getComments();
  }, []);

  // Get current comments
  const indexOfLastComment = currentPage * commentsPerPage; // 5
  const indexOfFirstComment = indexOfLastComment - commentsPerPage; // 1
  const currentComments = commentsData.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  const textHandler = (e) => {
    setText(e.target.value);
  };

  const postComment = async (e) => {
    e.preventDefault();
    const res = await axios
      .post(
        `https://server.momo-jito.com/comment/create/?contents=${page}`,
        { text: text },
        { withCredentials: true }
      ).then(alert('댓글 작성 완료!'))
      .catch(alert);
 
    setCommentsData([res.data.data[0], ...commentsData]);
    setText("")
  };

  return (
    <Wrap>
      <div className="head">{commentsData.length}개의 댓글</div>
      {user.isLogin ? (
        <Form>
          <div className="nickname">닉네임: {user.userInfo.nickname}</div>
          <textarea
            onChange={textHandler}
            value={text}
            className="input-text"
            placeholder="코멘트를 입력해주세요"
          ></textarea>
          <ButtonM onClick={postComment} className="submit-btn">
            댓글 작성
          </ButtonM>
          {/* <button className="submit-btn">코멘트 작성</button> */}
        </Form>
      ) : (
        <div className="lgn-msg">댓글을 남기시려면 로그인해주세요</div>
      )}
      {currentComments.map((data, idx) => {
        return <Comment key={idx} data={data}></Comment>;
      })}
      <Pagination
        commentsPerPage={commentsPerPage}
        totalComments={commentsData.length}
        paginate={paginate}
      />
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
