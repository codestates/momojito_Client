import ButtonL from "../components/ButtonL";
import styled, { css } from "styled-components";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowAltCircleRight } from "react-icons/fa";

SwiperCore.use([Navigation, Pagination, Autoplay]);
const Divwithbg = styled.div`
  background-image: ${(props) =>
    props.heading
      ? css`linear-gradient(
      180deg,
      #000000 0%,
      rgba(255, 255, 255, 0.09375) 100%,
      rgba(255, 255, 255, 0) 100%
    ), ${props.url}`
      : props.url};
  background-size: cover;
  width: ${(props) => (props.heading ? "100%" : "375px")};
  height: ${(props) => (props.sub || !props.heading ? "400px" : "250px")};
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  div button {
    margin-top: 20px;
    width: 10rem;
  }
  h1 {
    color: white;
    /* width: 14rem; */
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  h4 {
    color: white;
    margin-top: 10px;
  }
`;

function Slide({
  url,
  heading,
  sub,
  buttonText = "지금바로 GO! 🍹",
  handleClick,
}) {
  return (
    <Divwithbg url={url} heading={heading} sub={sub}>
      {heading ? (
        <div className="">
          <h1>{heading}</h1>
          <h4>{sub}</h4>
          <ButtonL selected onClick={handleClick}>
            {buttonText}
          </ButtonL>
        </div>
      ) : (
        ""
      )}
    </Divwithbg>
  );
}

export default function Carousel({ carouselList }) {
  return (
    <Swiper autoplay={{ delay: 5000 }}>
      {carouselList.map(({ url, heading, sub, buttonText, handleClick }) => (
        <SwiperSlide key={url}>
          <Slide
            url={url}
            heading={heading}
            sub={sub}
            buttonText={buttonText}
            handleClick={handleClick}
          ></Slide>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const CarouselExtended = function ({ carouselList }) {
  return (
    <div>
      {carouselList.map(({ url, heading, buttonText, handleClick }) => (
        <Slide
          url={url}
          heading={heading}
          buttonText={buttonText}
          handleClick={handleClick}
        ></Slide>
      ))}
    </div>
  );
};

export { CarouselExtended };
