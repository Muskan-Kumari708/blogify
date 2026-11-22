# Blogify

A blogging web app where users can sign up, log in, and create and read blogs.
Built with Node.js, Express, MongoDB and EJS.

## Features
- User signup and login with JWT authentication (stored in cookies)
- Passwords securely hashed before saving to the database
- Create and view blog posts
- Profile image for users
- Role-based users (e.g. user/admin)

## Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- EJS (templating)
- JSON Web Token, cookie-parser

## Installation

1. Clone the repo
```bash
git clone https://github.com/Muskan-Kumari708/blogify.git
cd blogify
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root folder (see `.env.example`)
```
PORT=8000
MONGO_URI=mongodb://localhost:27017/blogify
JWT_SECRET=your_secret_here
```

4. Start the app
```bash
npm start
```
Open `http://localhost:8000` in your browser.

## Screenshots
(add screenshots here)

## Author
Muskan Kumari