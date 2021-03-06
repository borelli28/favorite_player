const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

// allowed application to access env folder - environment variables(secret variables)
require('dotenv').config();

// send and read cookies with each request/response.
app.use(cookieParser());

// allow front end to send request
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

require('./server/config/mongoose.config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/user.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
