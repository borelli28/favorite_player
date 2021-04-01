const express = require('express');
const cors = require('cors');
const app = express();


// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

require('./server/config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/user.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
