# URL Shortener: MERN Stack Application

![License](https://img.shields.io/badge/License-MIT-green.svg)
![Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20TailwindCSS-brightgreen.svg)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-red.svg)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Initial Admin User Setup (Critical)](#initial-admin-user-setup-critical)
  - [Running the Application](#running-the-application)
- [Usage and Demo](#usage-and-demo)
  - [User Interface](#user-interface)
  - [Admin Panel](#admin-panel)
- [Architecture Overview](#architecture-overview)
  - [Backend (server/)](#backend-server)
  - [Frontend (client/)](#frontend-client)
  - [Authentication Flow](#authentication-flow)
- [Code Structure and Best Practices](#code-structure-and-best-practices)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 1. Introduction

This project is a robust and modern URL Shortener application built using the MERN (MongoDB, Express, React, Node.js) stack, enhanced with Vite for a lightning-fast frontend development experience and Tailwind CSS for a highly customizable and attractive user interface.

The core objective is to allow users to submit long URLs and receive a compact, shortened version. Visiting the generated short URL will seamlessly redirect the user to the original destination. Additionally, it features a protected admin panel for monitoring shortened URLs and their visit analytics.

## 2. Features

- **URL Shortening**: Users can input any valid long URL and receive a unique, concise short code.
- **Redirection Service**: Accessing the shortened URL efficiently redirects to the original, full-length URL.
- **Copy to Clipboard**: Convenient one-click copying of the generated short URL.
- **Responsive and Modern UI**: A sleek, intuitive, and responsive design powered by Tailwind CSS.
- **Admin Panel (Authenticated)**:
  - Dedicated login page for administrative access.
  - Lists all stored original URLs, their corresponding short codes, and visit counts.
  - Provides creation and last update timestamps for each entry.
- **Secure Authentication**: Admin panel is protected via JWT (JSON Web Token) based authentication.
- **Visit Tracking**: Each time a short URL is visited, its visit count is incremented.

## 3. Technology Stack

This application leverages a powerful and modern set of technologies:

### Frontend:
- **React.js**: A declarative, component-based JavaScript library for building user interfaces.
- **Vite**: A next-generation frontend tooling that provides an extremely fast development server and build process.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs without leaving your HTML.
- **React Router DOM**: For declarative routing within the React application.

### Backend:
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js, used for building the RESTful API.
- **MongoDB**: A NoSQL document database, providing flexibility and scalability.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js, simplifying data interactions.
- **JSON Web Token (JWT)**: For secure, stateless authentication between the client and server.
- **BcryptJS**: A library used for hashing passwords securely.
- **ShortID**: A library for generating compact, unique, URL-friendly IDs.
- **Valid-URL**: A utility for validating URLs.
- **Dotenv**: For loading environment variables from a .env file.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.

## 4. Project Structure

The project employs a monorepo structure, neatly separating the frontend and backend concerns.

```
url-shortener-mern/
├── client/                     # React Frontend (Vite + Tailwind)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React Context for global state (e.g., Auth)
│   │   ├── pages/              # Top-level page components (e.g., Home, Admin, Login)
│   │   ├── App.jsx             # Main application component, handles routing
│   │   ├── main.jsx            # Entry point for React application
│   │   └── index.css           # Tailwind CSS directives and global styles
│   ├── .env                    # Frontend environment variables
│   ├── package.json            # Frontend dependencies and scripts
│   ├── postcss.config.js       # PostCSS configuration for Tailwind
│   └── tailwind.config.js      # Tailwind CSS customization
│
├── server/                     # Node.js/Express Backend
│   ├── config/                 # Database connection setup
│   │   └── db.js
│   ├── controllers/            # Business logic for API endpoints
│   │   ├── authController.js
│   │   └── urlController.js
│   ├── models/                 # Mongoose schemas for MongoDB collections
│   │   ├── Url.js
│   │   └── User.js
│   ├── routes/                 # API endpoint definitions
│   │   ├── authRoutes.js
│   │   └── urlRoutes.js
│   ├── middlewares/            # Express middleware (e.g., authentication, error handling)
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── app.js                  # Express application configuration
│   ├── server.js               # Entry point for the Node.js server
│   ├── .env                    # Backend environment variables
│   └── package.json            # Backend dependencies and scripts
│
├── .gitignore                  # Git ignore rules for the entire project
└── README.md                   # Project documentation
```

## 5. Getting Started

Follow these steps to set up and run the URL Shortener application on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v14.x or higher (LTS recommended)  
  [Download Node.js](https://nodejs.org/)
- **npm**: (Comes with Node.js)
- **MongoDB**:
  - Option 1 (Local): Install MongoDB Community Server on your machine.  
    [Install MongoDB](https://docs.mongodb.com/manual/installation/)
  - Option 2 (Cloud - Recommended for ease): Create a free cluster on MongoDB Atlas.  
    [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git**: For cloning the repository.  
  [Download Git](https://git-scm.com/downloads)

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GITHUB_REPO_LINK>
   cd url-shortener-mern
   ```

2. **Navigate to the backend directory and install dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Create a .env file:**  
   In the `server/` directory, create a file named `.env` and add the following environment variables. Replace placeholders with your actual values.
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<your_mongo_username>:<your_mongo_password>@cluster0.abcde.mongodb.net/urlshortener?retryWrites=true&w=majority
   BASE_URL=http://localhost:5000 # This is your backend's base URL
   JWT_SECRET=YOUR_VERY_STRONG_AND_RANDOM_JWT_SECRET_KEY # IMPORTANT: Generate a strong, random string
   ADMIN_USERNAME=admin # Default admin username for initial setup
   ADMIN_PASSWORD=password123 # Default admin password for initial setup
   CLIENT_URL=http://localhost:5173 # Frontend URL for CORS configuration
   ```

   **Important Notes:**
   - **MONGODB_URI**: Get this from your MongoDB Atlas cluster (Network Access must allow your IP, and Database Access must have a user with read/write access).
   - **JWT_SECRET**: This should be a long, complex, and random string. You can generate one using an online tool or programmatically (e.g., `require('crypto').randomBytes(64).toString('hex')` in Node.js console). Never hardcode this in a production environment.
   - **ADMIN_USERNAME and ADMIN_PASSWORD**: These are used for the initial setup of the admin user. For production, you would typically disable the register-admin route after the first user is created or use a more robust admin creation process.

4. **Start the backend server:**
   ```bash
   npm run dev
   ```

   You should see output similar to:
   ```
   MongoDB Connected: <your_mongo_host>
   Server running on port 5000
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**  
   Open a new terminal and go back to the root of the project, then enter the client directory:
   ```bash
   cd ../client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a .env file for the frontend:**  
   In the `client/` directory, create a file named `.env` and add the following environment variable:
   ```env
   VITE_API_URL=http://localhost:5000 # Match your backend's BASE_URL
   ```
   > **Note:** Vite requires environment variables to be prefixed with `VITE_`.

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   This will typically open the application in your browser at `http://localhost:5173`.

### Initial Admin User Setup (Critical)

For the admin panel to be accessible, you need to create an initial admin user in your database. This is a one-time process.

1. Ensure your backend server is running (`npm run dev` in `server/`).

2. Use a tool like Postman, Insomnia, or curl to send a POST request to register the admin.

   **Request Details:**
   - **Method**: POST
   - **URL**: `http://localhost:5000/api/auth/register-admin`
   - **Headers**: 
     ```
     Content-Type: application/json
     ```
   - **Body** (raw JSON):
     ```json
     {
         "username": "admin",
         "password": "password123"
     }
     ```
     (Use the `ADMIN_USERNAME` and `ADMIN_PASSWORD` you defined in `server/.env`)

   **Example using curl:**
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "password123"}' http://localhost:5000/api/auth/register-admin
   ```

3. You should receive a `201 Created` response. This indicates the admin user has been successfully created in your MongoDB.

> **Security Note:** In a production environment, you would typically disable or remove the `/api/auth/register-admin` endpoint after the initial setup to prevent unauthorized user creation.

### Running the Application

Ensure both your backend and frontend are running in separate terminal windows:

**Terminal 1 (Backend):**
```bash
cd url-shortener-mern/server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd url-shortener-mern/client
npm run dev
```

Once both are running, open your web browser and navigate to `http://localhost:5173`.

## 6. Usage and Demo

### User Interface (http://localhost:5173)

**Shorten a URL:**
1. On the homepage, you'll find an input field.
2. Enter a long URL (e.g., `https://www.example.com/a/very/long/path/to/a/resource`).
3. Click the "Shorten URL" button.
4. A loading spinner will appear briefly.
5. Upon success, a green box will display your new short URL (e.g., `http://localhost:5000/abc123`).

**Copy and Test:**
1. Click the "Copy URL" button next to the shortened URL to copy it to your clipboard.
2. Click the displayed short URL. This will open it in a new tab, and you should be redirected to the original long URL.

### Admin Panel (http://localhost:5173/admin)

**Accessing the Panel:**
1. From the homepage, click the "Admin" link in the top right corner, or directly navigate to `http://localhost:5173/admin`.
2. You will be redirected to the login page if you are not already logged in.

**Login:**
1. Enter the admin credentials:
   - **Username**: `admin` (or whatever you set in `ADMIN_USERNAME`)
   - **Password**: `password123` (or whatever you set in `ADMIN_PASSWORD`)
2. Click "Log In".

**Viewing Shortened URLs:**
1. Upon successful login, you will see a table listing all URLs that have been shortened through the application.
2. The table includes: Original URL, Short URL, Visit Count, Creation Date, and Last Update Date.

**Logout:**
Click the "Logout" button in the top right corner of the admin panel to end your session. This will redirect you back to the login page.

## 7. Architecture Overview

This application adheres to a clear separation of concerns, typical for MERN stack applications.

### Backend (server/)

The backend is built with Node.js and Express.js, providing a RESTful API.

- **Database Integration** (`config/db.js`): Establishes the connection to MongoDB using Mongoose.
- **Models** (`models/`): Defines the Mongoose schemas for `Url` (storing original URL, short code, and visit count) and `User` (for admin authentication). Passwords are hashed using bcryptjs before saving.
- **Controllers** (`controllers/`): Contain the core business logic for handling requests, such as:
  - `urlController.js`: Handles URL shortening, redirection, and fetching all URLs. It uses shortid for generating unique short codes with collision detection.
  - `authController.js`: Manages user registration (for initial admin setup) and login, generating JWTs upon successful authentication.
- **Routes** (`routes/`): Defines the API endpoints and maps them to their respective controller functions.
  - `/api/shorten` (POST): To shorten a URL.
  - `/:shortcode` (GET): To redirect to the original URL.
  - `/api/urls` (GET): To fetch all URLs (protected by authentication).
  - `/api/auth/register-admin` (POST): For initial admin user creation.
  - `/api/auth/login` (POST): For admin login.
- **Middleware** (`middlewares/`):
  - `authMiddleware.js`: Verifies JWTs from incoming requests to protect authenticated routes.
  - `errorHandler.js`: Centralized error handling to provide consistent error responses.
- `app.js`: Configures the Express application, sets up middleware (CORS, JSON parsing), and mounts the API routes.
- `server.js`: The entry point of the server, starts the Express application.

### Frontend (client/)

The frontend is a single-page application built with React, bundled by Vite, and styled with Tailwind CSS.

- **Components** (`components/`): Reusable UI elements (e.g., UrlForm, ShortenedUrlDisplay).
- **Pages** (`pages/`): Top-level components representing different views (e.g., HomePage, AdminPage, LoginPage).
- **Context** (`context/AuthContext.jsx`): Utilizes React Context API to manage the global authentication state (user, token, login, logout) across the application, avoiding prop drilling.
- **Routing**: `react-router-dom` is used for client-side routing, enabling navigation between HomePage, LoginPage, and AdminPage. The AdminPage is conditionally rendered based on the user's authentication status from the AuthContext.
- **API Communication**: Uses the native fetch API to make requests to the Node.js backend.
- **UI Styling**: Tailwind CSS is used to build the responsive and modern user interface by directly applying utility classes in JSX.

### Authentication Flow

1. **Login**: An admin user provides username and password to the LoginPage.
2. **Request to Backend**: The frontend sends these credentials to `POST /api/auth/login`.
3. **Backend Verification**: The backend verifies the credentials against the hashed password in MongoDB.
4. **JWT Generation**: If successful, the backend generates a JWT containing the user's ID and sends it back to the frontend.
5. **Frontend Storage**: The frontend stores the JWT (and user details) in localStorage and the AuthContext.
6. **Protected Route Access**: When the admin navigates to `/admin`, the AuthContext checks for the presence of a valid user. If a token exists, the AdminPage is rendered.
7. **API Authorization**: For requests to protected endpoints (like `GET /api/urls`), the frontend attaches the stored JWT in the Authorization header (`Bearer <token>`).
8. **Backend Protection**: The `authMiddleware.js` on the backend intercepts these requests, verifies the JWT, and only proceeds if the token is valid, otherwise, it returns a 401 Unauthorized error.
9. **Logout**: The logout function in AuthContext clears the localStorage and resets the user state, effectively logging out the user and redirecting them to the login page.

## 8. Code Structure and Best Practices

- **Modularity**: Clear separation of concerns (models, controllers, routes, middleware, context) enhances maintainability and scalability.
- **Environment Variables**: Sensitive information (database URIs, JWT secrets) and configurations are managed via `.env` files, improving security and portability.
- **Input Validation**: Essential for security and robustness, implemented on the backend (`valid-url`).
- **Centralized Error Handling**: A dedicated Express middleware (`errorHandler.js`) ensures consistent and graceful error responses.
- **Asynchronous Operations**: Consistent use of `async/await` for cleaner and more readable asynchronous code in both frontend and backend.
- **Database Indexing**: The `shortCode` field in MongoDB is indexed to significantly speed up lookups, crucial for efficient redirection.
- **CORS Configuration**: Properly configured CORS allows secure communication between the React frontend and Node.js backend.
- **RESTful API Design**: Meaningful endpoint names and HTTP methods follow REST principles.
- **User Feedback**: The frontend provides clear loading states, success messages, and error messages to enhance user experience.
- **Short Code Generation Algorithm**: Utilizes `shortid` for generating compact, globally unique, URL-friendly IDs combined with a database collision check for guaranteed uniqueness and randomness.
- **Tailwind CSS**: Follows a utility-first approach, promoting rapid UI development and ensuring consistency through design tokens.

## 9. Deployment

To deploy this application:

### Frontend (Client):
1. **Build the React application:**
   ```bash
   cd client
   npm run build
   ```
2. The build output will be in the `client/dist` directory. This can be deployed to static site hosting services like Vercel, Netlify, or GitHub Pages.
3. **Important**: Update the `VITE_API_URL` environment variable on your hosting platform to point to your deployed backend URL.

### Backend (Server):
1. The Node.js/Express backend can be deployed to platforms like Render, Heroku, DigitalOcean Droplets, or AWS EC2.
2. **Important**:
   - Update the `PORT` environment variable (if your hosting provider assigns a specific port).
   - Update `MONGODB_URI` to your production MongoDB database.
   - Update `BASE_URL` to your deployed backend URL.
   - Update `JWT_SECRET` to a new, strong, and truly secret string.
   - Update `CLIENT_URL` to your deployed frontend URL for CORS.
   - **Security**: Ensure you manage `ADMIN_USERNAME` and `ADMIN_PASSWORD` securely and that the register-admin route is not publicly accessible in production.

## 10. Future Enhancements

Potential improvements and features for future development include:

- **Custom Short URLs**: Allow users to define their own short codes (if available).
- **URL Expiry**: Implement options for short URLs to expire after a certain time or number of visits.
- **Rate Limiting**: Protect the shortening endpoint from abuse.
- **Advanced Analytics**: Detailed statistics per short URL (referrer, geographic location, device type).
- **QR Code Generation**: Automatically generate QR codes for shortened URLs.
- **User Accounts**: Allow multiple users to manage their own shortened URLs.
- **Dockerization**: Containerize both frontend and backend for easier deployment.
- **Automated Testing**: Implement unit, integration, and end-to-end tests.
- **API Documentation**: Generate API documentation using tools like Swagger/OpenAPI.
- **Improved Error Messages**: More user-friendly error messages on the frontend.

## 11. Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## 12. License

This project is licensed under the MIT License - see the LICENSE file for details.

## 13. Contact

For any questions or inquiries, feel free to reach out:

- **Your Name**: Rahul Saini
- **GitHub**: [link](https://github.com/Rahulsaini27)
- **Email**: rahulsaini42854@gmail.com