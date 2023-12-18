import React, { useState } from "react";
import styled from "styled-components";

function UploadedMyDress() {
  const [selected, setSelected] = useState("front");
  const images = {
    front:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhYYGBgaGh4eHBwaGhwaHBoaHBwdGhwhGBocIS4lHB4rIRocJjgmKy8xNTU1HiQ7QDs0Py40NTEBDAwMEA8QHhISHjYhISE0MTQ0NDQxNDQ0NDQ0NDQ0NDQ0NDQ0MTE0NDQ0NDE0MTQ0NDQ0NDQxNDQxMTQxMTE/NP/AABEIAQMAwgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAABAgUGB//EADwQAAEDAgMFBwIEBQMFAQAAAAEAAhEDIQQxQRJRYXGBBSKRobHB8DLRE1Jy4RQjQmLxBjOCB5KissJj/8QAGAEBAQEBAQAAAAAAAAAAAAAAAQACAwT/xAAfEQEBAAIDAQADAQAAAAAAAAAAAQIRITFBEiJRYQP/2gAMAwEAAhEDEQA/AOl2UahllXba8NY6H09kljxIMyWkyHAwdNE/+Ad6PW7Qp5l7dMy0ZCBruCXqdqUWxL23ygg+nNY1Gtu4yn3Kf6PdL0mkl83h0DlstPqSnGvBp0nNuDTaR1uhUG/V+r/5atMl4QhjKf52+KYeEKhhWsmBmZvf1Wb9eKa9UMbT/O3xRWV2HJ7fEKfhjcPBSiwESGMInUDyVPr9xcLbVYcntPVbDhvCFVptJLdhk7M5DI2SdGoyjQL3hoZTY1z3Oj8jTuueGpKvrLeuDqadEPbvChIGZAXz6p/1GBfFPCNLf7i0OIFzYNIFhldew/092xTxbNunTZIHea4AOb4SCOPvKd1adDbb+YeKn4rPzBbbSkkCkyxg2Gfghlo7x2KYDTc2tAurkcL/AIhn5vVYdimDNw+clplOWyGMAjcgvqANDtlsONoHM+xKrb+xqMux9P8AP5O+yXq9oM/o7x5EAeOfRNMDjI7ozOWk5hWymJBcZGuWXDjks5XLXbWOM257GkuE7TpEwGkAXIvwEBdChhTusM9wvqfZM1aeyBG+5z1um8BQO2YBLdCcgZk8sgLbgueMytavzCo/lwNTaSLxJ009TwhHbhRsueQXP/pysZgczPCAnO0cK5xEQbG2U55cULEMLSH32ZBI6z4FdJjzyN8J+G3YaRpB3mSLzvOea54jaEkA5AWmA2BbkM0y5jfxC5pBDjMbtSfm9LvfL+TiediLrVZbUVqLQeFrBoFneEpTEunZgyCJ0M+Scq0zCYrdivbSFQOD5uGgRDXXzJvBO4W5Lhd64WM3XsMM2MPhx/8Aiz/1UojPn7BFaB+FSAy/CZHLZsh0NefsF1hoTwg1KzWiXGAj1fdc3tXDvcxxY0kFpFr6jTPLvd38pnNNZp3DRVB2CQI1Dmm+UBwlHo04OyBfKOI/aPBc3sLCGkXy0NBgQ0kwBcm+sk+C6eKeWODhGhnfuRP20mJovYx8gl0y2Ij6dmOVp5rw3/UIP/hqFNojbIc8DUU2gC36y0cwF9Cx9WaDXDUry/8AqHCNe+jVcNpn4ZbETBa69v8AuPRZymuY1jzxXE/0p/p1tBgc+DVqZDQcNrIcU72JR2MftU6ZaDt03hpBZltNcYs24C7HanZ7HsDi0l4iAHgToQOhKQ7P7PYKzagFRjqbgQx2Ud6DP9Q728xleVWWWWne5w9iMKWTLgXOJMWm8u6xJV1aB2mOA2Wn6ha5G1xtnM8AqxuIDKtIxZzXDxIUx1cioxgIgt2ha8zHgt2sFXMhzoJu7ajgXSR1A8Vmjh3OqPf/AEEEAHMFxa4kxbQee9XUqRXLCAJaHDpMpvDVhtup8p5bLQiao6c5tBrYgzGQ3X3ZiV0KWFDmXMZx5T6pY04cRucZ/wC4+y6lKlNPrPnZas4EvITWNJdawOUb+CJRxEuDAIiZ8/NSjHf5+37odCmA+c5BM7jks4tJ+IdrZeRMmOItB5zKlR0hrTxB8gl+0vqa8fp9D910AzL5vTOwDTo9wTmJNtLkLiBh2yc816HEgBp5eplcR+Z+clXsxJUWVEhxKHZrnmJAaIkn0aNTBXUrDZAaB3QIGvih4F7tpzBlG1OoNgfEeivFTtBu8gDqY91xtbxxdWo0NaxoyaxoHQD7oFE58/YJrHHvkaC3/i1I0nZ8/YLqylbVd3D09hjWgXi/PVcSm4bY2oiRM5deC634r9udnu7JA3TY38FALG1mN7sDbOVvdcnGyWN/VA65ItWoXO2nAGTJGlirz2Cctqerb+oCkaxeGAoCnJ7t54zPuVyMQ0/ws5ua18f8ySOuXiuxVM/Mkiyi4AC5F8tCM54WRY1j2Qqve1gbMGAJjauOBzV0X9zNpM3IBaOQaXGEzXpHcfJCw2HINhbVY3le3TWM6dTG7D2saJloGy7icx6HmE7jMG1xYSLtIvrGoXDadl0aZjnwXZw2KL23EER14+S6S7crNFu2cMPxKThYgxzBkwfm9VWp7NVjx/UIP/E2907jhLm8I9x7oVZlmniqTkKrsh7jvPsn6X0NH6fZc+sZM7/ZdLZs0bo8gFrLoQtSiHn+7juAQi+JO4K6NQw/9ZjyStQ5jePYrEaXWO1G4/t55rosJjPWFyK9dzQwNaCSPCDHXNdVuQ/Ve3VOPYVjqkN6+nwLinnf4funsc/IbgfX9ikGnLr7oyvJiKLSi0BXMYwd251clsGdt7ZvDh5SR6ItfDnR3781js1sPPj88SuHddPDOLfLifn0/sk2Oz+aImIfny+4WuysMXS547s93+4ceGnH16+sCYTAF52nHZbv1PLhxXZpMa1gaCSANc0F9XTRAfV0WgVxGHaBIJ6oWJrWb3bNzA3ItU90H5uS8/NyE6JILQWtzGfO6JhgIWMLGwLiRaJy+BL4GvL3tkTYiMjofZW2hsSBcaLFJg2I3BbrUyb/ADLRAdYCDnp6eig5tZ8idWkjw+BdLsp0tLt5A8P8rh0523/ldfkQc+s+i6HYjzLxpbx18vZYl5byn47dau7VQiWgc1l5sth2S25hONx84LpVDoPllyQ7vtH93z0T2JqQel/nRNEZrEbJ5hc+s7vdUy100+Jd7hKVbnpKx60E592cG+pXYY6w5+y4jj3gurSOXzTRaxBbGgkjS3S51hLB12jhu4E9MkzjAdoid2vAekeYSh+toO90W4E+ize2p0KotQotMqc5DwzoL+B9p91TnXVsFjGv+PZc8e270qlT23Gcgb8eC6QfFkswbIAH+Src+y6MNPqaITXyZQdpRhspkVx7kcEtTdZGe7Th7JZhU06eCnYdFzPsFxi5zHteQRDjM7iftKcpVXggMzOkTKfxDXhnfph1she/FYs526Sy46Plkt6XSNRotlN/bI7rpbEVHPZDKz2gXJAbtZEEGRlPJeTr9oVcPXZUe8vw8FpF9pjphjnQLiNsZWIiMprlfBcbHpG0CHZXIg+Sc2gAdIm26y5WG7dpVD/KqB5IBdEwJymfpmbDWNUw6tv6H5omWVnez23ICtj5HIpNj4FvnJTD4kd6TGt+HBOwNTP81vAk/wDifui4qpY/M7JekZeXDd52HstVXSevpdVpF2u4OJnxJKXq/S48PUo4+ln6Z8p9kCue44jf7rKLjMdPRdWbrnBt2dE9UMOAWpUFiTtOziT4ZDqlWEbbeZjwJ+BGaLg7ifVBp3ezqeuyf38Ud1o1Ci1sq1phzaj0zRyB4JWizaMnIeqcWcZ63a3KDWfotkoDzJWmUBsURouB8ssN0W2nMqGmXuzQ8PSc5wa0SfQbzwWmMLjstEkrvYei2k2BdxzO8/ZS0mFwraQ/M86/bcFrFP2W3zK3T3nMpbtB92jiPf7LNrQOLwo/DnIgWI01MLxmPoB5ewAOZPeBEiTmP0mAebRoV7nHgmnsjM26wuR2f2fsMJdcudPCAA23mueUtyk8MyscXsTsVtMue3uggN2REDZ2iPUBdoYYuEi9p/ZNsYBtRva754KqFtpv5T5G/rK6TH54ZJUcuOnz5kg4qnYvY2XR9IgbQ1idUzimbD50dcc9QptXjqFJnAViWbZETPlb7rLXd0nftH2W6ru6Y0S89zmPVSdNtugA8ggVP9vwTI+nx8kLECGDoos0Wy5nL2RXHvEnSfILOGzB/t+y3HdceBUoXpZBRg77fDyKKxlkJn1s5+yI0chREhWurDk0shyRClGYoZHNbZigTBzWUM42QnFW50oZddSFaVHvshF9k3gKQe7aP0t8zuUnQ7Mw+w3ad9Th4DdzRA/adwWMRVtClOw9UVGi+6Rxj5ewcfnqjteknumo3hJRl0YcxLu6g1PoHMjxEe4WqxlqDtSxw3evwKDLHSBxBHhB9yq2oeP7mx1z+6Bh6nkfIyPZXiTAadx9/sVIXFM2mEDMXHz5mkGVJEjMX+66W13o3hcyqNh53H3/AH9U1C7WRCyaZL2AZEjkNT0UYbwdVphIMeHuEWI64HYmLkxHN0KY/wCmFKFcSxs5mfnVTtU9wo8KUbNngPRWDDDx+ykdwDfCrEHutH5nDwJVTGgEFre+z9Q9QE26BPNKvs5h/ub5uCSf2VETZVre2Hji7gk6xm6K9iUqMXO06W6ps32i0b0Ct2nUH0ja5vI9irLEvUZbeueWWU6MgHZXb2IxDxTYxhJcWgy4iBMniAAZOsFfTKNMMYGjQZ7zqepXnv8AR/Y7aLDU2QC8Q230s0jnY8gF28VV0C6Y71uiow7Tp0CO56HSbAWdq61AYBSTP9w8G+p/ZMlyUonvPPIeEn3CKYcee6lsM6zvmpRSe6lMCfq6+6gAww546/PNNVRLevt+yTJ7/MR4f5TLHd3kQpNNfIYengUPtKnru9MircO6Rud63RajQ5oPBaRBjpHEI/1AHI+6Tadk35FM0zEjRES6jC4DZOy4GWn8rhz0KUw3aNSqfw3Q7YhrzF3OYO+bZHaERpKfi/P10WsLSaHueLOIAPMZnnYDoFzyl3w1LDdR0BDx4gsbrtN9lpzpgdPErON/3W8LjoC5avSnYxuCRa5S2MfDR3Ta4OloM/JRar7Aawhdoh2w46bFs/bWOiYXc2VSztqLTDxNRqH+GmHCBzWHtgfPBYaLOphGwOAD3wRYXdy0HVTZ36Ltdn0Nht/qN3czkOgt4ok2tntqBwSbTtOnQeq1iakNVUmwI199VoDF+iy3NYcdVbfdaAu2lqZuefsAjylmG55+wRkjT3d1KYM3KO91ktQPeKqg61ntPEjxE+yKw/UOvgg4nfuIPzxWmHvcwUXsmH5HiB5f5WqDpaRuWHGR8+aqsMbnktAtjGQbaqmOy+fNEfEtkHhdJMNraXHus3hH23C0x8X6FBpPmDoUUi/AppNtYNpjhMF1+FiUKu7+YODT/wCse63gquyYPwqgwmq4nID3ACxTFV5DiD8shY8jYcNqLRNhBy6i8KsS83J4XQsfiO46Zuw8o+FO09Fh6ndbyHoqXPwWI/ls/Q30Ci2HDc2T6Ki2TbT1RgPnBQM4ZrDSYWjLpOQv528T6LogoLBAjqfYK9uASmM0N5l4Ggv9kXaS9A2nffp/T90QuTFW9paasN9lZSBkpSNzz9gmAc0tSNzzRSO8pelZx+bkcpdtnFVCsTkeXoZVNNx80W648wgsOSKoaJsVik7vdVqUIm6kZqiCueWw4jTMciuhU0SmKEOB6HqqpnCnNu4+qcGXz5/lc8GHA77J9iolzEFENpdP1R0iZ9kJwsiUTtCN48/8orUKY98M4T7oOPq/y9neYndGfos491tmLk+cwVvEgkODmxtG2tjMRuOSx6XQwR/ls/Q30CiTwddv4bL/ANLfQKLoNIBPzREoGenwBBcZ+aIrMoQqIXeaxiDYN358tfKVbTdCeZJ8ByzPt5qoFblz+BSVlzlQckCsPqtz6oTDZaJWkI02QKevNFYUBpuef2WahQ64QyO+eQWmG6zU+s8gqpKqA05Iz8kF2XVVUHBsFh5WtOqw5XiNC4S2KEtTFAyOiFXbLSpFTcApvDuslGmW8vn3RcO6CqI3Hz0WKbocR1CJxS+JsQd3oc/bzRkYz2pQlzH3gkA85sfAR0CDjXWN/blB8F0mQ9padR4HQrlY6i4MBNiXG3ARqsX8d1qTfCqIAaBGQHooldv5JUWvuLVdKNNBc+wWw6BPy6jhl4lDebwkUVhsqaL8goCqbkUhYKHqthCBuqoyCpKyBZVKgOwoDz3jzRGC6C/6unuVVCtWKru//wAfcLTUPEfUOR9R9kXoxp+SE7IopyWGix5JDc5qnZKN9lkq8Q1F0Bac3fqh0TPyETZVETZqFGOjotOHe5oZsUROizKEOuJHqs4d2iI8eaaYFhakHZKna1MuDTz8fgQY1+cE43vsLT09QsWfWNjUurt5v+EP5iolq3a9Vri38GrYkWbIsYsdVF5/j+V3+v69K6pJQge8tt+mdSsU816nnEqugcz5BWMkLEHvAbh6re1omBcIQWy+FhuigZasjVa0WVJthQ6p7/8AxHqUSmh1R3+nurLpRtqHX+pvX0KI1YrfUOvoUXopoqYFZyUZmmBTDkoQoPv6rSoqqi7RHJKWbZyYCYC+JF5Q6n7o+ICCTZBEouyKZdcJKnuTbHWWkVfmfnz9yt4eqsYgQZ0Pz9kEuIO4G9/Oyzo7dPbCiQ/G4FROg1UOQV4bM8PnshOuZ4fZFoCxPGPnijXJBqHvnotA3PzJYc7vE7vU5KqOaENUarYLj5wVEq6OcLUQ5CyAtwqA+6AtgWKo745Ijc0Kr9Q5FV6U7baLLFT6h19EVqFUzHX0UkOSjM1CoM06SPEEqoWqouqZdCYcLplpS9TgjUnWWgqolAbkfJCeeUi5h2zERI9LqK5TFF0obaY3zfomWt6DhAUg8Q2AlqjZbJ0MjlkfnBOuGYOUQUGqyZaciI6EQpOd/Es/M3xVpP8AhnfAosbyOo6JTVL6QDz8UgZFhfh9iniVsBVQAIz1lDY4TdTFVQLkx80S1OuCSAfZYysl0dU8WrdEXQqNRFY9o3pA8KwLQsNqt3lEa9pyIWkuNY+BAqnvDkfZM56+aXqt7w5FFUbYUN+Y6+iK0QEJzr+KEshDdnb5mtmq3egl4MEXEhaQzyYvfisUzmFGv2sg4W/qgeABnRbZQd48s1lMPNkSirNHeeg/dU2AbNvxK0BiECrTAO0fD7oja5mCqcZHVWlsFp+bkw2VizblAfVJysFIV9YDK58gkq2L2dZcfJDr4iLNz1Og/dK7BzPX7/PZGzoSPkKJjZG7zb91EprEWQK1Z4Ah2e8A531TVYZncg4llw1F6RWHPMuMn26IdWkZkG9vVPU6Sosufm/7LF/zljW6xgqxdIIuIvvF/NMpF9KxKya72/1TzuPuszK4zVVm+nTAstUgk6WOt3hf5vRm45g/qj5wXSZY2b2zZTZS9aoQWwYz3cFbcdTOT/I+6zWcCWwZz9lbl6GrOxRiHx9QPNo9lmm8vfe4APAbvdZ0V4RtyeX3KkYLG/lHmVGQMmgdAtkFYNrrQ5L0shlMhPtbpmuIe02AGA4mbCB6nJNO7YYNHHkI9Vj7n7a+aeJWSFzKvaxza0DiTPoljjKhvtW4Wui/6ydcn5rq1HBt3OA5kBK4ntEbEMkn82gvxzXPDCbm5CJ+HZZ+8sv4ZjI07EVDmjML3C5jktUmW6LRZuWscbPbRajGBEawFDDDJA0R6BW4Avwm8fD9lE3stUSNgan5qFshRRRUMkJuR5H0CiihWDk7mfVJv+eSii55twF2nIIFRWovLm3EdkOQUqPIyJHJRRZw7apj+KeRmqZr19FFF6ce3PLobQc1TM1FF1jNXWYJy3rGwIy+SoohCtYNy3h9eQUUUEZpzR2fZRRaiF2BJtvU3qKJFbP0j5opV+oc1FFJpWoopP/Z",
       side: "data:image/jpeg;base64,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",
       back: "data:image/jpeg;base64,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",
  };
  return (
    <Container>
      <Section>
        <Title>이미지 등록</Title>
        <Row>
          <ImageOptions>
            <ImageOption
              src={images["front"]}
              onClick={() => {
                setSelected("front");
              }}
            />
            <ImageOption
              src={images["side"]}
              onClick={() => {
                setSelected("side");
              }}
            />
            <ImageOption
              src={images["back"]}
              onClick={() => {
                setSelected("back");
              }}
            />
          </ImageOptions>
          <Image src={images[selected]} />
          <Texts>
            <DressName>Dress 1</DressName>
            <Description>Description</Description>
            <Detail>
              brand: brand
              <br />
              designer: designer
              <br />
              price: price
              <br />
              line: line
              <br />
              neckLine: neckLine
              <br />
              length: length
              <br />
              slv: slv
              <br />
              fabric: fabric
              <br />
              material: material
              <br />
              year: year
              <br />
              season: season
            </Detail>
          </Texts>
        </Row>
      </Section>
      <Line />
      <Section>
        <Title>상세설명</Title>
        <Desc>상세설명</Desc>
      </Section>
      <ButtonsRow>
        {" "}
        <Button>수정하기</Button>
        <Button>삭제하기</Button>
      </ButtonsRow>
    </Container>
  );
}

export default UploadedMyDress;

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
const Desc = styled.p`
  width: 100%;
  height: 314px;
  border-radius: 12px;
  background: #d9d9d9;
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
const ImageOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ImageOption = styled.img`
  cursor: pointer;
  width: 126px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;
const Image = styled.img`
  width: 300px;
  height: 400px;
  object-fit: cover;
`;
const Texts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const DressName = styled.p`
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 55px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.41px;
`;
const Description = styled.p`
  width: 100%;
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.41px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;
const Detail = styled.p`
  color: #000;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.41px;
`;
const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
`;
