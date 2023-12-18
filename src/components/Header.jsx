import styled from "styled-components";
import logo from "../assets/logo.png";
import profilePhoto from "../assets/profile-photo.svg";
import { useState } from "react";
export default function Header() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  return (
    <Container>
      <Navbar>
        <NavbarLeftText>{`${username}님 환영합니다.`}</NavbarLeftText>
        <Buttons>
          <Button>마이페이지</Button>
          <Button>로그아웃</Button>
        </Buttons>
      </Navbar>
      <Bottom>
        <Logo src={logo} />
        <BottomRow>
          <ProfilePhoto src={profilePhoto} />
          <BottomText>{`${username}님 환영합니다.`}</BottomText>
        </BottomRow>
      </Bottom>
    </Container>
  );
}

const Container = styled.div``;
const Navbar = styled.div`
  width: 100%;
  height: 37px;
  background: #9bbacc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
`;
const NavbarLeftText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;
const Button = styled.p`
  cursor: pointer;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;
const Bottom = styled.div`
  width: 100%;
  height: 281px;
  background: #fff;
  border-bottom: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
`;
const Logo = styled.img`
  width: 320.952px;
  height: auto;
`;
const ProfilePhoto = styled.img`
  width: 70px;
  height: auto;
`;
const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;
const BottomText = styled.p`
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 25px;
  font-style: normal;
  font-weight: 900;
  line-height: 22px; /* 88% */
  letter-spacing: -0.41px;
`;
