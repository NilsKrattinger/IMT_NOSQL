const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors('*'));

app.use('/static',express.static('public'))

// Import the functions we created earlier
const neoRoute = require('./routes/NeoRoutes')
const pgRoute = require('./routes/PgRoutes')


app.use('/graph',neoRoute);

app.use('/pg',pgRoute);


app.get('/heal-check', (req,res) => {
    res.sendStatus(200)
});

app.listen(8080, () => {
    console.log('Server started on port 8080.');
});
