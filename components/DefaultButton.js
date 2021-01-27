import styled from "styled-components";

const DeafultButton = styled.button`
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
    background-color: rgba(0, 0, 0, 0.75);
  }
  justify-content: center;
  background-color: #000000;
  margin-block-start: 20px;
  color: white;
`;

export default DeafultButton;
