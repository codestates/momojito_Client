import { useState, useEffect } from "react";
import PageUtils from "../components/PageUtils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import quizdata from "../public/quizdb";
import styled from "styled-components";
import { useRouter } from "next/router";
import ProgressBar from "../components/ProgressBar";
import Head from "next/head";

const QuizHeader = styled.div`
  margin-top: 70px;
  font-size: 24px;
  text-align: center;
`;

const StatusBar = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .bar {
    margin-top: 10px;
  }
`;

const QuizBody = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .quiz-content {
    width: 80%;
  }

  .question {
    height: 100px;
    background-color: #edfbd5;
    border: 1px solid #c2bdbd;
  }

  p {
    margin: 30px 15px;
    font-size: 14px;
  }
`;
const AnswerList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnswerBtn = styled.button`
  margin-top: 5px;
  width: 100%;
  height: 30px;
  text-align: left;
  padding-left: 25px;
  border: 1px solid #c2bdbd;
  background-color: white;
  cursor: pointer;

  //   &:hover {
  //     border-color: #36cc3c;
  //     background-color: #edfbd5;
  //   }
  &:active {
    border-color: #36cc3c;
    background-color: #edfbd5;
  }
`;

function quiz() {
  const [count, setCount] = useState(0);
  const [totalScore, setScore] = useState(0);
  const [resultOn, setResultOn] = useState(false);
  const percentage = (count / quizdata.length) * 100;

  console.log(totalScore);

  let q = quizdata[count];
  return (
    <PageUtils>
      <Head>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Head>

      <QuizHeader>✏️ 칵테일 능력평가</QuizHeader>
      {!resultOn ? (
        <>
          <StatusBar>
            <div className="count">
              {q.id}/{quizdata.length}
            </div>
            {/* <div className="bar"></div> */}
            <ProgressBar percentage={percentage}></ProgressBar>
          </StatusBar>
          <QuizBody>
            <div className="quiz-content question">
              <p>{q.question}</p>
            </div>
            <div className="quiz-content">
              <AnswerList>
                {q.answers.map((answer) => {
                  return (
                    <Answer
                      count={count}
                      setCount={setCount}
                      answer={answer}
                      score={q.score}
                      totalScore={totalScore}
                      setScore={setScore}
                      setResultOn={setResultOn}
                    ></Answer>
                  );
                })}
              </AnswerList>
            </div>
          </QuizBody>
        </>
      ) : (
        <Result totalScore={totalScore}></Result>
      )}
    </PageUtils>
  );
}

function Answer({
  answer,
  count,
  setCount,
  score,
  totalScore,
  setScore,
  setResultOn,
}) {
  const { text, isAnswer } = answer;
  return (
    <AnswerBtn
      onClick={() => {
        if (isAnswer === true) {
          setScore(totalScore + score);
        }
        count++;
        if (quizdata[count]) {
          setCount(count);
        } else {
          setResultOn(true);
        }
      }}
    >
      {text}
    </AnswerBtn>
  );
}

const ResultBox = styled.div`
  margin: auto;
  margin-top: 30px;
  width: 350px;
  height: 350px;
  background-color: #edfbd5;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  .score-text {
    margin-top: 20px;
    font-size: 20px;
  }

  .score {
    margin-top: 10px;
    font-size: 24px;
    color: red;
  }

  .result-img {
    margin-top: 20px;
    border-radius: 3px;
    width: 120px;
    height: 120px;
  }

  .result-text {
    margin-top: 20px;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .btn {
    height: 50px;
    width: 240px;
    margin-top: 10px;
    cursor: pointer;
    background-color: white;

    &:hover {
      background-color: limegreen;
      color: white;
    }
    &:active {
      background-color: green;
      color: white;
    }
  }
`;

function Result({ totalScore }) {
  const router = useRouter();
  const resultData = [
    {
      id: "1",
      imgsrc: "result1.jpg",
      text: "삐빅 술알못입니다",
    },
    {
      id: "3",
      imgsrc: "result3.gif",
      text: "삐빅 술잘알입니다",
    },
  ];

  let result;

  if (totalScore < 50) {
    result = resultData[0];
  } else if (totalScore >= 50) {
    result = resultData[1];
  }

  return (
    <>
      <ResultBox>
        <h2 className="score-text">Score</h2>
        <div className="score">{totalScore}</div>
        <img className="result-img" src={result.imgsrc} alt="no images" />
        <div className="result-text">{result.text}</div>
      </ResultBox>
      <ButtonDiv>
        <button
          className="btn"
          selected=""
          onClick={
            () => (document.location.href = "/quiz") /*router.push("/quiz")*/
          }
        >
          다시 도전하기
        </button>
        <button className="btn" selected="">
          칵테일 추천받기
        </button>
        <KakaoShareButton result={result} className="btn"></KakaoShareButton>
      </ButtonDiv>
    </>
  );
}

const kakaoKey = "75d977bf235fda941972e4be5835408a";

function KakaoShareButton({ result }) {
  useEffect(() => {
    createKakaoButton();
  }, []);

  console.log(result.imgsrc);
  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(kakaoKey);
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "나의 술알못 테스트 결과는?",
          description: result.text,
          imageUrl:
            "http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg", // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      });
    }
  };
  return (
    <button className="btn" id="kakao-link-btn">
      카카오톡 공유하기
    </button>
  );
}

export default quiz;
