# Guide de Configuration du Projet eShop


**<font color="red">IMPORTANT : Ce guide évoluera avec le temps ! N'oubliez pas de le vérifier après chaque synchronisation ou pull pour toute mise à jour ou modification.</font>**

> Avant de commencer le processus de configuration, assurez-vous de supprimer l'ancienne base de données `e_shop` créée à partir des versions précédentes de ces projets depuis votre panneau phpMyAdmin.

Ce guide vous guidera à travers le processus de configuration à la fois pour le backend et le frontend de notre projet eShop.

## 1. Configuration du Backend

### 1.1. Installation

Accédez au répertoire racine du projet. Installez toutes les dépendances backend nécessaires en exécutant :

```bash
composer install
```

Cette étape n'est nécessaire que la première fois.

### 1.2. Configuration de l'Environnement

Dans le répertoire backend, localisez le fichier `env.example` et faites-en une copie. Renommez le fichier copié en `.env`. Vous pouvez le faire en exécutant la commande suivante :

```bash
cd back-end
cp env.example .env
```

### 1.3. Génération de Clé d'API

Pour générer une clé d'API dans votre fichier `.env`, exécutez :

```bash
php artisan key:generate
```

### 1.4. Test

Pour vérifier si tout fonctionne correctement, exécutez le serveur backend en exécutant la commande suivante dans le répertoire `back-end` :

```bash
php artisan serve
```

#### Remarque pour les utilisateurs de XAMPP :

Si vous utilisez XAMPP, assurez-vous d'arrêter les services Apache et MySQL avant de lancer le serveur backend. Vous pouvez le faire en exécutant les commandes suivantes :

```bash
sudo service apache2 stop
sudo service mysql stop
sudo /opt/lampp/lampp stop
sudo /opt/lampp/lampp start
```

## 2. Configuration du Frontend

### 2.1. Dépendances Frontend

Accédez au répertoire `front-end` et installez toutes les dépendances en exécutant :

```bash
cd ../front-end
npm install
```

Cette étape n'est nécessaire que la première fois.

### 2.2. Test

Pour tester le frontend, exécutez le serveur de développement en exécutant la commande suivante dans le répertoire `front-end` :

```bash
npm run dev
```

Cela compilera vos assets frontend et démarrera un serveur de développement.

Félicitations ! Vous avez configuré avec succès à la fois le backend et le frontend pour notre projet eShop. Vous pouvez maintenant procéder au développement et aux tests.

[Repository GitHub](https://github.com/KpihX/e-shop/)
