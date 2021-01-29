import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Button from "./Button";
import StarList from "./StarList";
import db from "../public/cocktaildb";
import axios from "axios";
import { isSafari } from "react-device-detect";

const Container_card = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Container = styled.div`
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  .imagecontainer {
    position: relative;
    width: 150px;
    height: 150px;
    place-self: center center;
    margin-bottom: 0.5rem;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 100%;
      width: auto;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
  .last {
    margin-bottom: 0.5rem;
  }

  .abs {
    position: absolute;
    right: 10%;
    top: 5%;
  }

  .ranking {
    position: relative;
    background-color: limegreen;
    opacity: 0.4;
    border-radius: 50%;
    padding: 10px;
    width: 10px;
    height: 10px;
    top: 5%;
    left: 5%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: 14px;
      margin-top: 3px;
    }
  }
`;
const H1 = styled.h1`
  padding: 0.25rem;
  text-align: center;
`;
export default function CardGrid({ indexList, type }) {
  return (
    <Container_card>
      {indexList.map((v, i) => {
        const cocktail = db[v];
        if (cocktail) {
          return <Card type={type} index={v} key={v} i={i}></Card>;
        } else {
          return;
        }
      })}
    </Container_card>
  );
}

function Card({ index, type, i }) {
  const router = useRouter();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const { user, setUser } = useContext(ThemeContext).userContext;
  const { ratingList } = useContext(ThemeContext).ratingContext;
  const cocktail = db[index];

  const handleClick = (e) => {
    if (isDesktop && !isSafari) {
      setUser({ ...user, pastquery: index });
      router.push(`${router.asPath}?cocktailId=${index}`);
    } else {
      router.push(`/cocktails/${index}`);
    }
  };

  const likeRequestHandler = () => {
    axios
      .post(
        "https://server.momo-jito.com/detail/favorite",
        { cocktailId: index, isAdd: false },
        { withCredentials: true }
      )
      .then((res) => {
        // '받은 응답코드' 200 이면 추가,  201이면 삭제
        if (res.status === 200) {
          user.myCocktailList.push(index);
        } else if (res.status === 201) {
          user.myCocktailList.splice(user.myCocktailList.indexOf(index), 1);
        }
        // 업데이트
        setUser({
          ...user,
          myCocktailList: user.myCocktailList,
        });
      });
    // .then(() => {
    //   setIsLike(!isLike)
    // })
  };

  return (
    <Container>
      {type === "ranking" ? (
        <div className="ranking">
          <p>{i + 1}</p>
        </div>
      ) : (
        ""
      )}
      <div className="imagecontainer">
        <img
          style={{ cursor: "pointer" }}
          onClick={handleClick}
          src={cocktail ? `/cocktails/${cocktail.id}.png` : ""}
          alt="no-img"
        ></img>
      </div>
      {type === "mypage" ? (
        <div className="abs">
          <Button onClick={likeRequestHandler}>삭제</Button>
        </div>
      ) : (
        ""
      )}

      <H1>{cocktail.koreanName}</H1>
      <H1 className="last">{cocktail.name}</H1>
      <StarList
        rating={ratingList[index] ? Number(ratingList[index].avrRate) : 0}
      ></StarList>
    </Container>
  );
}
