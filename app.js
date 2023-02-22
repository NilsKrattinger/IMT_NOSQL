const express = require('express');
const app = express();

app.use('/static',express.static('public'))

// Import the functions we created earlier
const neoRoutes = require('./routes/NeoRoutes')
app.use('/neo',neoRoutes);

const pgRoutes = require('./routes/PgRoutes')
app.use('/pg',pgRoutes);

app.listen(8080, () => {
    console.log('Server started on port 8080.');
});
