// routes/payment.js or wherever you manage routes
const express = require('express');
const router = express.Router();
const PaymentHistory = require('../Models/PaymentHistory');
const verifyToken = require('../Middleware/Auth');

// GET purchased books for a user
router.get('/my-books', verifyToken, async (req, res) => {
  try {

    const userId = req.user.userId;
    const today = new Date();

    const purchases = await PaymentHistory.find({
      userId,
      startDate: { $lte: today },
      endDate: { $gte: today }
    });

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch purchases", error });
  }
});

//book count
router.get('/count', verifyToken, async (req, res) => {
  const count = await PaymentHistory.countDocuments({ userId: req.user.userId });
  res.json({ purchasedBooks: count });
});

module.exports = router;
