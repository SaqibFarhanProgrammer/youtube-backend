import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// import routes here
import UserRouter from './routes/user.routes.js';

app.use('/api/v1/users', UserRouter);
// hoga mein ne yahan se kaha ke bhai agar apka url aysa 
// https:localhost:7000/api/v1/users/
//  ye ab ye jo /user hai iske baad jo bhi method mein callkarraha hu control sara wahan jayega
// abhi mera control user.routes.js mein jayega wahan jaa
// routes declaration here

export { app };
