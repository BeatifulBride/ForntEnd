import React from "react";
import styled from "styled-components";
import UploadImage from "./UploadImage";

function UploadImages() {
  return (
    <Container>
      <UploadImage text="Front" />
      <UploadImage text="Side" />
      <UploadImage text="Back" />
    </Container>
  );
}

export default UploadImages;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
`;
