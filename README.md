# eShop Project Setup Guide
**<font color="green">IMPORTANT: This readme will evolve over time! Always remember to check it after every sync or pull for any updates or changes.</font>**


> Before starting the setup process, ensure that you delete the old ```e_shop``` database created from previous versions of these projects from your phpMyAdmin panel

This guide will walk you through the setup process for both the backend and frontend of our eShop project.

## 1. Backend Setup

### 1.1. Installation

Navigate to the root directory of the project. Install all necessary backend dependencies by running:

```bash
composer install
```

This step is only required the first time.

### 1.2. Environment Configuration

In the backend directory, locate the `env.example` file and make a copy of it. Rename the copied file to `.env`. You can do this by running the following command:

```bash
cd back-end
cp env.example .env
```

### 1.3. Generating API Key

To generate an API key in your `.env` file, run:

```bash
php artisan key:generate
```

### 1.4. Testing

To test if everything is working correctly, run the backend server by executing the following command in the `back-end` directory:

```bash
php artisan serve
```

#### Note for XAMPP Users:

If you are using XAMPP, please ensure to stop the Apache and MySQL services before running the backend server. You can do this by executing the following commands:

```bash
sudo service apache2 stop
sudo service mysql stop
sudo /opt/lampp/lampp stop
sudo /opt/lampp/lampp start
```

## 2. Frontend Setup

### 2.1. Frontend Dependencies

Navigate to the `front-end` directory and install all the dependencies by running:

```bash
cd ../front-end
npm install
```

This step is also only required the first time.

### 2.2. Testing

To test the frontend, run the development server by executing the following command in the `front-end` directory:

```bash
npm run dev
```

This will compile your frontend assets and start a development server.

Congratulations! You have successfully set up both the backend and frontend for our eShop project. You can now proceed with development and testing.

[GitHub Repository](https://github.com/KpihX/e-shop/)
