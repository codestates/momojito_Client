const quizdata = [
  {
    id: 1,
    score: 16,
    question:
      "부산에 있는 TGIF 에서 만들어져 전세계에 퍼졌다고 알려져있으며 달콤한 향과 맛으로 유명한 칵테일은?",
    imgsrc: "11.png",
    answers: [
      {
        id: 1,
        text: "준 벅",
        isAnswer: true,
      },
      {
        id: 2,
        text: "존 박",
        isAnswer: false,
      },
      {
        id: 3,
        text: "존 윅",
        isAnswer: false,
      },
      {
        id: 4,
        text: "준 코",
        isAnswer: false,
      },
    ],
  },
  {
    id: 2,
    score: 16,
    question:
      "잭다니엘 위스키에 콜라를 섞어 마시는 매우 간단한 칵테일로, 제법 강한 도수와 거친 남성적인 이미지로 사랑받는 칵테일은?",
    imgsrc: "7.png",
    answers: [
      {
        id: 1,
        text: "잭스키스",
        isAnswer: false,
      },
      {
        id: 2,
        text: "잭콕",
        isAnswer: true,
      },
      {
        id: 3,
        text: "블랙잭",
        isAnswer: false,
      },
    ],
  },
  {
    id: 3,
    score: 16,
    question:
      "칵테일의 왕이라고도 불리며 007과 킹스맨 등 영화의 명대사로 유명한 칵테일은?",
    imgsrc: "4.png",
    answers: [
      {
        id: 1,
        text: "말디니",
        isAnswer: false,
      },
      {
        id: 2,
        text: "카바니",
        isAnswer: false,
      },
      {
        id: 3,
        text: "마티니",
        isAnswer: true,
      },
      {
        id: 4,
        text: "콤파니",
        isAnswer: false,
      },
    ],
  },
  {
    id: 4,
    score: 16,
    question: "다음중 모히또의 재료가 아닌것은?",
    imgsrc: "5.png",
    answers: [
      {
        id: 1,
        text: "럼",
        isAnswer: false,
      },
      {
        id: 2,
        text: "라임",
        isAnswer: false,
      },
      {
        id: 3,
        text: "몰디브",
        isAnswer: true,
      },
      {
        id: 4,
        text: "민트",
        isAnswer: false,
      },
    ],
  },
  {
    id: 5,
    score: 16,
    question:
      "위스키에 탄산수와 레몬 혹은 라임을 더한 칵테일이며 일본에서는 맥주, 사케 다음으로 대중적인 술은?",
    imgsrc: "17.png",
    answers: [
      {
        id: 1,
        text: "하이볼",
        isAnswer: true,
      },
      {
        id: 2,
        text: "하이바",
        isAnswer: false,
      },
      {
        id: 3,
        text: "이하이",
        isAnswer: false,
      },
      {
        id: 4,
        text: "하이네켄",
        isAnswer: false,
      },
    ],
  },
  {
    id: 6,
    score: 20,
    question: "다음 중 민초단이 환장하는 민트 초코 맛이 나는 칵테일은?",
    imgsrc: "grasshopper.png",
    answers: [
      {
        id: 1,
        text: "쿠바 리브레",
        isAnswer: false,
      },
      {
        id: 2,
        text: "미도리 사워",
        isAnswer: false,
      },
      {
        id: 3,
        text: "그래스 호퍼",
        isAnswer: true,
      },
      {
        id: 4,
        text: "블랙 러시안",
        isAnswer: false,
      },
    ],
  },
];

// 퀴즈데이터 랜덤배열로 export
const shuffleArray = array => {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const randomQ = shuffleArray(quizdata);

export default randomQ;
