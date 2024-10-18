# E-commerce Frontend

This is the frontend for the e-commerce application built with **React**, **Vite**, **Redux**, and **TailwindCSS**. It allows users to browse products, add items to the shopping cart, place orders, and manage their profile. Sellers can manage their product listings, and admins have access to product and order management.

## Features

- **User authentication** (login, registration)
- **Product listing and detail pages**
- **Shopping cart functionality**
- **Order management for shoppers**
- **Sellers can manage product listings**
- **Role-based access** (Shoppers, Sellers, Admins)

> **Note:** Admins cannot be registered through the frontend. They need to be manually assigned in the database.

## Technologies Used

- **React** - JavaScript library for building user interfaces
- **Vite** - Fast build tool for modern web projects
- **Redux** - State management
- **TailwindCSS** - Utility-first CSS framework for styling
- **React Router** - For routing

## Project Structure

The project is structured as follows:

## Getting Started

To set up and run the frontend locally, follow these steps:

### 1. Clone the Repository

First, clone the repository if you haven't already:

```bash
git clone https://github.com/Ayothegod/redux-ecommerce
```

### 2. Navigate to the Frontend Directory

```bash
cd redux-ecommerce/frontend
```

### 3. Install Dependencies

Run the following command to install the necessary packages:

```bash
pnpm install
```

or if you're using npm:

```bash
npm install
```

### 4. Set Up Environment Variables

Create a .env file in the root of the frontend directory to define environment variables like the Cloudinary name

```bash
PUBLIC_CLOUDINARY_NAME
```

### 5. Running the Frontend

Once everything is set up, you can run the development server using:

```bash
pnpm run dev
```

or if you're using npm:

```bash
npm run dev
```
Yaaaay You've made it, The frontend should now be running on http://localhost:5173/


### Key Features

- **Authentication** Pages: Login and Registration forms to authenticate users.
- **Product Pages**: Displays product listings, with detailed product views.
- **Shopping Cart**: Users can add products to their cart and proceed to checkout.
- **Order Pages**: Shoppers can view and manage their past orders.
- **Seller Dashboard**: Sellers can create, update, and delete their product listings.
- **Admin Dashboard**: Admin can create users, delete user and also process orders.
- **Role-Based Navigation**: Navigation and functionality are dynamically adjusted based on user roles.
