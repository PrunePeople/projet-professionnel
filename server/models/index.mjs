import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Création d'une instance Sequelize avec les informations de connexion à la base de données
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
});

// Définition du modèle User
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  tableName: 'users',
  timestamps: false,
});

// Définition du modèle Reservation
const Reservation = sequelize.define('Reservation', {
  reservation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  reservation_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  reservation_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  number_of_guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  additional_info: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  validation_status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'pending',
  },
  validated_by: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
    allowNull: true,
  },
  validated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  animals: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  stroller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  wheelchair: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  high_chair: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'reservations',
  timestamps: false,
});

// Définition du modèle Admin
const Admin = sequelize.define('Admin', {
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'admin',
  timestamps: false,
});

// Définition du modèle Menu
const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Définition du modèle MenuItem
const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  menuId: {
    type: DataTypes.INTEGER,
    references: {
      model: Menu,
      key: 'id',
    },
  },
});

Menu.hasMany(MenuItem, { foreignKey: 'menuId' });
MenuItem.belongsTo(Menu, { foreignKey: 'menuId' });

// Synchroniser les modèles avec la base de données
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

export { sequelize, User, Reservation, Admin, Menu, MenuItem };
