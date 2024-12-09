# Movie Tracker

**Movie Tracker** is a web application that allows users to manage and track their movie collections. Users can log in, add new movies, update existing movies, and delete movies. It offers an intuitive interface to keep track of movie details such as the title, director, year, and runtime.

## Features

- **User Authentication**: Secure login and registration functionality.
- **Add, Edit, Delete Movies**: Allows users to add new movies, edit existing movie details, and delete movies.
- **Movie List**: View and manage a list of movies with options to edit or delete each one.
- **Responsive UI**: The design is responsive and works well on both desktop and mobile devices.

## Requirements

- Node.js (for running the backend server)
- MongoDB (for storing movie data)
- A modern web browser

## Installation

To set up the project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/Sugamkhanal/COMP2068JSFrameworks.git
cd ASSIGNMENT02

```

### 2. Install Dependencies

Run the following command to install the required Node.js dependencies:

```bash
npm install

```

### 3. Set Up Environment Variables

Make sure to configure your environment variables. Create a `.env` file in the root of your project with the following values:

```bash
PORT=3000
MONGO_URI=mongodb_connection_string
SECRET_KEY=secret_key_for_jwt

```

### 4. Start the Server

Run the following command to start the server:

```bash
npm start

```

The server should now be running at `http://localhost:3000`.

### 5. Access the Frontend

Open the `index.html` file in your web browser to view and interact with the frontend. You can log in, register, and manage your movie collection.

## Usage

- **Login/Register**: Navigate to the login page to log into an existing account or register for a new one.
- **Movie Form**: After logging in, you can add movies by entering the title, director, year, and runtime. You can also edit or delete movies by clicking the corresponding buttons.
- **View Movies**: The movies are listed in a table, where you can view all the details and manage them as needed.

## API Endpoints

The backend provides the following endpoints for managing movies:

- `GET /movies`: Fetch all movies for the authenticated user.
- `POST /movies`: Add a new movie (requires authentication).
- `PUT /movies/:id`: Update an existing movie by ID (requires authentication).
- `DELETE /movies/:id`: Delete a movie by ID (requires authentication).

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
