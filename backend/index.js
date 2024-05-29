const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
try {
    const routes = readdirSync('./routes');
    if (routes.length === 0) {
        console.error('No routes found in the ./routes directory');
        process.exit(1);
    }
    routes.forEach((route) => {
        console.log(`Loading route: ${route}`);
        app.use('/api/v1', require(`./routes/${route}`));
    });
} catch (err) {
    console.error('Error reading routes directory:', err);
    process.exit(1);
}

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT);
    });
};

server();
