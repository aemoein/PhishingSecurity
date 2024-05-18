const mysql = require('mysql2/promise');
const querystring = require('querystring');

exports.handler = async (event) => {
    try {
        // Parse the form-urlencoded request body
        const body = querystring.parse(event.body);
        const { email, password } = body;

        // Create a MySQL connection pool
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'users'
        });

        // Execute the SQL query
        const [rows, fields] = await connection.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);

        // Close the connection
        await connection.end();

        // Return a success response
        return {
            statusCode: 302, // Redirect status code
            headers: {
                'Location': 'http://localhost:8888/' // Redirect URL
            },
            body: ''
        };
    } catch (error) {
        console.error('Error:', error);
        // Return an error response
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};