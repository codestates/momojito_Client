# 1. Intro

---

![noimg](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1aa7d3e6-f7d3-41a7-b228-85427d9ad3f3%2FUntitled.png?table=block&id=1bd379e5-5411-4c91-81bc-8f9c6d2a8828&spaceId=14cff50a-9d15-48cd-a262-2724a8ab38ba&width=3060&userId=505f5c27-9d71-4cf4-8174-1ef8968c448d&cache=v2)

- **팀 명 :** Maldivian (몰디비안)
- **프로젝트 명 :** Momojito (모모히또)
- **프로젝트 형태 :** 수강생 프로젝트
- **팀원 :** 조영권(팀장), 강민구, 이정로, 백도현
- **배포 링크 :** [https://momojito.net/](https://momojito.net/)
- **서비스 소개영상 :** [유튜브 Link](https://youtu.be/0S49UQj-SDo)
- **개발 과정 :** [Dev log](https://www.notion.so/Team-Maldivian-2a707e5b3ffd49a28baabdd4366ca720)

# 2. Project

---

## ✐ About

 

### What if..   술알못들이 모여 칵테일 정보 사이트를 만든다면?

여러분들은 칵테일을 좋아하시나요? 바 문화는 아직 대부분의 사람들에게 친숙하지 않은 것 같습니다.. 가끔 바에 가게 되면 무엇을 마실지 고민하다가 이름이라도 들어본 칵테일을 찾다보면 결국 마셔봤던 것만 주문하게 되곤 합니다😅.

모모히또는 저희처럼 칵테일 1도 모르는 사람들을 위해, 다양한 칵테일 종류에 대해 소개하고, 누구나 칵테일 관련 컨텐츠를 즐기면서 쉽게 공유할 수 있도록 만들어진 사이트입니다.

모두가 스마트폰을 이용하여 간단한 정보들을 탐색한다는 점을 고려해서, **모바일 웹 환경**에서의 이용을 중점으로 개발하였습니다. 물론 **데스크톱**에서도 **반응형 UI**로 이용하실 수 있습니다 👍

## ✐ 사용 기술 스택

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3823d981-31db-469b-8408-e67c4f04a444%2FUntitled.png?table=block&id=82c32ed7-bfaf-408e-a564-866b11ae4f1f&width=3060&userId=505f5c27-9d71-4cf4-8174-1ef8968c448d&cache=v2)

## ✐ 주요 기능

### 메인페이지
- 인기 Top 10 : 평점 순으로 10위 안에 있는 칵테일 리스트 (기본 선택)
- 재료별 칵테일 : 베이스 재료에 따라 필터링된 칵테일 리스트
- 전체보기 : 전체 칵테일 리스트
- 칵테일을 클릭하면 상세페이지로 넘어가게 됩니다. 상세페이지에서 재료 버튼을 클릭하게되면 해당 재료가 들어간 모든 칵테일들을 확인하시면서 끊임없이 페이지를 탐색하실 수 있습니다.
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5fc539b8-1450-467b-b7f9-2d0b2928ff85/.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210206T070530Z&X-Amz-Expires=86400&X-Amz-Signature=d4d946edd5bac3103766e0740281cf038d328f659f6271ed4e46fa2d8f5646f1&X-Amz-SignedHeaders=host)

### 칵테일 지도
- 베이스 재료에 따라 칵테일을 **시각화된 애니메이션** 형식으로 보여주는 기능입니다. (**d3.js**)
- 베이스가 되는 주류를 클릭하고, 그 안에 있는 칵테일들을 찾아 **상세페이지로 이동**할 수 있습니다.
- 클릭에 따라 **줌인, 줌아웃**이 가능하여 계속해서 자유롭게 칵테일들을 탐색해보실 수 있습니다.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/cd3feac3-3a19-4b79-aebe-bc49035aca9c/_.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210206T081353Z&X-Amz-Expires=86400&X-Amz-Signature=a0dae4ced8cfcfe4f81bf1acaa48f1cd1ec8c47359403e65c1d5a89aa768cfc9&X-Amz-SignedHeaders=host)

### 칵테일 퀴즈
- 칵테일과 관련된 재밌는 퀴즈들을 풀어보고 결과를 공유할 수 있는 컨텐츠 입니다.
- 매번마다 문제는 **랜덤한 순서**로 나오게 되며, 답을 클릭하면 상단의 **progress bar** 에서 진행상황이 업데이트 됩니다.
- 결과를 **카카오톡으로 지인들과 공유**할 수 있습니다
- **댓글**창을 열어 사람들과 소통하실 수 있습니다

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1bd868f2-a4f2-4b48-9ec9-14523993da9d/.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210206T081527Z&X-Amz-Expires=86400&X-Amz-Signature=e4fad9ef00bb7594b21be578e5ed3eb37a60b8092e63957dad70bc0d59bf5059&X-Amz-SignedHeaders=host)

### 칵테일 이상형 월드컵
- 자신이 가장 좋아하는 칵테일을 찾아가는 **이상형 월드컵** 컨텐츠입니다.
- **카드 드로잉 애니메이션**을 넣어서 마치 카드놀이를 하는 듯한 기분을 느끼실 수 있습니다
- 결과를 **카카오톡으로 지인들과 공유**할 수 있습니다
- **댓글**창을 열어 사람들과 소통하실 수 있습니다

![err](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7a2ed12f-b470-42d1-b3e6-601d2cecbdc8/.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210206T081358Z&X-Amz-Expires=86400&X-Amz-Signature=65a22f62fac1f2c3cbf432a8a98d9ffac661db61ec77a60b1a6bebabfd70cd4a&X-Amz-SignedHeaders=host)

### 그 외 기능
- **평점(Rating)**
- **My칵테일**
- **로그인**
- **회원가입**
- **유저정보 변경**

## WorkFlow

### [Client]

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F328d4b27-86f2-4914-b0bd-5831e35762dc%2FMy_First_Board.jpg?table=block&id=f3752c6a-410b-4aab-ba84-00e31ca50734&spaceId=14cff50a-9d15-48cd-a262-2724a8ab38ba&width=3060&userId=505f5c27-9d71-4cf4-8174-1ef8968c448d&cache=v2)

### [Server]

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcfc67004-a00f-4aa1-9e0c-600fee1cd06e%2FMy_First_Board_(1).jpg?table=block&id=d16b3744-52c7-45b1-a4b1-ff94a3daa5d9&spaceId=14cff50a-9d15-48cd-a262-2724a8ab38ba&width=3060&userId=505f5c27-9d71-4cf4-8174-1ef8968c448d&cache=v2)
