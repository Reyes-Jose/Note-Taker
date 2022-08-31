const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();


//static files
app.use(express.static(__dirname + '/public'));

app.use(express.json());

require('./routes/apiRouters')(app);
require('./routes/htmlRouter')(app);


app.listen(PORT, () => console.log(`Server is running: http://localhost:${PORT}`));