const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// GET all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1})

  res.status(200).json(workouts)
}

module.exports = {
  getWorkouts
} 