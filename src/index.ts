import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import Config from './config.js';
import router from './routes/mintOptions.route.js';
import Honeybadger from '@honeybadger-io/js';

const app = express();

Honeybadger.configure({
  apiKey: Config.HONEYBADGER_API_KEY,
  environment: 'production',
});

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['*'],
  }),
);
app.use(express.json());
app.use(Honeybadger.errorHandler);

try {
  await mongoose.connect(`${Config.MONGO_URI}`);
  console.log('Connected to mongoose');
  console.log(`Admin Public Key: ${Config.ADMIN_KEYPAIR.publicKey.toBase58()}`);
  app.listen(Config.PORT, () =>
    console.log(`Server running on port ${Config.PORT}`),
  );
  app.use((req, res, next) => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${req.ip}`,
    );
    next();
  });
  app.use('/mint-options', router);
} catch (error) {
  console.error('Error connecting to database: ', error);
} finally {
  console.log('Finally');
}
