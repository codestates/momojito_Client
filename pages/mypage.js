import { useState, useContext } from "react";
import PageUtils from "../components/PageUtils";
import {ThemeContext} from "styled-components"
import ButtonList from "../components/ButtonList";
import CardGrid from "../components/CardGrid";
import ChangeInfo from "../components/ChangeInfo";
import { useRouter } from "next/router";
import axios from "axios";
<<<<<<< HEAD
=======

>>>>>>> 3ec2b8769aa03ba73f724c893e4675b89cbb5280
export default function MyPage() {
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext).userContext;
  const [buttonSelected, setButtonSelected] = useState(0);
<<<<<<< HEAD
=======

>>>>>>> 3ec2b8769aa03ba73f724c893e4675b89cbb5280
  const signOutHandler = () => {
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken) {
      axios.post('http://localhost:5000/auth/signout', '', {
        withCredentials: true
      })
      .then((res) => {
        setUser({...user, isLogin: false, accessToken: '', myCocktailList: [],})
        localStorage.removeItem('accessToken');
        router.push("/")
      })
    }
  }
<<<<<<< HEAD
=======

>>>>>>> 3ec2b8769aa03ba73f724c893e4675b89cbb5280
  return (
    <PageUtils>
      <ButtonList
        buttonList={["회원정보 수정", "My 칵테일"]}
        buttonSelected={buttonSelected}
        setButtonSelected={setButtonSelected}
      ></ButtonList>
      {buttonSelected === 0 ? (
        <ChangeInfo></ChangeInfo>
      ) : buttonSelected === 1? (
        <CardGrid indexList={user.myCocktailList} type="mypage"></CardGrid>
      ) : <div></div>}
      <button onClick={signOutHandler}>로그아웃</button>
    </PageUtils>
  );
}




// import { useState, useContext } from "react";
// import PageUtils from "../components/PageUtils";

// import ButtonList from "../components/ButtonList";
// import CardGrid from "../components/CardGrid";
// import ChangeInfo from "../components/ChangeInfo";

// export default function MyPage() {
//   const [buttonSelected, setButtonSelected] = useState(0);
//   return (
//     <PageUtils>
//       <ButtonList
//         buttonList={["회원정보 수정", "My 칵테일"]}
//         buttonSelected={buttonSelected}
//         setButtonSelected={setButtonSelected}
//       ></ButtonList>
//       {buttonSelected === 0 ? (
//         <ChangeInfo></ChangeInfo>
//       ) : (
//         <CardGrid indexList={[0, 1, 2, 3, 4, 5]} type="mypage"></CardGrid>
//       )}
//     </PageUtils>
//   );
// }
