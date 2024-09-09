Overview
This project consists of a Node.js backend and a Vue.js frontend. The backend fetches data from a RESTful API, stores it in an SQLite database, and serves it to the frontend. The frontend allows users to fetch and view the data with interactive features.

Features

Backend:
Node.js server that fetches data from a RESTful API.
SQLite database to store and retrieve data.
CORS handling for cross-origin requests.

Frontend:
Vue.js application that displays data from the backend.
Interactive search functionality.
Stylish and responsive UI.

Requirements
Node.js (for the backend)
npm (for managing dependencies)
Vue CLI (for creating and running the Vue.js frontend)
SQLite (for the database)


Setup Instructions

Backend Setup
Navigate to the backend directory:
cd path/to/backend

Install dependencies:
npm install

Run the backend server:
node index.js

The server will run on http://localhost:3000.

Frontend Setup
Navigate to the frontend directory:
cd path/to/frontend

Install dependencies:
npm install

Run the Vue.js application:
npm run serve
The Vue.js application will run on http://localhost:8080.

Usage
Populate Data:
Visit http://localhost:3000/populate in your browser to fetch and populate data into the SQLite database.

View Data:
Visit http://localhost:8080 to interact with the Vue.js frontend.
Click the "Fetch Data" button to load data from the backend and display it.

Troubleshooting
CORS Issues: Ensure the backend server has CORS enabled. You can check this in the server.js file.

Database Errors: Verify that SQLite is properly set up and the database file is in the correct location.