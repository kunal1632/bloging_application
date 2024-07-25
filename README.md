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

### Visit the application in your browser at http://localhost:3000.

## Usage

Once the project is set up and running locally, you can:

1. **Register a New Account:**

   - Click on the "Register" button on the homepage.
   - Fill in the required details and submit the form.
   - Upon successful registration, you will be redirected to the login page.

2. **Log In:**

   - Click on the "Login" button on the homepage.
   - Enter your credentials and submit the form.
   - Upon successful login, you will be redirected to the dashboard.

3. **Create a Blog Post:**

   - Click on "Create New Post" in the dashboard.
   - Fill in the title, summary, and content of the blog post.
   - You can use the rich text editor for formatting your content.
   - Click "Post" to publish your blog.

4. **View All Blogs:**

   - Navigate to the homepage or the "All Blogs" section to view all published blogs.

5. **View Individual Blog Details:**

   - Click on any blog title to view its details.

6. **Edit or Delete a Blog Post:**
   - Go to your dashboard, click on the blog post you want to edit or delete.
   - Make the necessary changes and save, or click delete to remove the post.

## Challenges

1. **User Authentication:**

   - Implementing secure authentication and authorization was crucial to ensure that user data is protected.

2. **Rich Text Editor Integration:**

   - Integrating the ReactQuill editor with React Hook Form for form validation required careful handling of the editor's state.

3. **Responsive Design:**
   - Ensuring the application looks good on all devices required the use of Tailwind CSS and thorough testing on various screen sizes.
