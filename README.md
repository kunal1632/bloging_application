# Blogging Application

Welcome to the Blogging Application! This repository contains the source code for a full-stack blogging platform built using the MERN stack (MongoDB, Express, React, Node.js).

## Live Demo

Check out the live version of the application: [Blogging Application](https://bloging-application-seven.vercel.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Challenges](#challenges)
- [Contributing](#contributing)
- [License](#license)

## Overview

This application allows users to create, read, update, and delete blog posts. Users can register, log in, and manage their blogs through an intuitive user interface. The backend is built with Node.js and Express, while the frontend is built with React and Tailwind CSS. MongoDB is used for data storage.

## Features

- User Authentication (Register, Login, Logout)
- Create, Read, Update, and Delete (CRUD) blog posts
- View all blogs
- View individual blog details
- Rich text editing for blog content
- Responsive design

## Installation

Follow these steps to set up and run the project locally:

```bash
# Clone the repository
git clone https://github.com/kunal1632/bloging_application.git
cd bloging_application

# Backend Setup
cd backend
npm install

# Create a .env file in the server directory and add the following environment variables:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret

npm start

# Frontend Setup
cd ../frontend
npm install

# Create a .env file in the client directory and add the following environment variables:
# REACT_APP_API_URL=http://localhost:5000/api

npm start
```
