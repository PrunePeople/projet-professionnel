import React, { useState, useEffect } from 'react';

const SubMenu = ({ menu }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (menu) {
      const uniqueCategories = Array.from(new Set(menu.MenuItems.map(item => item.category)));
      setCategories(uniqueCategories);
      setSelectedCategory(uniqueCategories[0]);
    }
  }, [menu]);

  useEffect(() => {
    if (selectedCategory && menu) {
      const filteredItems = menu.MenuItems.filter(item => item.category === selectedCategory);
      setItems(filteredItems);
    }
  }, [selectedCategory, menu]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <ul className="flex justify-center space-x-4 mb-8">
        {categories.map((category, index) => (
          <li key={index}>
            <button
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 text-secondary-color rounded hover:bg-tertiary-color transition duration-300 ${selectedCategory === category ? 'bg-tertiary-color' : ''}`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h2 className="text-3xl font-bold mb-8 text-secondary-color">{selectedCategory}</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="text-lg text-secondary-color">
              <span className="font-semibold">{item.name}</span>: {item.description} - {item.price}€
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubMenu;
