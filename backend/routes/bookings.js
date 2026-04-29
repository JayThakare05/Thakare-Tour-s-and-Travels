const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Booking = require('../models/Booking');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify email connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter error:', error.message);
  } else {
    console.log('✅ Email transporter ready');
  }
});


// POST create booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Send email to admin
    const tripTypeLabels = { 'one-way': 'One Way', 'round': 'Round Trip', 'local': 'Local' };
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `🚘 New Booking Request - ${req.body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #FF6A00, #FFB347); padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🚘 New Booking Request</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Thakare Tours and Travels</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ffe0c0;">
                <td style="padding: 12px 0; color: #888; font-size: 14px; width: 40%;">Customer Name</td>
                <td style="padding: 12px 0; font-weight: bold; color: #333;">${req.body.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ffe0c0;">
                <td style="padding: 12px 0; color: #888; font-size: 14px;">Phone Number</td>
                <td style="padding: 12px 0; font-weight: bold; color: #FF6A00; font-size: 18px;">${req.body.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ffe0c0;">
                <td style="padding: 12px 0; color: #888; font-size: 14px;">Route</td>
                <td style="padding: 12px 0; font-weight: bold; color: #333;">${req.body.pickupCity} → ${req.body.destinationCity}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ffe0c0;">
                <td style="padding: 12px 0; color: #888; font-size: 14px;">Date</td>
                <td style="padding: 12px 0; font-weight: bold; color: #333;">${new Date(req.body.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ffe0c0;">
                <td style="padding: 12px 0; color: #888; font-size: 14px;">Trip Type</td>
                <td style="padding: 12px 0; font-weight: bold; color: #333;">${tripTypeLabels[req.body.tripType] || req.body.tripType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ffe0c0;">
                <td style="padding: 12px 0; color: #888; font-size: 14px;">Car Preferred</td>
                <td style="padding: 12px 0; font-weight: bold; color: #333;">${req.body.carName || 'Any Available'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ffe0c0;">
                <td style="padding: 12px 0; color: #888; font-size: 14px;">Passengers</td>
                <td style="padding: 12px 0; font-weight: bold; color: #333;">${req.body.passengers || 1}</td>
              </tr>
              ${req.body.notes ? `<tr>
                <td style="padding: 12px 0; color: #888; font-size: 14px; vertical-align: top;">Notes</td>
                <td style="padding: 12px 0; color: #333;">${req.body.notes}</td>
              </tr>` : ''}
            </table>
            <div style="background: #FF6A00; color: white; padding: 16px; border-radius: 8px; margin-top: 20px; text-align: center;">
              <p style="margin: 0; font-size: 18px; font-weight: bold;">📞 Call Back: ${req.body.phone}</p>
            </div>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; color: #888; font-size: 12px;">
            Booking ID: ${booking._id} | Received: ${new Date().toLocaleString('en-IN')}
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email failed:', emailError.message);
      // Don't fail the booking if email fails
    }

    res.status(201).json({ message: 'Booking created successfully', bookingId: booking._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    const total = await Booking.countDocuments(filter);
    res.json({ bookings, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// PATCH update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
