import styled from "styled-components";

const HoverButton = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 5%;
  cursor: pointer;
  button {
    overflow: hidden;
    position: relative;
    display: inline-block;
    text-align: center;
    background: 0 none;
    border: 1px solid #31c460;
    border-radius: 5px;
    transition: all 0.5s;
    color: #31c460;
    font-size: 60%;
    padding-top: 0.3%;
  }

  button:hover {
    background-color: #31c460;
    color: white;
    cursor: pointer;
  }
  button:before {
    content: "";
    z-index: -1;
    position: absolute;
    background: #31c460;
    transition: all 1s;

    left: 0;
    top: 0;
    width: 100%;
  }
`;

export default HoverButton;
