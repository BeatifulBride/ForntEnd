import styled from "styled-components";
import pin from "../assets/pin.png";
import phone from "../assets/phone.png";
import laptop from "../assets/laptop.png";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterSectionLeft>
        <FooterTitle>BEAUTIFUL BRIDE</FooterTitle>
        <FooterText>
          "Imagine your wedding moment in advance. With our virtual wedding dress fitting service, Beautiful Bride, don't just stop at imagining your wedding. Conveniently try on various designs and styles of wedding dresses virtually, and find your perfect dress. Make your beautiful moment even more special with Beautiful Bride, and take the first step towards the best wedding. The beginning of a happy wedding, join us at Beautiful Bride."
        </FooterText>
      </FooterSectionLeft>
      <FooterSectionRight>
        <FooterTitle>ABOUT US</FooterTitle>
        <ContactInfo>
          <Icon src={pin} />
          <ContactText>Address: 서울특별시 서초구 서초대로77길 13</ContactText>
        </ContactInfo>
        <ContactInfo>
          <Icon src={phone} />
          <ContactText>Contact: 010-1234-5678</ContactText>
        </ContactInfo>
        <ContactInfo>
          <Icon src={laptop} />
          <ContactText>Website: www.beautifulbride.com</ContactText>
        </ContactInfo>
      </FooterSectionRight>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  height: 240px;
  background: #9bbacc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-top: 50px;
`;

const FooterSectionLeft = styled.div`
  width: 42%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  margin-left: 120px;
`;

const FooterSectionRight = styled.div`
  width: 36%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 40px;
`;

const FooterTitle = styled.h3`
  color: #000;
  font-family: 'Tenor Sans', sans-serif;
  font-weight: 550;
  text-transform: uppercase;
  margin: 20px 0;
`;

const FooterText = styled.p`
  color: #000;
  font-size: 18px;
  font-family: 'Tenor Sans', sans-serif;
  font-weight: 400;
  line-height: 20px;
  margin: 10px 0;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const Icon = styled.img`
  width: 24px;
  height: auto;
  margin-right: 10px;
`;

const ContactText = styled.span`
  color: #000;
  font-size: 18px;
  font-family: 'Tenor Sans', sans-serif;
  line-height: 24px;
`;
