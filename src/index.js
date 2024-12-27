import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const mongoose = require('mongoose');
const Workout = require('./models/WorkoutModel');
// const { getWorkouts } = require('./controllers/WorkoutController');
const { Pool } = require('pg');

const app = express();

app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => console.log(error));

// PostgreSQL connection
const films = new Pool({
  user: `${process.env.PSQL_USER}`,
  password: `${process.env.PSQL_PASSWORD}`,
  host: 'localhost',
  port: 5432,
  database: 'films'
});

app.get('/', (req, res) => {
  res.send("Hello - I'm Liam Turner! This is my static page");
});

app.get('/dynamic_data', async (req, res)/*getWorkouts*/ => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1});
    const filmData = await films.query('SELECT * FROM films');   
    res.status(200).json({
      mongoData: workouts,
      pgData: filmData.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get('/users', (req, res) => {
  res.send('This is the route demonstrating the connection to PSQL');
})

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);