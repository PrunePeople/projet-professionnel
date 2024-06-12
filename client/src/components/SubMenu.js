import React, { useState, useEffect } from 'react';

// Composant SubMenu qui reçoit un menu en tant que prop
const SubMenu = ({ menu }) => {
  // États pour les catégories, la catégorie sélectionnée et les items
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);

  // Effet pour initialiser les catégories et la catégorie sélectionnée lorsque le menu change
  useEffect(() => {
    if (menu) {
      // Extraction des catégories uniques à partir des items du menu
      const uniqueCategories = Array.from(new Set(menu.MenuItems.map(item => item.category)));
      setCategories(uniqueCategories);
      // Sélection de la première catégorie par défaut
      setSelectedCategory(uniqueCategories[0]);
    }
  }, [menu]);

  // Effet pour filtrer les items lorsque la catégorie sélectionnée ou le menu change
  useEffect(() => {
    if (selectedCategory && menu) {
      // Filtrage des items appartenant à la catégorie sélectionnée
      const filteredItems = menu.MenuItems.filter(item => item.category === selectedCategory);
      setItems(filteredItems);
    }
  }, [selectedCategory, menu]);

  // Fonction pour gérer le clic sur une catégorie
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {/* Liste des catégories sous forme de boutons */}
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
        {/* Affichage de la catégorie sélectionnée */}
        <h2 className="text-3xl font-bold mb-8 text-secondary-color">{selectedCategory}</h2>
        {/* Liste des items appartenant à la catégorie sélectionnée */}
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
