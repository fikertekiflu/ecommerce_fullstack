const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const Product = require('./routes/Product')
const Cart = require('./routes/CartRoutes')
const paymentRoutes = require('./routes/paymentRoutes');
const transactionRoutes = require("./routes/transactionRoutes");


dotenv.config();

const app =  express();

const connectDB = require('./config/db');
connectDB();
require('./models/User');
require('./models/Product');
require('./models/Cart');
require('./models/transaction');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', Product);
app.use('/api/cart', Cart);
app.use("/api", transactionRoutes);

const PORT =  process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on  ${PORT}`))