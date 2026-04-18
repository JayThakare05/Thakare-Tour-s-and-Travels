const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameMarathi: { type: String },
  image: { type: String, required: true },
  pricePerKm: { type: Number, required: true },
  fuelType: { type: String, required: true },
  fuelTypeMarathi: { type: String },
  capacity: { type: Number, default: 7 },
  description: { type: String },
  descriptionMarathi: { type: String },
  features: [String],
  featuresMarathi: [String],
  available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
