import React from "react";
import Block from "../components/Block";
import Header from "../components/Header";
import { aboutData } from "../data/AboutData";

const AboutPage = () => {
  return (
    <div>
      <Header backgroundImage={`${process.env.PUBLIC_URL}/asset/photos/header-2.png`} />
      {aboutData.map((item, index) => (
        <Block
          key={index}
          title={item.title}
          text={item.text}
          imageUrl={item.imageUrl}
          imageRight={item.imageRight}
          showBackground={item.showBackground || true} 
          backgroundSize={item.backgroundSize || 'large'}
        />
      ))}
    </div>
  );
};

export default AboutPage;

