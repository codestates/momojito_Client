import styled from "styled-components";

const Body = styled.div`
  flex: 1;
  overflow: auto;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: -webkit-fill-available;
`;

export { Body, Root };
