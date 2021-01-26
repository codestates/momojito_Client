import styled from "styled-components";

const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  border: none;
  width: 300px;
  height: 36px;
  margin: auto;
  justify-content: space-between;
  margin-block-start: 15px;
  div.blank {
    width: 30px;
  }
  :hover {
    cursor: pointer;
    background-color: rgba(255, 232, 18, 0.75);
  }
  background-color: #ffe812;
  color: black;
  img {
    margin-left: 3px;
  }
`;

export default KakaoButton;
