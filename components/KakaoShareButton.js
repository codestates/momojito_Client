import { React, useEffect } from "react";
import styled from "styled-components";

const KakaoButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
  }
`;

function KakaoShareButton({ title, desc, imgurl, link }) {
  //추후 process.env로 관리하기
  const kakaoKey = "75d977bf235fda941972e4be5835408a";

  useEffect(() => {
    createKakaoButton();
  }, []);

  const createKakaoButton = () => {
    const redirectUrl = link || window.location.href;
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(kakaoKey);
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: title,
          description: desc,
          imageUrl: imgurl, // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: redirectUrl,
            webUrl: redirectUrl,
          },
        },
      });
    }
  };
  return (
    <KakaoButton type="button" id="kakao-link-btn">
      <img src="kakaolink_btn_medium.png" alt="kakao-btn" />
    </KakaoButton>
  );
}

export default KakaoShareButton;
