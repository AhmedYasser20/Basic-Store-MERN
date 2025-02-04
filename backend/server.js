import express, { json } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRouter from './router/product.route.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

//Middle ware Function
app.use(express.json());

app.use('/api/products', productRouter);

app.listen(port, () => {
    connectDB();
    console.log('Server started at http://localhost:' + port);
});

