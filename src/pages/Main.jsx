import React, { useState } from "react";
import styled from "styled-components";
import DressInputs from "../components/DressInputs";
import UploadImages from "../components/UploadImages";
import CompanyInfo from "../components/CompanyInfo";
import MainCard from "../components/MainCard";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  return (
    <Container>
      <Section>
        <Title>업체 정보</Title>
        <CompanyInfo formData={formData} setFormData={setFormData} />
      </Section>
      <Line />
      <Section>
        <Title>최신 업로드</Title>
        <NewestRow>
          <MainCard
            image="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000"
            id="123"
            name="드레스 1"
          />
          <NewestRight>
            <NewestBox>총 등록 드레스 수량: _개</NewestBox>
            <Button
              onClick={() => {
                navigate("/my-dress-list");
              }}
            >
              내 드레스 목록 보기
            </Button>
          </NewestRight>
        </NewestRow>
      </Section>
      <Line />
      <Section>
        <Title>내 상품 Top 5</Title>
        <Top5>
          <Top5Row>
            <MainCard
              image="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000"
              id="123"
              name="드레스 1"
            />
            <MainCard
              image="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000"
              id="123"
              name="드레스 1"
            />
            <MainCard
              image="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000"
              id="123"
              name="드레스 1"
            />
          </Top5Row>
          <Top5Row>
            <MainCard
              image="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000"
              id="123"
              name="드레스 1"
            />
            <MainCard
              image="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000"
              id="123"
              name="드레스 1"
            />
          </Top5Row>
        </Top5>
      </Section>
      <Button>등록하기</Button>
    </Container>
  );
}

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Section = styled.div`
  width: 90%;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const Line = styled.div`
  width: 90%;
  height: 1px;
  background: #000;
`;
const Title = styled.p`
  color: #000;
  font-family: Montserrat;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.41px;
`;
const Top5 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
const Top5Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 196px;
  height: 53.333px;
  border-radius: 5px;
  background: #9bbacc;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 110% */
  letter-spacing: -0.41px;
`;
const NewestRow = styled.div`
  display: flex;
  gap: 40px;
`;
const NewestRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const NewestBox = styled.div`
  background: #d9d9d9;
  color: #000;
  font-family: Montserrat;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 88% */
  padding: 20px;
`;
