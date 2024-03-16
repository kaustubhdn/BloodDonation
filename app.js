const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received registration data:', { name, email, password });

    // Add further processing here, such as saving the data to a database

    res.status(200).send('Registration successful!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
