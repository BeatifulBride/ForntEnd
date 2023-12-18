import React, { useState } from "react";
import styled from "styled-components";
import SelectDetail from "./SelectDetail";
import UploadImage from "./UploadImage";

function CompanyInfo({ formData, setFormData }) {
  const inputHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputData = [
    { title: "업체명", value: formData.name, name: "name" },
    { title: "이메일", value: formData.email, name: "email" },
    { title: "주소", value: formData.address, name: "address" },
    { title: "전화번호", value: formData.phone, name: "phone" },
  ];

  return (
    <Container>
      <UploadImage isProfile text="로고/이미지" />
      <Right>
        <Inputs>
          {inputData.map((el) => (
            <Row>
              <Text>{el.title}</Text>
              <Input value={el.value} name={el.name} onChange={inputHandler} />
            </Row>
          ))}
        </Inputs>
        <Button>변경사항 저장</Button>
      </Right>
    </Container>
  );
}

export default CompanyInfo;
const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Text = styled.p`
  width: 150px;
  color: #000;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.41px;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  background: #d9d9d9;
  border: none;
`;
const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 162px;
  height: 58px;
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
