import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import baseLogger from 'morgan';
import client from 'prom-client';
import logger from './src/Configs/Logger.config';
import metricsRouter from './src/metrics';
import { ConnectionDb } from './src/Models';
// import moment from 'moment';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.json());
app.use(metricsRouter) // Metrics Endpoint
// app.use(morgan(":method : :url :status :res[content-length] ................. :response-time ms"));
app.use(baseLogger('dev'));

ConnectionDb();

/**
 * Call The Router
 */
// const groupEndpoint = '/api';
// app.use(`${groupEndpoint}/users`, userRouter);
// app.use(`${groupEndpoint}/offers`, offerRouter);
// app.use(`${groupEndpoint}/competences`, competenceRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

// Prometheus Metrics
const counter = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP',
  labelNames: ['method', 'route', 'statusCode'],
});

app.use((req: { method: any; path: any; }, res: { on: (arg0: string, arg1: () => void) => void; statusCode: { toString: () => any; }; }, next: () => void) => {
  res.on('finish', () => {
    counter.labels(req.method, req.path, res.statusCode.toString()).inc();
  });
  next();
});

app.get('/stress', (req: Request, res: Response) => {
  let a = [];
  for (let i = 0; i < 1e7; i++) a.push(i);
  res.send("Stress triggered!");
});

app.post('/alert', (req: Request, res: Response) => {
  console.log('🔔 Alerte reçue :');
  console.dir(req.body, { depth: null });
  res.status(200).send('Alerte reçue !');
});



// Start the server
app.listen(port, () => {
  // const formattedTime = moment().format('HH:mm:ss');
  // console.info(`[INFO] ${formattedTime} Server is Fire at http://localhost:${port}`);
  logger.info(`Server is running at http://localhost:${port}`);
});