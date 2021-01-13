import Button from "../components/Button";
import styled from "styled-components";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Pagination, Autoplay]);
const Divwithbg = styled.div`
  background-image: linear-gradient(
      180deg,
      #000000 0%,
      rgba(255, 255, 255, 0.09375) 100%,
      rgba(255, 255, 255, 0) 100%
    ),
    ${(props) => props.url};
  background-size: cover;
  width: 100%;
  height: 200px;
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

function Slide({ url, heading }) {
  return (
    <Divwithbg url={url}>
      {heading ? (
        <div className="">
          <h1>{heading}</h1>
          <Button selected>지금 이동하기</Button>
        </div>
      ) : (
        ""
      )}
    </Divwithbg>
  );
}

export default function Carousel({ carouselList }) {
  return (
    <Swiper pagination autoplay={{ delay: 5000 }}>
      {carouselList.map(({ url, heading }) => (
        <SwiperSlide key={url}>
          <Slide url={url} heading={heading}></Slide>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
