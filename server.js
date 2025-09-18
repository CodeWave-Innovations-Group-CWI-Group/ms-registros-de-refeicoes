import express from 'express';
import cors from 'cors';
import mealRoutes from './src/routes/mealRoutes.js'

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false
};

app.use(cors(corsOptions));

app.use('/meal', mealRoutes);

app.listen(3000);