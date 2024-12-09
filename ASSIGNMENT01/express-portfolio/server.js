const express = require('express');
const { engine } = require('express-handlebars'); // Use destructuring to get the engine method
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars
app.engine('hbs', engine({
    defaultLayout: 'layout', 
    extname: '.hbs' 
}));
app.set('view engine', 'hbs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
const indexRouter = require('./controllers/index');
app.use('/', indexRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
