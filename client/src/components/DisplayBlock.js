import React from 'react';
import PropTypes from 'prop-types';

const DisplayBlock = ({ items }) => {
  return (
    <div className="w-full bg-secondary p-8">
      <div className="text-center">
        <div className="flex flex-wrap justify-center mb-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/5 flex flex-col items-center p-4"
            >
              <img
                src={item.logo}
                alt={item.title}
                className="w-12 h-12 mb-2 transform transition-transform duration-300 hover:scale-125"
              />
              <h3 className="text-lg font-semibold text-primary mb-1">{item.title}</h3>
              <p className="text-sm text-primary">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

DisplayBlock.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DisplayBlock;
