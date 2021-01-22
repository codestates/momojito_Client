/** @format */

import React from "react";
import styled from "styled-components";

const Bar = styled.div`
    max-width: 540px;
    margin-top: 10px;
    position: relative;
    height: 10px;
    width: 60%;
    border-radius: 50px;
    border: 1px solid #333;
    background-color: white;
    box-shadow: 0 5px 5px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23);
`;

const Filler = styled.div`
  // background: #36CC3C;
  background: linear-gradient(90deg, rgba(242,251,227,1) 0%, rgba(143,190,102,1) 100%);
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
  width: ${(props) => props.percentage}%;
`;

function ProgressBar({ percentage }) {
  return (
    <Bar>
      <Filler percentage={percentage}/>
    </Bar>
  );
}

export default ProgressBar;
