const menuData = [
    {
      id: 1,
      title: "Menu Enfant",
      items: [
        {
          category: "Plats",
          options: [
            { id: 1, name: "Nuggets de poulet", description: "Servis avec frites", price: 7 },
            { id: 2, name: "Mini steak haché", description: "Steak de boeuf servi avec purée", price: 8 }
          ]
        },
        {
          category: "Boissons",
          options: [
            { id: 3, name: "Jus de pomme", description: "100% pur jus", price: 2 },
            { id: 4, name: "Sirop à l'eau", description: "Divers parfums disponibles", price: 1 },
            { id: 5, name: "Milkshake fraise", description: "Fait maison avec de vraies fraises", price: 3 }
          ]
        },
        {
          category: "Desserts",
          options: [
            { id: 6, name: "Glace vanille", description: "Glace artisanale", price: 3 },
            { id: 7, name: "Fruit de saison", description: "Selon disponibilité", price: 2 },
            { id: 8, name: "Mousse au chocolat", description: "Fait maison", price: 3 }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Menu Midi",
      items: [
        {
          category: "Entrées",
          options: [
            { id: 9, name: "Salade verte", description: "Salade, tomate, concombre", price: 5 },
            { id: 10, name: "Soupe du jour", description: "Demandez la sélection du jour", price: 4 },
            { id: 11, name: "Terrine de campagne", description: "Accompagnée de cornichons", price: 6 }
          ]
        },
        {
          category: "Plats",
          options: [
            { id: 12, name: "Lasagnes végétariennes", description: "Lasagnes faites maison avec légumes de saison", price: 10 },
            { id: 13, name: "Poisson du jour", description: "Servi avec légumes vapeur", price: 12 },
            { id: 14, name: "Poulet rôti", description: "Avec pommes de terre rôties", price: 11 }
          ]
        },
        {
          category: "Desserts",
          options: [
            { id: 15, name: "Tarte aux pommes", description: "Fait maison", price: 4 },
            { id: 16, name: "Crème brûlée", description: "Préparée à la vanille naturelle", price: 5 },
            { id: 17, name: "Fromage blanc", description: "Avec miel et noix", price: 4 }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Menu Soir et week-end",
      items: [
        {
          category: "Entrées",
          options: [
            { id: 18, name: "Carpaccio de bœuf", description: "Huile d'olive et parmesan", price: 9 },
            { id: 19, name: "Foie gras", description: "Compote d'oignon et pain d'épices", price: 12 },
            { id: 20, name: "Salade de chèvre chaud", description: "Salade, noix, toasts de chèvre", price: 8 }
          ]
        },
        {
          category: "Plats",
          options: [
            { id: 21, name: "Entrecôte", description: "350g avec frites et salade", price: 18 },
            { id: 22, name: "Daurade royale", description: "Grillée, avec légumes de saison", price: 16 },
            { id: 23, name: "Risotto aux champignons", description: "Risotto crémeux aux cèpes", price: 14 }
          ]
        },
        {
          category: "Desserts",
          options: [
            { id: 24, name: "Fondant au chocolat", description: "Avec sa boule de glace vanille", price: 6 },
            { id: 25, name: "Tarte tatin", description: "Renversée, servie tiède", price: 5 },
            { id: 26, name: "Assortiment de fromages", description: "Sélection de fromages locaux", price: 7 }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "À la Carte",
      items: [
        {
          category: "Boissons",
          options: [
            { id: 27, name: "Coca-Cola", description: "33cl", price: 2 },
            { id: 28, name: "Orangina", description: "33cl", price: 2 },
            { id: 29, name: "Eau minérale", description: "50cl", price: 1.5 },
            { id: 30, name: "Bière locale", description: "50cl", price: 3 },
            { id: 31, name: "Vin rouge", description: "Verre 25cl", price: 4 }
          ]
        },
        {
          category: "Entrées",
          options: [
            { id: 32, name: "Salade niçoise", description: "Thon, œuf, olives", price: 7 },
            { id: 33, name: "Bruschetta", description: "Tomate, mozzarella, basilic", price: 6 },
            { id: 34, name: "Assiette de charcuteries", description: "Sélection de charcuteries italiennes", price: 8 }
          ]
        },
        {
          category: "Plats",
          options: [
            { id: 35, name: "Spaghetti Carbonara", description: "Avec pancetta et parmesan", price: 9 },
            { id: 36, name: "Ratatouille", description: "Légumes mijotés, herbes de Provence", price: 8 },
            { id: 37, name: "Steak tartare", description: "Préparé à la commande, avec frites", price: 12 }
          ]
        },
        {
          category: "Desserts",
          options: [
            { id: 38, name: "Tiramisu", description: "Classique italien", price: 5 },
            { id: 39, name: "Sorbet citron", description: "Rafraîchissant et acidulé", price: 3 },
            { id: 40, name: "Gâteau au fromage", description: "Avec coulis de fruits rouges", price: 4 }
          ]
        }
      ]
    }
  ];
  
  export default menuData;
  