# E-commerce App

This is an e-commerce application built with React, Redux, and Hono. The project is structured using Pnpm workspaces, with separate frontend and backend directories.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Product listing and detail pages
- Shopping cart functionality
- Order management
- Admin dashboard for product management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn (v1.22 or higher)
- Pnpm (v9 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ayothegod/redux-ecommerce
   cd redux-ecommerce

   ```

2. Install dependencies for both frontend and backend:

```
yarn install || pnpm install || npm install

```

3. Start the development server:

```
pnpm run dev
```

or seperately

- For frontend

```
cd frontend
pnpm run dev
```

- For backend

```
cd backend
pnpm run dev
```

Environment Variables
Make sure to set up the necessary environment variables for the backend in a .env file. Refer to the .env.example for required variables.

Folder Structure

```
ecommerce-app/
├── frontend/       # Frontend application
│   ├── src/        # Source files for React
│   ├── package.json # Frontend dependencies
├── backend/        # Backend application
│   ├── src/        # Source files for Hono server
│   ├── package.json # Backend dependencies
├── package.json     # pnpm workspace configuration
```
