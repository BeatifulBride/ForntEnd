import React from "react";
import styled from "styled-components";

function Card({ img, title, desc }) {
  return (
    <Container>
      <Img src={img} />
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </Container>
  );
}

export default Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  gap: 20px;
`;
const Img = styled.img`
  width: 280px;
  height: 420px;
  object-fit: cover;
`;
const Title = styled.p`
  color: var(--GrayScale-Label, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Tenor Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  margin-bottom: 0;
`;
const Desc = styled.p`
  color: var(--GrayScale-Label, #555);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Tenor Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  margin-top: 0;
`;
