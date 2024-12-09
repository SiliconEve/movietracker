require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

if (!JWT_SECRET || !MONGO_URI) {
  console.error('Error: Missing required environment variables.');
  process.exit(1);
}

app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Middleware to authenticate JWT
function authenticateJWT(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access Denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
}

// Register User
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login User
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Movie Model
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
  runtime: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

// Get All Movies
app.get('/movies', authenticateJWT, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add Movie
app.post('/movies', authenticateJWT, async (req, res) => {
  const { title, director, year, runtime } = req.body;

  try {
    const newMovie = new Movie({ title, director, year, runtime });
    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (err) {
    console.error('Error adding movie:', err);
    res.status(400).json({ message: 'Error adding movie', error: err });
  }
});

// Update Movie
app.put('/movies/:id', authenticateJWT, async (req, res) => {
  const { title, director, year, runtime } = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, year, runtime },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    console.error('Error updating movie:', err);
    res.status(400).json({ message: 'Error updating movie', error: err });
  }
});

// Delete Movie
app.delete('/movies/:id', authenticateJWT, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error('Error deleting movie:', err);
    res.status(400).json({ message: 'Error deleting movie', error: err });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
