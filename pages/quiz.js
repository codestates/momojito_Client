import { useState, useContext } from "react";
import { Root, Body } from "../components/PageUtils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import quizdata from "../public/quizdb";
import styled from "styled-components";

const QuizHeader = styled.div`
    font-size: 24px;
`

const QuizBody = styled.div`

`
const AnswerList = styled.div`
    display: flex;
`

const AnswerBtn = styled.button`
    
`

function quiz() {
    return (
        <Root>
            <Header></Header>
            <Body>
                <QuizHeader>칵테일 능력평가</QuizHeader>
                <div className="bar">

                </div>
                <QuizList></QuizList>
            </Body>
            <Footer></Footer>
        </Root>

    )
}
// 답을 누르면 다음 문제로 이동..

function QuizList() {
    const [count, setCount] = useState(0)
    const [score, setScore] = useState(0)

    let q = quizdata[count]

    return (
        <QuizBody>
            <div className="question">{q.question}</div>
            <AnswerList>
                {q.answers.map((answer) => {
                    return (<Answer count={count} setCount={setCount} answer={answer}></Answer>)
                })}
            </AnswerList>
        </QuizBody>

    )
}

function Answer({ answer, count, setCount }) {
    const { text, isAnswer } = answer
    return (
        <AnswerBtn onClick={() => {
            count++;
            if (quizdata[count]) {
                setCount(count)
            }
        }}>{text}</AnswerBtn>
    )
}


export default quiz
