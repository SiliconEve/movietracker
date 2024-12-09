const connect = require('connect');  // Import the connect module
const url = require('url');          // Import the URL module for parsing

// Create a function that performs calculations based on URL parameters
const calculate = (req, res, next) => {
    // Parse the query parameters from the URL
    const query = url.parse(req.url, true).query;
    const method = query.method;     // The method parameter (add, subtract, etc.)
    const x = parseFloat(query.x);   // Convert x to a number
    const y = parseFloat(query.y);   // Convert y to a number

    // Check if x and y are valid numbers
    if (isNaN(x) || isNaN(y)) {
        res.end('Invalid numbers provided');
        return;
    }

    // Perform the appropriate math operation based on the method
    let result;
    switch (method) {
        case 'add':
            result = `${x} + ${y} = ${x + y}`;
            break;
        case 'subtract':
            result = `${x} - ${y} = ${x - y}`;
            break;
        case 'multiply':
            result = `${x} * ${y} = ${x * y}`;
            break;
        case 'divide':
            result = `${x} / ${y} = ${x / y}`;
            break;
        default:
            res.end('Invalid method provided');
            return;
    }

    // Return the result to the user
    res.end(result);
};

// Create an instance of a connect app
const app = connect();

// Use the calculate function when the '/lab2' URL path is accessed
app.use('/lab2', calculate);

// Start the server on port 3000 and log a message
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
