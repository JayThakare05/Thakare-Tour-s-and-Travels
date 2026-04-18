const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pickupCity: { type: String, required: true },
  destinationCity: { type: String, required: true },
  date: { type: Date, required: true },
  tripType: { type: String, enum: ['one-way', 'round', 'local'], required: true },
  carName: { type: String },
  passengers: { type: Number, default: 1 },
  notes: { type: String },
  status: { type: String, enum: ['pending', 'contacted', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
