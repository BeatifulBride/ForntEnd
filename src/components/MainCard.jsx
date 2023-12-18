import React, { useState } from "react";
import styled from "styled-components";

function MainCard({ image, name, id }) {
  const [likes, setLikes] = useState(0);
  return (
    <Container>
      <Image src={image} />
      <TextColumn>
        <Text>{name}</Text>
        <Text>{`드레스 품번: ${id}`}</Text>
        <Text>{`좋아요 개수: ${likes}`}</Text>
      </TextColumn>
    </Container>
  );
}

export default MainCard;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #9bbacc;
  padding: 16px;
`;
const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;
const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Text = styled.p``;
