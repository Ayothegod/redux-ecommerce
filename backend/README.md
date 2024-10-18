# Overview

This is an e-commerce application built with React, Redux, and Hono. The project is structured using Pnpm workspaces, with separate frontend and backend directories.

## Features

- User authentication (JWT-based)
- Product listing and management
- Order processing and management
- Admin dashboard for product management
- Supports user roles (Shoppers, Sellers)

> **Note:** Only shoppers and sellers can register. Admin users must be manually set up in the database.

## Technologies Used

- **Node.js** - JavaScript runtime
- **Hono** - Lightweight web framework for Node.js
- **JWT** - JSON Web Tokens for authentication
- **SQLITE** - SQL database
- **Prisma** - ORM for MongoDB

## Getting started

To get started making request to the backend, you need to make sure node and npm is installed, if you do not have node installed on your system, download and install node [here](https://nodejs.org/en/download/package-manager/)
you may also install pnpm(optional).

## Setting up environment

To get the backend server up and running, the first step is to clone the redux ecommerce project repo

```
git clone https://github.com/Ayothegod/redux-ecommerce
```

### Navigate to the project directory

```
cd redux-ecommerce
```

### Navigate to the backend directory

```
cd backend
```

### Install necessary dependencies

```
pnpm install or
npm install
```

#### Set Up Environment Variables:

Create a .env file by copying the contents of .env.example:

```
cp .env.example .env
```

- Update the .env file with your Cloudinary connection details and other necessary environment variables.

### Run the backend Server

```
pnpm run dev or
npm run dev
```

Yaaaay You've made it, The backend server should now be running on http://localhost:3000/

## API Endpoints

The backend exposes the following API endpoints:

**User Authentication**

- POST /api/v1/auth/login - Log in a user
- POST /api/v1/auth/register - Register a new user (Shoppers and Sellers only)
- POST /api/v1/auth/logout - Log out a user

**Product Management**

- GET /api/v1/products - Retrieve all products
- GET /api/v1/products/:id - Retrieve a product by ID
- POST /api/v1/products - Create a new product (Sellers only)
- PUT /api/v1/products/:id - Update product details (Sellers only)
- DELETE /api/v1/products/:id - Delete a product (Sellers only)

**Order Management**

- POST /api/v1/orders - Place an order
- GET /api/v1/orders - Retrieve all orders for a user (Shoppers and Sellers)
- GET /api/v1/orders/:id - Retrieve an order by ID
- PATCH /api/v1/orders/:id - Update order status (Sellers only)
  Refer to the source code for further details on available routes and their usage.

## Admin Access

Only shoppers and sellers can register via the API. Admin accounts need to be manually set up in the database by updating the user’s role to admin.
