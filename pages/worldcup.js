import PageUtils from "../components/PageUtils";
import db from "../public/cocktaildb";
import styled from "styled-components";
import React, { useReducer, useRef, useState } from "react";
import { useSpring, useSprings, animated } from "react-spring";
import { useRouter } from "next/router";
import KakaoShareButton from "../components/KakaoShareButton";
import Comments from "../components/Comments";
const cards = Array.from({ length: 8 }, (_, i) => i).map(
  (v) => `/cocktails/${v}.png`
);

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;

  .bottom {
    position: absolute;
    width: 100%;
    top: 430px;
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

    .comments {
      width: 600px;
    }
  }
`;
const Card = styled(animated.div)`
  position: absolute;
  background-color: white;
  background-size: auto 70%;
  background-repeat: no-repeat;
  background-position: 50% 25%;
  top: 100px;
  width: 150px;
  height: 200px;
  border-radius: 10px;
  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  cursor: pointer;
  &:hover {
    /* background-color:#B5EBB7; */
    background-color: #edfbd5;
    color: black;
  }
`;

const messageMaker = (message, state) => {
  if (state.deck.length === 16) {
    return "16강";
  } else if (state.deck.length === 8) {
    return "8강";
  } else if (state.deck.length === 4) {
    return "4강";
  } else if (state.deck.length === 2) {
    return "결승";
  } else if (state.deck.length === 1) {
    return "우승!";
  } else {
    return message;
  }
};

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
  padding: 2rem;
`;

const Name = styled.h1`
  position: absolute;
  text-align: center;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-size: 1rem;
`;

const KakaoLink = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  p {
    align-self: center;
    font-size: 14px;
    margin-right: 10px;
  }
`;

const shuffle = (unshuffled) =>
  unshuffled
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

export default function WorldCup() {
  const [shuffled, setShuffled] = useState(
    shuffle(Array.from({ length: 8 }, (v, i) => i))
  );
  const [props, set] = useSprings(cards.length, (i) => ({
    x: 0,
    y: i * -2,
    scale: 1,
    rotate: -10 + Math.random() * 20,
    delay: shuffled.indexOf(i) * 100,
    zIndex: shuffled.indexOf(i),
    from: { x: 0, rot: 0, scale: 1.5, y: -1000 },
  }));
  const [state, dispatch] = useReducer(reducer, {
    deck: shuffled,
    table: [],
    leftGone: [],
    rightGone: [],
    message: `${2 ** Math.ceil(Math.sqrt(cards.length))}강`,
  });
  function reducer(state, action) {
    switch (action.type) {
      case "deal":
        if (state.deck.length === 1) {
          return state;
        }
        return {
          ...state,
          deck: state.deck.slice(0, state.deck.length - 2),
          table: state.deck.slice(state.deck.length - 2),
          message: messageMaker(state.message, state),
        };
      case "select_left":
        return {
          ...state,
          deck: [state.table[0], ...state.deck],
          table: [],
          rightGone: [...state.rightGone, state.table[1]],
        };
      case "select_right":
        return {
          ...state,
          deck: [state.table[1], ...state.deck],
          table: [],
          leftGone: [...state.leftGone, state.table[0]],
        };
      case "reset":
        setShuffled(shuffle(Array.from({ length: 8 }, (v, i) => i)));
        return {
          deck: shuffled,
          table: [],
          leftGone: [],
          rightGone: [],
          message: `${2 ** Math.ceil(Math.sqrt(cards.length))}강`,
        };
      default:
        throw new Error();
    }
  }
  const [initial, setInitial] = useState(true);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(-1);
  const [dealt, setDealt] = useState(false);
  const router = useRouter();
  const observed = useRef(null);
  React.useEffect(() => {
    if (initial) {
      setInitial(false);
      setTimeout(() => {
        dispatch({ type: "deal" });
        setDealt(true);
      }, 2200);
      return;
    }
    set((i) => {
      if (
        state.deck.length === 1 &&
        state.table.length === 0 &&
        state.deck[0] == i
      ) {
        const x = 0;
        const y = 50;
        const scale = 1.5;
        const rotate = 0;
        setFinished(true);
        setResult(state.deck[0]);
        return {
          x,
          y,
          scale,
          rotate,
        };
      }
      const isDeck = state.deck.includes(i);
      const isTableLeft = state.table.indexOf(i) === 0;
      const isTableRight = state.table.indexOf(i) === 1;
      const isLeftGone = state.leftGone.includes(i);
      const isRightGone = state.rightGone.includes(i);
      const w = observed.current.clientWidth;
      const scale = 1;
      const x = isDeck
        ? 0
        : isTableLeft
        ? w > 1024
          ? -200
          : -w / 3
        : isTableRight
        ? w > 1024
          ? 200
          : w / 3
        : isLeftGone
        ? -2 * w
        : isRightGone
        ? 2 * w
        : 0;
      const y = isDeck ? 0 : 300;
      const zIndex = state.deck.includes(i) ? state.deck.indexOf(i) + 1 : 1;
      return {
        x,
        y,
        zIndex,
        scale,
      };
    });
  }, [state]);

  const handleClick = (e, i) => {
    if (finished) return;
    if (state.table[0] === i) {
      dispatch({ type: "select_left" });
      setDealt(false);
      setTimeout(() => {
        dispatch({ type: "deal" });
        setDealt(true);
      }, 1000);
    } else if (state.table[1] === i) {
      dispatch({ type: "select_right" });
      setDealt(false);
      setTimeout(() => {
        dispatch({ type: "deal" });
        setDealt(true);
      }, 1000);
    }
  };
  const [commentOn, setCommentOn] = useState(false);
  return (
    <PageUtils page="worldcup">
      <Container ref={observed}>
        <Title>{`🍸 칵테일 이상형 월드컵 ${
          finished ? "우승!" : state.message
        }`}</Title>
        {props.map(({ x, y, rotate, scale, zIndex }, i) => (
          <Card
            key={i}
            onClick={(e) => {
              handleClick(e, i);
            }}
            style={{
              x,
              y,
              rotate,
              scale,
              zIndex,
              backgroundImage: `url(${cards[i]})`,
            }}
          >
            <Name>{db[i].koreanName}</Name>
          </Card>
        ))}
        {dealt && !finished ? <FadeinHeading>VS</FadeinHeading> : ""}
        {finished ? (
          <div className="bottom">
            <button
              className="btn"
              onClick={() => {
                dispatch({ type: "reset" });
                setFinished(false);
                setDealt(false);
                setTimeout(() => {
                  dispatch({ type: "deal" });
                  setDealt(true);
                }, 1000);
              }}
            >
              <h1>다시 해보시겠어요?</h1>
            </button>
            <button
              className="btn"
              onClick={() => {
                router.push(`/cocktails/${result}`);
              }}
            >
              <h1>{`${db[result].koreanName} 상세정보 보기`}</h1>
            </button>
            <button
                onClick={() => {
                  setCommentOn(!commentOn);
                }}
                className="btn"
                selected=""
              >
                코멘트 남기기
              </button>
            <KakaoLink>
              <p>카카오톡으로 공유하기</p>
              <KakaoShareButton
                title="나의 술알못 테스트 결과는?"
                desc={result.text}
                imgurl="http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg"
              ></KakaoShareButton>
            </KakaoLink>
            {commentOn ? <Comments page="worldcup" className="comments" /> : ""}
          </div>
        ) : (
          ""
        )}
      </Container>
    </PageUtils>
  );
}

function FadeinHeading({ children, handleClick }) {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });
  return (
    <Versus style={props} onClick={handleClick}>
      {children}
    </Versus>
  );
  s;
}

const Versus = styled(animated.h1)`
  position: absolute;
  font-size: 3.5rem;
  top: 475px;
`;
