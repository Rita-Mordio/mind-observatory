import dotenv from 'dotenv';
import express from 'express';

import connect from './schemas'
import userRouter from './routes/user';

const app = express();

dotenv.config();
connect()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/user', userRouter);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening at http://localhost:${process.env.PORT}`),
);
