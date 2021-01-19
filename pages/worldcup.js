import PageUtils from "../components/PageUtils";
import db from "../public/cocktaildb";
import styled from "styled-components";
import React, { useState, useReducer } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import Button from "../components/Button";
const Container = styled.div`
  background: lightblue;
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
const Outer = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;
const Inner = styled(animated.div)`
  background-color: white;
  background-size: auto 85%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 50%;
  max-width: 200px;
  height: 50%;
  max-height: 300px;
  will-change: transform;
  border-radius: 10px;
  box-shadow: 20 12.5px 100px -10px rgba(50, 50, 73, 0.4),
    0 10px 10px -10px rgba(50, 50, 73, 0.3);
`;

const cards = [
  "/cocktails/0.jpeg",
  "/cocktails/1.jpeg",
  "/cocktails/2.jpeg",
  "/cocktails/3.jpeg",
  "/cocktails/4.jpeg",
];

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;
const initialState = {
  deck: Array.from({ length: cards.length }, (_, i) => i),
  table: [],
  leftGone: [],
  rightGone: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "deal":
      return {
        ...state,
        deck: state.deck.slice(2),
        table: state.deck.slice(0, 2),
      };
    case "select_left":
      return {
        ...state,
        deck: [...state.deck, state.table[0]],
        table: [],
        leftGone: [...state.leftGone, state.table[0]],
      };
    case "select_right":
      return {
        ...state,
        deck: [...state.deck, state.table[1]],
        table: [],
        rightGone: [...state.rightGone, state.table[1]],
      };
    case "reset":
      return {
        deck: Array.from({ length: cards.length }, (_, i) => i),
        table: [],
        leftGone: [],
        rightGone: [],
      };
    default:
      throw new Error();
  }
}

function Deck() {
  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));
  const [state, dispatch] = useReducer(reducer, initialState);
  React.useEffect(() => {
    set((i) => {
      const isDeck = state.deck.includes(i);
      const isTableLeft = state.table.indexOf(i) === 0;
      const isTableRight = state.table.indexOf(i) === 1;
      const isLeftGone = state.leftGone.includes(i);
      const isRightGone = state.rightGone.includes(i);
      const w = window.innerWidth;
      const x = isDeck
        ? 0
        : isTableLeft
        ? -200
        : isTableRight
        ? 200
        : isLeftGone
        ? -1000
        : 1000;
      const y = isDeck ? 0 : 200;
      return {
        x,
        y,
        config: { friction: 50, tension: 500 },
      };
    });
  }, [state]);

  const handleClick = (e, i) => {
    console.log(i);
    if (state.table.length === 0) {
      dispatch({ type: "deal" });
    } else if (state.table[0] === i) {
      dispatch({ type: "select_left" });
    } else {
      dispatch({ type: "select_right" });
    }
  };
  return (
    <Container>
      <Button onClick={(e) => dispatch({ type: "reset" })}>Reset</Button>
      {props.map(({ x, y, rot, scale }, i) => (
        <Outer key={i} style={{ x, y }}>
          <Inner
            onClick={(e) => {
              console.log(i);
              handleClick(e, i);
            }}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          />
        </Outer>
      ))}
    </Container>
  );
}

export default function WorldCup() {
  return (
    <PageUtils>
      <Deck></Deck>
    </PageUtils>
  );
}

// const bind = useGesture(
//   ({
//     args: [index],
//     down,
//     delta: [xDelta],
//     distance,
//     direction: [xDir],
//     velocity,
//   }) => {
//     const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
//     const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
//     if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
//     set((i) => {
//       if (index !== i) return; // We're only interested in changing spring-data for the current spring
//       const isGone = gone.has(index);
//       const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
//       const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
//       const scale = down ? 1.1 : 1; // Active cards lift up a bit
//       return {
//         x,
//         rot,
//         scale,
//         delay: undefined,
//         config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
//       };
//     });
//     if (!down && gone.size === cards.length)
//       setTimeout(() => gone.clear() || set((i) => to(i)), 600);
//   }
// );
