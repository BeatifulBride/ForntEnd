import React, { useState } from "react";
import styled from "styled-components";
import DressInputs from "../components/DressInputs";
import UploadImages from "../components/UploadImages";
import { useNavigate } from "react-router-dom";

function UploadMyDress() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dressName: "",
    brand: "",
    designer: "",
    price: "",
    line: "",
    neckLine: "",
    length: "",
    slv: "",
    fabric: "",
    material: "",
    year: "",
    season: "",
  });
  const [textareaValue, setTextareaValue] = useState("");
  const textareaHandler = (e) => setTextareaValue(e.target.value);
  const handleMove = () => {
    navigate("/uploaded-my-dress");
  };
  return (
    <Container>
      <Section>
        <Title>이미지 등록</Title>
        <UploadImages />
      </Section>
      <Line />
      <Section>
        <Title>드레스 정보 등록</Title>
        <DressInputs formData={formData} setFormData={setFormData} />
      </Section>
      <Line />
      <Section>
        <Title>상세설명 등록</Title>
        <Textarea value={textareaValue} onChange={textareaHandler} />
      </Section>
      <Button onClick={handleMove}>등록하기</Button>
    </Container>
  );
}

export default UploadMyDress;

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
  align-items: flex-start;
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
const Textarea = styled.textarea`
  width: 100%;
  height: 314px;
  border-radius: 12px;
  background: #d9d9d9;
  border: none;
  resize: none;
  font-size: 20px;
  color: #000;
  padding: 15px;
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
