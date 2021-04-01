const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require("jsonwebtoken");
// const payload = {
//   id: user._id
// };
//
// // notice that we're using the SECRET_KEY from our .env file
// const userToken = jwt.sign(payload, process.env.FIRST_SECRET_KEY);

const cookieParser = require('cookie-parser');

app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

require('dotenv').config();

require('./server/config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/user.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
