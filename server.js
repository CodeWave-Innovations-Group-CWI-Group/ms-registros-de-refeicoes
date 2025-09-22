import express from 'express';
import cors from 'cors';
import mealRoutes from './src/routes/mealRoutes.js'

const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false
};

app.use(cors(corsOptions));

app.use('/meal', mealRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});