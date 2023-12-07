import { config } from 'dotenv';
// Загрузка переменных окружения из файла .env
config();
import { AppDataSource } from './data-source.js';
import express, { Application, Router } from 'express';
import { router } from './routes/routes.js';

AppDataSource.initialize()
  .then(async () => {
    const app: Application = express();
    app.use(express.json()); //Для парсинга JSON
    app.use(router as Router);
    const PORT: number = Number(process.env.PORT) || 8000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
