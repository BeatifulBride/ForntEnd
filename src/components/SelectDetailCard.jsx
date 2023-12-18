import React from "react";
import styled from "styled-components";

function SelectDetailCard({ text, selected, onChangeSelected }) {
  return (
    <Container
      onClick={() => {
        onChangeSelected(text);
      }}
      $isSelected={selected === text}
    >
      {text}
    </Container>
  );
}

export default SelectDetailCard;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: ${(props) => (props.$isSelected ? "#9bbacc" : "#d9d9d9")};
  padding: 10px;
  color: ${(props) => (props.$isSelected ? "#fff" : "#000")};
`;
