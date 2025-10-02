import express from 'express';
import cors from 'cors';
import mealRoutes from './src/routes/mealRoutes.js'
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

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

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Micro Serviço Para Gestão Das Refeições",
      version: "1.0.0",
      description: "Esta API é responsável por registrar e consultar refeições realizadas pelos " +
      "usuários, permitindo a criação de refeições de acordo com o horário atual (manhã, tarde ou noite)," +
      "a consulta do histórico de refeições de um usuário e a verificação da quantidade de refeições " +
      "realizadas em um dia específico. O sistema utiliza Node.js, Express, Prisma e PostgreSQL, além" +
      "de autenticação via token JWT validado por um serviço externo.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Documentação disponível em http://localhost:3000/api-docs");
});