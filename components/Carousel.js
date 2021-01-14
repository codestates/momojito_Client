import Button from "../components/Button";
import styled, { css } from "styled-components";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
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
  height: ${(props) => (props.heading ? "200px" : "375px")};
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  div button {
    width: 6rem;
  }
  h1 {
    color: white;
    width: 14rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5rem;
  }
`;

function Slide({ url, heading, buttonText = "지금 이동하기" }) {
  return (
    <Divwithbg url={url} heading={heading}>
      {heading ? (
        <div className="">
          <h1>{heading}</h1>
          <Button selected>{buttonText}</Button>
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
      {carouselList.map(({ url, heading, buttonText }) => (
        <SwiperSlide key={url}>
          <Slide url={url} heading={heading} buttonText={buttonText}></Slide>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
