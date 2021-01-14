import { useState, useContext } from "react";
import { Root, Body } from "../components/PageUtils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import quizdata from "../public/quizdb";
import styled from "styled-components";
import { useRouter } from "next/router";

const QuizHeader = styled.div`
    margin-top: 70px;   
    font-size: 24px;
    text-align: center;
`

const StatusBar = styled.div`
margin-top: 30px;
display: flex;
flex-direction: column;    
align-items: center;


    .bar {
        margin-top: 10px;
        border-radius: 5px;
        background-color: gray;
        height: 5px;
        width: 60%;
    }
`

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
        background-color: #EDFBD5;
        border: 1px solid #C2BDBD;
    }

    p {
        margin: 30px 15px;
        font-size: 14px;
    }
`
const AnswerList = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const AnswerBtn = styled.button`
    margin-top: 5px;
    width: 100%;
    height: 30px;
    text-align: left;
    padding-left: 25px;
    border: 1px solid #C2BDBD;
    background-color: white;
    cursor: pointer;

    &:hover {
        border-color: #36CC3C;
        background-color: #EDFBD5;
    }
`

function quiz() {

    const [count, setCount] = useState(0)
    const [totalScore, setScore] = useState(0)
    const [resultOn, setResultOn] = useState(false)

    console.log(totalScore)


    let q = quizdata[count]

    return (
        <Root>
            <Header></Header>
            <Body>
                <QuizHeader>✏️ 칵테일 능력평가</QuizHeader>
                {!resultOn ?
                    <>
                        <StatusBar>
                            <div className="count">{q.id}/{quizdata.length}</div>
                            <div className="bar"></div>
                        </StatusBar>
                        <QuizBody>
                            <div className="quiz-content question">
                                <p>{q.question}</p>
                            </div>
                            <div className="quiz-content">
                                <AnswerList>
                                    {q.answers.map((answer) => {
                                        return (<Answer
                                            count={count}
                                            setCount={setCount}
                                            answer={answer}
                                            score={q.score}
                                            totalScore={totalScore}
                                            setScore={setScore}
                                            setResultOn={setResultOn}
                                        ></Answer>)
                                    })}
                                </AnswerList>
                            </div>
                        </QuizBody>
                    </>
                    :
                    <Result totalScore={totalScore}></Result>
                }
            </Body>
            <Footer></Footer>
        </Root>

    )
}

function Answer({ answer, count, setCount, score, totalScore, setScore, setResultOn }) {
    const { text, isAnswer } = answer
    return (
        <AnswerBtn onClick={() => {
            if (isAnswer === true) {
                setScore(totalScore + score)
            }
            count++;
            if (quizdata[count]) {
                setCount(count)
            } else {
                setResultOn(true)
            }
        }}>{text}</AnswerBtn>
    )
}


const ResultBox = styled.div`
    margin: auto;
    margin-top: 30px;
    width: 250px;
    height: 350px;
    background-color: #EDFBD5;
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
`

function Result({ totalScore }) {
    const router = useRouter();
    const resultData = [
        {
            id: '1',
            imgsrc: 'result1.jpg',
            text: '삐빅 술알못입니다'
        },
        {
            id: '3',
            imgsrc: 'result3.gif',
            text: '삐빅 술잘알입니다'
        }
    ]

    // 라우터로 첫 문제로 안넘어가짐.. 결과페이지를 다른 url로 빼야되나???
    let result;

    if (totalScore < 50) { result = resultData[0] }
    else if (totalScore >= 50) { result = resultData[1] }

    return (
        <>
            <ResultBox>
                <h2 className="score-text">Score</h2>
                <div className="score">{totalScore}</div>
                <img className="result-img" src={result.imgsrc} alt="no images" />
                <div className="result-text">{result.text}</div>
            </ResultBox>
            <div>
                <button>칵테일 추천받기</button>
                <button onClick={() => router.push("/quiz")}>다시 도전하기</button>
            </div>
        </>
    )


}




export default quiz