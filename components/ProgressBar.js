/** @format */

import React from "react";
import styled from "styled-components";

const Bar = styled.div`
    margin-top: 10px;
    position: relative;
    height: 10px;
    width: 60%;
    border-radius: 50px;
    border: 1px solid #333;
`;

const Filler = styled.div`
  background: #36CC3C;
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
