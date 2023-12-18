import React, { useRef, useState } from "react";
import styled from "styled-components";
import plusIcon from "../assets/plus.svg";
function UploadImage({ text, isProfile }) {
  const uploadRef = useRef();
  const [imgFile, setImgFile] = useState(null);
  const uploadHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  return (
    <Container $isProfile={isProfile}>
      {imgFile ? <Image src={imgFile} /> : <Text>{text}</Text>}
      <PlusIcon
        src={plusIcon}
        onClick={() => {
          uploadRef.current.click();
        }}
      />
      <Input
        type="file"
        onChange={uploadHandler}
        ref={uploadRef}
        multiple={false}
      />
    </Container>
  );
}

export default UploadImage;

const Container = styled.div`
  width: 300px;
  height: ${(props) => (props.$isProfile ? "300px" : "500px")};
  background: #d9d9d9;
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
`;
const PlusIcon = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;
const Text = styled.p`
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 91.667% */
  letter-spacing: -0.41px;
`;
const Input = styled.input`
  display: none;
`;
