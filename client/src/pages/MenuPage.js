import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SubMenu from '../components/SubMenu';
import axios from 'axios';
import Block from '../components/Block'; // Assurez-vous que le chemin est correct

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/menus');
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = [];
    menus.forEach((menu) => {
      menu.MenuItems.forEach((item) => {
        if (item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          results.push({ ...item, menuTitle: menu.title, category: item.category });
        }
      });
    });

    setSearchResults(results);
  };

  const images = [
    `${process.env.PUBLIC_URL}/asset/photos/accueil-slide1.JPG`,
    `${process.env.PUBLIC_URL}/asset/photos/accueil-slide6.JPG`,
    `${process.env.PUBLIC_URL}/asset/photos/accueil-slide5.JPG`,
    `${process.env.PUBLIC_URL}/asset/photos/accueil-slide4.JPG`,
  ];

  return (
    <div className="bg-primary-color text-secondary-color">
      <Header backgroundImage={`${process.env.PUBLIC_URL}/asset/header/header-menu.jpg`} />
      <div className="container mx-auto px-4 py-24">
        <Block
          title="Nos menus"
          text=""
          imageUrl="" // Pas d'image
          imageRight={false}
          showBackground={true} // Afficher le background
          backgroundSize="large" // Taille du background
        />
        <div className="flex flex-wrap -mx-1 mb-8">
          {menus.map((menu, index) => (
            <div key={menu.id} className="w-full sm:w-1/2 lg:w-1/4 px-1 mb-2">
              <div className="relative overflow-hidden group h-64">
                <img
                  src={images[index % images.length]}
                  alt={menu.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-all duration-500 group-hover:bg-opacity-0">
                  <h3 className="text-white text-xl font-bold transition-transform duration-500 transform translate-y-3 group-hover:translate-y-0">
                    {menu.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      
        <ul className="flex justify-center space-x-4 mb-8">
          {menus.map((menu) => (
            <li key={menu.id}>
              <button
                onClick={() => handleMenuClick(menu.id)}
                className={`px-4 py-2 border-b-2 transition duration-300 ${
                  selectedMenu === menu.id ? 'border-tertiary-color text-tertiary-color' : 'border-transparent text-secondary-color'
                } hover:text-tertiary-color`}
              >
                {menu.title}
              </button>
            </li>
          ))}
        </ul>
        {selectedMenu && <SubMenu menu={menus.find((menu) => menu.id === selectedMenu)} />}
        <div className="mt-8">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Rechercher un plat..."
            className="w-full p-2 border border-secondary-color rounded text-secondary-color bg-gray-100 focus:bg-white focus:outline-none focus:border-tertiary-color transition duration-300"
          />
          {searchResults.length > 0 && (
            <div className="mt-4 p-4 bg-white shadow rounded">
              <h3 className="text-2xl font-bold mb-4 text-secondary-color">Résultats de recherche</h3>
              <ul className="space-y-4">
                {searchResults.map((result, index) => (
                  <li key={index} className="text-lg text-secondary-color">
                    <span className="font-semibold">{result.name}</span>: {result.description} - {result.price}€
                    <br />
                    <span className="text-sm text-gray-500">Menu: {result.menuTitle} | Catégorie: {result.category}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
