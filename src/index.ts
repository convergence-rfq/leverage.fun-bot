import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Config from './config.js';
import router from './routes/mintOptions.route.js';

const app = express();

app.use(cors());
app.use(
  helmet({
    hidePoweredBy: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    frameguard: {
      action: 'deny',
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  }),
);
app.use(express.json());

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
