import React from "react";
import styled from "styled-components";

const Pages = styled.ul`
  display: flex;
  margin-top: 20px;
  justify-content: center;

  .page-link {
    margin: 0px 10px;
  }
`;

function Pagination({ commentsPerPage, totalComments, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Pages>
      {pageNumbers.map((number) => (
        <li className="page-item">
          <a
            onClick={(e) => {
              e.preventDefault();
              paginate(number);
            }}
            href=""
            className="page-link"
          >
            {number}
          </a>
        </li>
      ))}
    </Pages>
  );
}

export default Pagination;
