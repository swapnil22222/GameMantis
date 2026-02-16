const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const gameRoutes = require('./routes/gameRoutes');
const connectDB = require('./config/db');
connectDB();

const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/games', gameRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use(express.static('public'));
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.use('/api/users',userRoutes);

app.get('/' , (req,res) => {
    res.send('Game Store API is Running');
});

const PORT =  process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
})

