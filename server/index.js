require('dotenv').config();
const app = require('./src/app');
const { database } = require('./db');

const PORT = process.env.PORT || 3001;


database.sync({ force: false }).then(

    console.log('Database connected'),

    app.listen(PORT, () => {
        console.log('Server on port:' , PORT)
    })
);