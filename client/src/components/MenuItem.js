import React from "react";

const MenuItem = ({ image, title, anchor }) => {
  return (
    <a
      href={`#${anchor}`}
      className="relative overflow-hidden group h-90 block"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4 transition-all duration-500 group-hover:bg-opacity-0 group-hover:items-center">
        <h3 className="text-white text-xl font-bold transition-transform duration-500 transform translate-y-3 group-hover:translate-y-0">
          {title}
        </h3>
      </div>
    </a>
  );
};

export default MenuItem;
