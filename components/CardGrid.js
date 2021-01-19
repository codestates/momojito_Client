import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Button from "./Button";
import StarList from "./StarList";
import db from "../public/cocktaildb";
import axios from "axios";

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
  img {
    width: 150px;
    height: 150px;
    position: relative;
    place-self: center;
    margin-bottom: 0.5rem;
  }
  .last {
    margin-bottom: 0.5rem;
  }

  .signature {
    position: relative;
    .barloc {
      position: absolute;
      left: 70%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .abs {
    position: absolute;
    left: 65%;
    top: 40%;
  }
`;
const H1 = styled.h1`
  padding: 0.25rem;
  text-align: center;
`;
export default function CardGrid({ indexList, type, setPastquery }) {
  return (
    <Container_card>
      {indexList.map((v, i) => (
        <Card
          type={type}
          index={v}
          key={v}
          i={i}
          setPastquery={setPastquery}
        ></Card>
      ))}
    </Container_card>
  );
}
function Card({ index, type, i, setPastquery }) {
  const router = useRouter();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const cocktail = db[index];
  const userContext = useContext(ThemeContext).userContext;
  const user = userContext.user;

  const handleClick = (e) => {
    if (isDesktop) {
      setPastquery(index);
      router.push(`/?cocktailId=${index}`, `/cocktails/${index}`);
    } else {
      router.push(`/cocktails/${index}`);
    }
  };

  
  const likeRequestHandler = () => {
    axios
      .post(
        "http://localhost:5000/detail/favorite",
        { cocktailId: index, isAdd: false },
        { withCredentials: true }
      )
      .then((res) => {
        // '받은 응답코드' 200 이면 추가,  201이면 삭제
        if (res.status === 200) {
          user.myCocktailList.push(index);
        }
        else if (res.status === 201) {
          user.myCocktailList.splice(user.myCocktailList.indexOf(index), 1);
        }
        // 업데이트
        userContext.setUser({
          ...user,
          myCocktailList: user.myCocktailList,
        });
      })
      // .then(() => {
      //   setIsLike(!isLike)
      // })
  };

  return (
    <Container>
      <img onClick={handleClick} src={`cocktails/${cocktail.id}.jpeg`}></img>
      {type === "mypage" ? (
        <div className="abs">
          <Button onClick={likeRequestHandler}>삭제</Button>
        </div>
      ) : (
        ""
      )}
      {type === "signature" ? (
        <div className="signature">
          <H1>{cocktail.barname}</H1>
          <div className="barloc">
            <Button s="0.5rem">{cocktail.barlocation}</Button>
          </div>
        </div>
      ) : (
        ""
      )}
      {type === "ranking" ? <H1>No. {i + 1}</H1> : ""}
      <H1>{cocktail.name}</H1>
      <H1 className="last">{cocktail.koreanName}</H1>
      <StarList rating={cocktail.rating}></StarList>
    </Container>
  );
}
