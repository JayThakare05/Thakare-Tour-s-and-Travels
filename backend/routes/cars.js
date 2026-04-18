const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const carsData = require('../data/cars.json');

// Seed cars if DB is empty
const seedCars = async () => {
  const count = await Car.countDocuments();
  if (count === 0) {
    await Car.insertMany(carsData);
    console.log('Cars seeded from JSON.');
  }
};

// Fix old .png image paths to correct .jpeg paths in existing DB records
const fixImagePaths = async () => {
  const fixes = [
    { old: '/cars/innova.png', new: '/cars/Innova.jpeg' },
    { old: '/cars/ertiga.png', new: '/cars/ertiga.jpeg' },
    { old: '/cars/eeco.png',   new: '/cars/echo.jpeg'   },
  ];
  for (const fix of fixes) {
    const result = await Car.updateMany({ image: fix.old }, { $set: { image: fix.new } });
    if (result.modifiedCount > 0) {
      console.log(`Fixed image path: ${fix.old} → ${fix.new}`);
    }
  }
};

seedCars()
  .then(() => fixImagePaths())
  .catch(console.error);

// GET all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// GET single car
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch car' });
  }
});

// POST add car (admin)
router.post('/', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update car (admin)
router.put('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH toggle availability
router.patch('/:id/availability', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    car.available = !car.available;
    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle availability' });
  }
});

// DELETE car
router.delete('/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
});

module.exports = router;
