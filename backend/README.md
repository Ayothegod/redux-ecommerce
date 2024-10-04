# Overview

This is the backend which Paxx uses to manage all backend related tasks. Languages, libraries and Framework  used at the backend are:
- Nodejs
- Hono - Nodejs library
- JWT for auth tokens
- Mongodb + prisma for ORM


## Getting started
To get started making request to the backend, you need to make sure node and npm is installed, if you do not have node installed on your system, download and install node [here](https://nodejs.org/en/download/package-manager/)
you may also install pnpm(optional).


## Setting up environment

To get the backend server up and running, the first step is to clone the paxx project repo

```
git clone https://github.com/USE-PAXX/pax-main.git
```

### Navigate to the paxx project directory
```
cd pax-main
```
### Navigate to the paxx-project backend directory
```
cd backend
```

### Install necessary dependencies

```
pnpm install or
npm install
```
### copy the contents in the .env.example file, create a .env file and paste the contents 

### Get a mongodb atlas database url

### Seed database with test data
```
Coming soon...
```

### Run the backend Server
```
pnpm run dev or 
npm run dev
```
Yaaaay You've made it, The backend server should now be running on http://localhost:6000/

