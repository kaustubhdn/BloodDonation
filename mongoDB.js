const mongoose = require('mongoose');

// Replace this with your actual database connection URL
const dbUrl = 'mongodb://localhost:27017/your-database-name';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });
    const mongoose = require('mongoose');

    // Define a schema
    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
    });
    
    // Create a model using the schema
    const User = mongoose.model('User', userSchema);
    app.post('/register', async (req, res) => {
        const { name, email, password } = req.body;
    
        try {
            // Create a new user using the User model
            const newUser = new User({ name, email, password });
            
            // Save the user to the database
            await newUser.save();
            
            console.log('Registered user:', newUser);
            res.status(200).send('Registration successful!');
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).send('Registration failed.');
        }
    });
        