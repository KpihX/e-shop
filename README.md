# e-shop

## 1. Backend Setup

### 1.1. Installation

Navigate to ./backend. Install all necessary backend dependencies by running:

```bash
composer install
```

This step is only required the first time.

### 1.2. Environment Configuration

In the backend directory, locate the `env.example` file and make a copy of it. Rename the copied file to `.env`. You can do this by running the following command:

```bash
cd back-end // if you are not in the back-end folder yet.
cp env.example .env
```

### 1.3. Initialisation of the database

Run one by one, the following commands without the comments (//) parts

First of all, go in your .env file (in ./back-end) and change this line `APP_URL=http://localhost `into `APP_URL=http://localhost:8000`

Secondly, in this same .env file, put the connection informations of your data base. In the case of mysql, you have to fill them there:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=e_shop_db
DB_USERNAME=root
DB_PASSWORD=//password
```

Finally, run these commands

```
php artisan storage:link // to link with the local storage where images are located.

php artisan migrate // to create the databse and its schema

php artisan db:seed --class=CategoriesTableSeeder // To insert test categories

php artisan db:seed --class=ProduitPhotoSeeder // To insert test products and their images

php artisan db:seed --class=VilleSeeder // To insert test villes
```

### 1.4. Generating API Key (Facultative)

To generate an API key in your `.env` file, run:

```bash
php artisan key:generate
```

### 1.5. Testing

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
