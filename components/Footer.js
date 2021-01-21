import styled, { ThemeContext } from "styled-components";
import { useRouter } from "next/router";
import { useContext } from "react";
const MobileFooter = styled.div`
  flex: none;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-top: 1px solid rgba(219, 219, 219);
  padding: 0.5rem;
  svg {
    color: ${(props) => props.theme.main};
    height: 24px;
    width: 24px;
  }
  @media (min-width: 1024px) {
    display: none;
  }
`;
const DesktopFooter = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
  }
  align-items: center;
  padding: 1.5rem;
  box-sizing: border-box;
  height: 75px;
  background-color: ${(props) => props.theme.sub};
  img {
    margin-left: 0.5rem;
    width: 1rem;
    height: 1rem;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: 0;
`;

export default function Footer() {
  const router = useRouter();
  const userContext = useContext(ThemeContext).userContext;
  return (
    <div className="">
      <MobileFooter>
        <Button onClick={(e) => router.push("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Button>
        <Button
          onClick={(e) => {
            router.push("/quiz");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              fill="#fff"
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </Button>
        <Button
          onClick={(e) => {
            router.push("/worldcup");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Button>
        <Button
          onClick={(e) => {
            if (userContext.user.isLogin) router.push("/mypage");
            else router.push("/signin");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </Button>
      </MobileFooter>
      <DesktopFooter>
        <div className="">{"2021 © Design & Code by Maldivian"}</div>
        <Button onClick={(e) => router.push("/")}>
          <img src="/github.png" alt="A github icon"></img>
        </Button>
      </DesktopFooter>
    </div>
  );
}
