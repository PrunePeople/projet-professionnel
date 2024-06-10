import React from "react";
import Header from "../components/Header";
import { reviews, menuItems } from "../data/AvisData";
import useIsMobile from "../hooks/useIsMobile";
import Block from "../components/Block";
import DisplayBlock from "../components/DisplayBlock";
import "../style/Header.scss";
import { blockData } from "../data/HomeData";

const Home = () => {
  const isMobile = useIsMobile();

  const displayItems = [
    {
      logo: "https://img.icons8.com/ios/50/ffffff/organic-food.png",
      title: "Fait maison",
      text: "Avec des produits frais et locaux",
    },
    {
      logo: "https://img.icons8.com/ios-filled/50/ffffff/beach-umbrella.png",
      title: "Terrasse",
      text: "Extérieure ombragée",
    },
    {
      logo: "https://img.icons8.com/ios-filled/50/ffffff/ice-cream-cone.png",
      title: "Pause rafraîchissante",
      text: "Avec une petite boisson ou une glace artisanale l'été",
    },
    {
      logo: "https://img.icons8.com/ios-filled/50/ffffff/bicycle.png",
      title: "Accès piste cyclable",
      text: "Parking gratuit",
    },
    {
      logo: "https://img.icons8.com/ios-filled/50/ffffff/dog.png",
      title: "Animaux acceptés",
      text: "Avec eau à disposition",
    },
  ];

  return (
    <>
      <Header
        backgroundImage={`${process.env.PUBLIC_URL}/asset/photos/header-accueil.jpg`}
        reviews={reviews}
        menuItems={menuItems}
        isMobile={isMobile}
        showExtraContent={true}
      />
      <div className="flex flex-col">
        <div className="mb-8">
          <Block
            key={0}
            title={blockData[0].title}
            text={blockData[0].text}
            imageUrl={blockData[0].imageUrl}
            imageRight={blockData[0].imageRight}
            showBackground={blockData[0].showBackground}
            backgroundSize={blockData[0].backgroundSize}
          />
        </div>
        <DisplayBlock items={displayItems} />
        <div className="mt-40">
          <Block
            key={1}
            title={blockData[1].title}
            text={blockData[1].text}
            imageUrl={blockData[1].imageUrl}
            imageRight={blockData[1].imageRight}
            showBackground={blockData[1].showBackground}
            backgroundSize={blockData[1].backgroundSize}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
