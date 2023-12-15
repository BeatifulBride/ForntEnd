import { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function MyDressList() {
  const navigate = useNavigate();
  const dressList = [
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번1",
      name: "드레스명1",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번2",
      name: "드레스명2",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번3",
      name: "드레스명3",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번4",
      name: "드레스명4",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번5",
      name: "드레스명5",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번6",
      name: "드레스명6",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번7",
      name: "드레스명7",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번8",
      name: "드레스명8",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번9",
      name: "드레스명9",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번10",
      name: "드레스명10",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번11",
      name: "드레스명11",
    },
    {
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5334327112/B.jpg?526000000",
      id: "품번12",
      name: "드레스명12",
    },

  ];
  // const [dressList, setDressList] = useState([]);
  // useEffect(()=>{
  //   const {data} = axios.get('/sdjdsfjlkj')
  //   setDressList(data);
  // }, []);
  const handleMove = () => {
    navigate("/login");
  };
  return (
    <Container>
      <Grid>
        {dressList.map((dressInfo) => (
          <Card
            img={dressInfo.img}
            title={dressInfo.id}
            desc={dressInfo.name}
          />
        ))}
      </Grid>
      <Button onClick={handleMove}>등록하기</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 56px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 60px;
  gap: 120px 50px;
`;

const Button = styled.div`
  border-radius: 5px;
  background: #9bbacc;
  width: 182px;
  height: 56px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: Tenor Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.41px;
`;
