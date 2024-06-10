import React, { useState, useEffect } from "react";

const Header = ({
  backgroundImage,
  reviews = [],
  menuItems = [],
  isMobile,
  showExtraContent = true
}) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    if(reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  return (
    <div
      className="relative flex items-center w-full min-h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay blanc semi-transparent */}
      <div className="absolute w-full h-full top-0 left-0 bg-white bg-opacity-50 z-10"></div>
      
      <div className="z-20 w-full h-full flex items-center justify-between p-5 ml-8">
        {/* Si mobile */}
        {isMobile ? (
          showExtraContent && (
            <div className="flex flex-col space-y-4 items-start max-w-[90%]">
              <div key={currentReviewIndex} className="text-left animate-fadeIn">
                <p className="review-text text-xl font-bold text-secondary">
                  {reviews[currentReviewIndex]?.text}
                </p>
                <p className="review-author text-xl font-medium text-tertiary">
                  {reviews[currentReviewIndex]?.author}
                </p>
              </div>
            </div>
          )
          // Si non
        ) : (
          <div className="flex justify-between items-center w-full">
            {showExtraContent && (
              <div className="flex flex-col space-y-4 items-start max-w-[70%]">
                <div key={currentReviewIndex} className="text-left animate-fadeIn">
                  <p className="review-text text-2xl font-bold text-secondary">
                    {reviews[currentReviewIndex]?.text}
                  </p>
                  <p className="review-author text-xl font-medium text-tertiary">
                    {reviews[currentReviewIndex]?.author}
                  </p>
                </div>
              </div>
            )}
            {showExtraContent && (
              <div className="hidden md:flex flex-col space-y-8 items-end mr-8">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="uppercase text-secondary font-bold transition-colors duration-300 text-xl"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
