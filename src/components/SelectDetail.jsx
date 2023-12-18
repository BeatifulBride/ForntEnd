import React from "react";
import styled from "styled-components";
import SelectDetailCard from "./SelectDetailCard";

function SelectDetail({ data, value, onChange }) {
  return (
    <Container>
      {data.map((el) => (
        <SelectDetailCard
          text={el}
          selected={value}
          onChangeSelected={onChange}
        />
      ))}
    </Container>
  );
}

export default SelectDetail;
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;
