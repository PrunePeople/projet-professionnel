# Nom du Projet : Application de Gestion du Restaurant "Com d Roy"

## Introduction

"Com d Roy" est une application web développée pour gérer les réservations, le contenu du menu et les informations de contact d'un restaurant. 
Cette application utilise React, Tailwind CSS, Framer Motion, Node.js, Express, Sequelize, React, et AdminJS pour fournir une interface utilisateur dynamique et un back-office sécurisé pour les administrateurs.

## Table des Matières

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Déploiement](#déploiement)
4. [Utilisation](#utilisation)
5. [Configuration](#configuration)
6. [Fonctionnalités](#fonctionnalités)
7. [Contact](#contact)

## Prérequis

- Node.js (version 14.x ou supérieure)
- PostgreSQL
- Git

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/PrunePeople/projet-professionnel.git
   cd application

   ```

2. Installer les dépendances :
   npm install

3. Configurez les variables d'environnement en créant un fichier .env à la racine du projet avec le contenu suivant :
   DB_NAME=mydatabase
   DB_USER=myuser
   DB_PASS=mypassword
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=mysecret
   MAILJET_API_KEY=myapikey
   MAILJET_API_SECRET=myapisecret

## Déploiement

1. Exécutez les migrations de base de données
   npx sequelize db:migrate

2. Démarrez l'application
   npm start

## Utilisation

Accédez à l'application à l'adresse http://localhost:3000.

Connectez-vous en tant qu'administrateur pour gérer les réservations, les menus, et les utilisateurs via AdminJS à l'adresse http://localhost:3001/adminJS.

## Configuration

Assurez-vous que les variables d'environnement sont correctement définies dans le fichier .env. Vous pouvez ajuster ces configurations selon vos besoins

## Fonctionnalités

1. Gestion des Utilisateurs :
   Création, modification et suppression des comptes utilisateurs.

2. Gestion des Réservations :
   Réservation de tables, approbation et gestion des réservations.

3. Gestion des Menus :
   Création et modification des menus et des éléments de menu.

4. Interface Administrateur :
   Panneau d'administration pour la gestion des données.

## Contact

Pour toute question ou assistance, veuillez contacter Audrey sur https://github.com/PrunePeople
