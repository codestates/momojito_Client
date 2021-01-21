import PageUtils from "../components/PageUtils";
import db from "../public/cocktaildb";
import styled from "styled-components";
import React, { useState, useReducer } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import Button from "../components/Button";
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: lightblue;
  position: fixed;
  width: 100%;
  height: 100%;
`;
const Card = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
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

const cards = Array.from({ length: 8 }, (_, i) => i).map(
  (v) => `/cocktails/${v}.png`
);

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rotate: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
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
        deck: state.deck.slice(0, state.deck.length - 2),
        table: state.deck.slice(state.deck.length - 2),
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
      if (
        state.deck.length === 1 &&
        state.table.length === 0 &&
        state.deck[0] == i
      ) {
        const x = 0;
        const scale = 2;
        const y = 200;
        const rotate = 0;
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
      const w = window.innerWidth;
      const scale = 1;
      const x = isDeck
        ? 0
        : isTableLeft
        ? -200
        : isTableRight
        ? 200
        : isLeftGone
        ? -1000
        : isRightGone
        ? 1000
        : 0;
      const y = isDeck ? 0 : 200;
      const zIndex = state.deck.indexOf(i);
      return {
        x,
        y,
        zIndex,
        scale,
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
        />
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
