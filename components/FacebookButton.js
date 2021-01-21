import styled from "styled-components";

const FacebookButton = styled.button`
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
  }
  background-color: #1e4799;
  color: white;
  img {
    margin-bottom: 3px;
  }
`;

export default FacebookButton;
