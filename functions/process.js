const { MongoClient } = require('mongodb');
const querystring = require('querystring');

exports.handler = async (event) => {
    try {
        // Parse the form-urlencoded request body
        const body = querystring.parse(event.body);
        const { email, password } = body;

        // MongoDB connection URI
        const uri = 'mongodb+srv://ahmed33elsayed22:12345@users.pq56gh5.mongodb.net/?retryWrites=true&w=majority&appName=users';

        // Create a new MongoClient
        const client = new MongoClient(uri);

        // Connect to the MongoDB cluster
        await client.connect();

        // Access the database and collection
        const db = client.db('users'); // Replace 'your-database-name' with your actual database name
        const collection = db.collection('users'); // Replace 'your-collection-name' with your actual collection name

        // Insert a document
        const result = await collection.insertOne({ email, password });

        // Log the result
        console.log(`Inserted ${result.insertedCount} documents into the collection`);

        // Close the connection
        await client.close();

        // Return a success response
        return {
            statusCode: 302, // Redirect status code
            headers: {
                'Location': 'https://main--graceful-truffle-fa0928.netlify.app/' // Redirect URL
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