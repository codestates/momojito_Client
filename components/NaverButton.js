import styled from "styled-components";

const NaverButton = styled.button`
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
    background-color: rgba(35, 179, 102, 0.75);
  }
  background-color: #23b366;
  color: white;
`;

export default NaverButton;
