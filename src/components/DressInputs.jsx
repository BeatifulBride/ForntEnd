import React, { useState } from "react";
import styled from "styled-components";
import SelectDetail from "./SelectDetail";

function DressInputs({ formData, setFormData }) {
  const inputHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const selectHandler = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputData = [
    { title: "Dress Name", value: formData.dressName, name: "dressName" },
    { title: "Brand", value: formData.brand, name: "brand" },
    { title: "Designer", value: formData.designer, name: "designer" },
    { title: "Price", value: formData.price, name: "price" },
  ];
  const selectData = [
    {
      title: "Line",
      value: formData.line,
      name: "line",
      data: ["A라인", "벨라인", "엠파이어라인", "H(슬림)라인"],
    },
    {
      title: "Neckline",
      value: formData.neckLine,
      name: "neckLine",
      data: ["라운드", "브이라인", "하트탑", "홀터넥", "오프숄더"],
    },
    {
      title: "Length",
      value: formData.length,
      name: "length",
      data: ["롱", "쇼츠"],
    },
    {
      title: "Sleave Length",
      value: formData.slv,
      name: "slv",
      data: ["긴팔", "반팔", "민소매", "오프숄더", "하트탑"],
    },
    {
      title: "Fabric",
      value: formData.fabric,
      name: "fabric",
      data: ["실크", "레이스", "튤", "오간자", "타프타", "쉬폰"],
    },
    {
      title: "Material",
      value: formData.material,
      name: "material",
      data: ["비즈", "큐빅", "진주", "꽃", "리본", "자수"],
    },
    {
      title: "Year",
      value: formData.year,
      name: "year",
      data: ["2022", "2023", "2024"],
    },
    {
      title: "Season",
      value: formData.season,
      name: "season",
      data: ["봄", "여름"],
    },
  ];
  return (
    <Container>
      {inputData.map((el) => (
        <Row>
          <Text>{el.title}</Text>
          <Input value={el.value} name={el.name} onChange={inputHandler} />
        </Row>
      ))}
      {selectData.map((el) => (
        <Row>
          <Text>{el.title}</Text>
          <SelectDetail
            data={el.data}
            value={el.value}
            onChange={(value) => {
              selectHandler(el.name, value);
            }}
          />
        </Row>
      ))}
    </Container>
  );
}

export default DressInputs;
const Container = styled.div`
  width: 100%;
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
