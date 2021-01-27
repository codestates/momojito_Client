import { Children } from "react";
import styled, { keyframes } from "styled-components";

const DarkmodeLogo = keyframes`
  h1 {
    font-family: cursive;
    margin: 0;
    margin-left: 0.25rem;
    font-size: 1.5rem;
  }

  /* .glow {
    font-size: 80px;
    color: #39ff14;
    text-align: center;
    -webkit-animation: glow 1s ease-in-out infinite alternate;
    -moz-animation: glow 1s ease-in-out infinite alternate;
    animation: glow 1s ease-in-out infinite alternate;
    display: inline-block;
  } */

  .glow {
    font-size: 80px;
    color: #39ff14;
    text-align: center;
    -webkit-animation: glow 1s ease-in-out infinite alternate;
    -moz-animation: glow 1s ease-in-out infinite alternate;
    animation: glow 1s ease-in-out infinite alternate;
    display: inline-block;
    from {
      text-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #00e1a3,
        0 0 40px #00e1a3, 0 0 50px #00e1a3, 0 0 60px #00e1a3, 0 0 70px #39ff14;
    }

    to {
      text-shadow: 0 0 20px #39ff14, 0 0 30px #39ff14, 0 0 40px #00e1a3,
        0 0 50px #00e1a3, 0 0 60px #00e1a3, 0 0 70px #00e1a3, 0 0 80px #39ff14;
    }
  }
`;

const StyledWrapper = styled.div`
  ${(props) =>
    props.active &&
    `animation: ${DarkmodeLogo} 2s 1s infinite linear alternate;`}
`;

const Box = (children, ...rest) => {
  return <StyledWrapper {...rest}>{children}</StyledWrapper>;
};

export default Box;
