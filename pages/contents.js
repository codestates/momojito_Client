import { useRouter } from "next/router";
import { CarouselExtended } from "../components/Carousel";
import PageUtils from "../components/PageUtils";

export default function Contents() {
  const router = useRouter();
  return (
    <PageUtils>
      <CarouselExtended
        carouselList={[
          {
            url: 'url("/bar0.jpeg");',
            heading: "성향에 따라 맞춤 칵테일을 추천 받으려면?",
            handleClick: (e) => {
              router.push("/test");
            },
          },
          {
            url: 'url("/bar1.jpeg");',
            heading: "당신의 칵잘알 퀴즈 점수는?",
            handleClick: (e) => {
              router.push("/quiz");
            },
          },
          {
            url: 'url("/bar2.jpeg");',
            heading: "칵테일 이상형 월드컵 16강",
            handleClick: (e) => {
              router.push("/worldcup");
            },
          },
        ]}
      ></CarouselExtended>
    </PageUtils>
  );
}
