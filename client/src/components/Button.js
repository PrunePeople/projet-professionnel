import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  const { buttonStyle, buttonHoverStyle } = useTheme();

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonStyle} ${buttonHoverStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
