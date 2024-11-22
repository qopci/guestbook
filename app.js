// Get the express package 
const express = require('express');
const mariadb = require('mariadb');

// Instantiate an express (web) app
const app = express();

// Define a port number for the app to listen on
const PORT = 3000;

// Configure the database connection
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'contact'
});

// Connect to the database
async function connect() {
    try {
        let conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log('Error connecting to the database: ' + err);
    }
}

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));
 
app.use(express.static('public'));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');

// Define a "default" route, 
app.get('/', (req, res) => {
	// Log message to the server's console
	console.log("Hello, world - server!");

    // Return home page
    res.render('home');
});

// Define a "confirmation" route
app.post('/confirmation', async (req, res) => {
    // Get the data from the form
    const data = req.body;
    console.log(data);

    data.mailinglist = !data.mailinglist ? false : true;

    // Connect to the database
    const conn = await connect();

    // Write to the database
    await conn.query(`INSERT INTO form (fname, lname, jobtitle, company, linkedinurl, email, meeting, other, message, mailinglist)
    VALUES(
    '${data.fname}', 
    '${data.lname}', 
    '${data.jobtitle}', 
    '${data.company}', 
    '${data.linkedinurl}', 
    '${data.email}', 
    '${data.meeting}',
    '${data.other}',
    '${data.message}', 
     ${data.mailinglist})`);

    // Render the confirm page, and pass the form data
    res.render('confirm', { details: data });
});

// Define a "admin" route
app.get('/admin', async (req, res) => {
    const conn = await connect();
    const results = await conn.query('SELECT * FROM form');
    res.render('admin', { details : results });
});

// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});