import styled, { ThemeContext } from "styled-components";
import { HoverStarList } from "./StarList";
import db from "../public/cocktaildb";
import Carousel from "./Carousel";
import Button from "./Button";
import ButtonList from "./ButtonList";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 375px;
    height: 375px;
    margin-bottom: 0.5rem;
  }
  .nameheart,
  .signature {
    display: flex;
    align-items: center;
    text-align: left;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    svg {
      margin-left: 1rem;
      width: 15px;
      height: 15px;
    }
    button {
      margin-left: 1rem;
      margin-bottom: 0.5rem;
    }
  }
  .stars {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    button {
      margin-left: 1rem;
    }
    h1 {
      font-size: 1rem;
      margin-right: 0.5rem;
    }
    h2 {
      font-size: 1rem;
      margin-left: 0.5rem;
    }
  }
  .ingredients {
    justify-content: flex-start;
  }
  p {
    padding: 0.5rem 1rem;
    line-height: 1.5rem;
  }
  .recommend {
    margin-top: 0.5rem;
    margin-bottom: 100px;
    padding: 0.5rem 1rem;
    h1 {
      font-size: 1.25rem;
      margin-bottom: 2rem;
    }
  }

  .heart {
    cursor: pointer;
    color: ${(props) => (props.isLike ? "red" : "black")};
    // color: red;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function CocktailInfo({ id }) {
  id = Number(id);
  const cocktail = db[id];
  const carouselImages = [{ url: 'url("/bar0.jpeg");' }];
  const { user, setUser } = useContext(ThemeContext).userContext;
  const { ratingList, setRatingList } = useContext(ThemeContext).ratingContext;
  const [isLike, setIsLike] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [buttonSelected, setButtonSelected] = useState(-1);
  const [starSelected, setStarSelected] = useState(-1);
  const [statusMessage, setStatusMessage] = useState("");
  useEffect(() => {
    if (buttonSelected !== -1) {
      const ingredientslist = cocktail.ingredients
        .split(",")
        .map((v) => v.trim());
      router.push(`/ingredients/${ingredientslist[buttonSelected]}`);
    }
  }, [buttonSelected]);
  useEffect(() => {
    if (starSelected !== -1) {
      if (user.isLogin) {
        axios
          .post(
            "https://server.momo-jito.com/detail/rating",
            {
              rating: starSelected,
              cocktailId: id,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.status === 200) {
              setRatingList([
                ...ratingList.slice(0, id),
                { ...ratingList[id], avrRate: res.data.rate },
                ...ratingList.slice(id + 1),
              ]);
              setStatusMessage("성공적입니다.");
            } else {
              setStatusMessage("문제가 있습니다.");
            }
          });
      } else {
        router.push("/signin");
      }
    }
  }, [starSelected]);
  useEffect(() => {
    if (statusMessage !== "") {
      setTimeout(() => setStatusMessage(""), 3000);
    }
  }, [statusMessage]);
  useEffect(() => {
    //여기에 props로 받은 Id가 포함되어 있으면, isLike -> true
    if (user.myCocktailList.includes(id) === true) {
      setIsLike(true);
    }
  });

  const likeRequestHandler = (e) => {
    if (user.isLogin) {
      axios
        .post(
          "https://server.momo-jito.com/detail/favorite",
          { cocktailId: id, isAdd: !isLike },
          { withCredentials: true }
        )
        .then((res) => {
          // '받은 응답코드' 200 이면 추가,  201이면 삭제
          if (res.status === 200) {
            user.myCocktailList.push(id);
          } else if (res.status === 201) {
            user.myCocktailList.splice(user.myCocktailList.indexOf(id), 1);
          }
          // 업데이트
          setUser({
            ...user,
            myCocktailList: user.myCocktailList,
          });
        })
        .then(() => {
          setIsLike(!isLike);
        });
    } else {
      router.push("/signin");
    }
  };
  return (
    <Container isLike={isLike}>
      <Carousel
        carouselList={[
          {
            url: `url("/cocktails/${id}.png");`,
          },
        ]}
      ></Carousel>
      {cocktail.barname ? (
        <div className="signature">
          <h1>{cocktail.barname}</h1>
          <div className="barloc">
            <Button s="0.5rem">{cocktail.barlocation}</Button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="nameheart">
        <h1>{`${cocktail.koreanName}(${cocktail.name})`}</h1>
        <svg
          onClick={likeRequestHandler}
          className="heart"
          xmlns="http://www.w3.org/2000/svg"
          fill={isLike ? "red" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <div className="stars">
        <h1>평균별점 {ratingList[id] ? ratingList[id].avrRate : "0.0"}</h1>
        <HoverStarList setStarSelected={setStarSelected}></HoverStarList>
        <h2>{statusMessage}</h2>
      </div>
      <div className="ingredients">
        <ButtonList
          all
          buttonSelected={buttonSelected}
          setButtonSelected={setButtonSelected}
          buttonList={cocktail.ingredients.split(",")}
        ></ButtonList>
      </div>
      <p>{cocktail.description}</p>
      <div className="recommend">
        <h1>
          {cocktail.barname
            ? `${cocktail.barname}에서 찍은 다른 사진`
            : "이곳에서 드시겠어요?"}
        </h1>
        <Carousel
          carouselList={[
            {
              url: 'url("/bar0.jpeg");',
              heading: "JASE",
              buttonText: "홍대",
              handleClick: () => router.push("http://naver.me/xswx3XPm")
            },
            {
              url: 'url("/bar1.jpeg");',
              heading: "PAVOX",
              buttonText: "강남",
              handleClick: () => router.push("http://naver.me/FXZhwzpB")
            },
            {
              url: 'url("/bar2.jpeg");',
              heading: "청춘예찬",
              buttonText: "성신여대",
              handleClick: () => router.push("http://naver.me/GbE0DNQz")
            },
          ]}
        ></Carousel>
      </div>
    </Container>
  );
}
