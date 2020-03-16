import React from "react";
import styled from "styled-components";
import MacOsImage from "../../../assets/images/macos.jpeg";
import WindowsImage from "../../../assets/images/windows.jpeg";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Heading = styled.h2`
  font-weight: bold;
  font-size: 43px;
  line-height: 52px;
  letter-spacing: 2.38889px;
  color: #212e4a;
`;

const CardContainer = styled.div`
  display: flex;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  cursor: pointer;
`;

const Card = styled.div`
  border: 1.5429px solid rgba(143, 148, 156, 0.25142);
  box-sizing: border-box;
  border-radius: 16.287px;
  background: #ffffff;
  padding: 20px;
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = styled.img`
  max-width: 100%;
`;

const CardHeading = styled.p`
  font-weight: bold;
  font-size: 19.5725px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 1.08736px;
  color: #7e8594;
  margin-top: 10px;
`;

const items = [
  {
    title: "MacOS",
    image: MacOsImage
  },
  {
    title: "Windows",
    image: WindowsImage
  }
];

const Download = () => {
  return (
    <Main>
      <CardContainer>
        {items &&
          items.map((item, key) => {
            return (
              <a
                class="btn"
                href={
                  key === 0
                    ? "http://3.20.172.101/Downloads/DailyDoc-0.18.1.zip"
                    : "http://3.20.172.101/Downloads/DailyDocEXE.zip"
                }
              >
                <Box key={key}>
                  <Card>
                    <CardImage src={item.image} alt={item.title} />
                  </Card>
                  <CardHeading>{item.title}</CardHeading>
                </Box>
              </a>
            );
          })}
      </CardContainer>
    </Main>
  );
};

export default Download;
