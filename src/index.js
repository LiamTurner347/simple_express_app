import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send("Hello - I'm Liam Turner!");
});

app.get('/example', (req, res) => {
  res.send('Liam Turner just checking out the routing!');
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);