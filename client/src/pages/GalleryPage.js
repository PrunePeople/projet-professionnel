import React from "react";
import Header from "../components/Header";
import galleryImages from "../data/GalleryData";
import Block from "../components/Block";
import { useTheme } from "../context/ThemeContext";

const Gallery = () => {
  const { textColor } = useTheme();

  // Définition des classes pour les rectangles de fond
  const largeBgClass =
    "absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-1/2 bg-secondary opacity-50 z-[-1]";

  const smallBgClass =
    "absolute right-0 bottom-0 w-1/4 h-1/4 bg-tertiary opacity-50 z-[-1]";

  return (
    <div>
      <Header
        backgroundImage={`${process.env.PUBLIC_URL}/asset/header/header-gallery.jpg`}
      />
      <div className="text-center mt-8 text-lg">
      <Block
          title="Plongez dans notre univers visuel dégustatif"
          text=""
          imageUrl=""
          imageRight={false}
          showBackground={true}
          backgroundSize="small"
        />
      </div>

      {/* Rectangle de fond pour la grande section */}
      <div className={largeBgClass}></div>

      <div className="gallery-container mx-auto px-4 py-4 max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden p-4 border h-full w-full border-2 border-gray-300 bg-white rounded-lg shadow-lg"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full flex-1"
              />
              <h2 className={`text-center mt-2 ${textColor}`}>{image.title}</h2>
            </div>
          ))}
          {/* Rectangle de fond pour la grande section */}
          <div className={smallBgClass}></div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
