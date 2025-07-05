const express = require('express');
const router = express.Router();

// const BookHistory = require('../Models/BookHistory');

const verifyTokenAndAdmmin = require('../Middleware/Auth');
const PaymentHistory = require('../Models/PaymentHistory');
const User = require("../Models/User");

// router.get('/all', verifyTokenAndAdmmin, async (req, res) => {
//     try {
//         const history = await BookHistory.find()
//             .populate("userId", "name")
//             .populate("bookId", "title")
//             .sort({ createdAt: -1 });

//         res.status(200).json(history);
//     } catch (err) {
//         res.status(500).json({ message: "Failed to fetch book history", error: err.message });
//     }
// });

// router.get('/all', verifyTokenAndAdmmin, async (req, res) => {
//     try {
//         const history = await PaymentHistory.find()
//             .sort({ createdAt: -1 });


//         const formatted = history.map((item, index) => ({
//             _id: item._id,
//             // sno: index + 1,
//             userId: item.userId,
//             userName: item.userName,
//             userEmail: item.userEmail,
//             bookimg: item.bookimg,
//             bookId: item.bookId,
//             bookTitle: item.bookTitle,
//             startDate: item.startDate,
//             endDate: item.endDate,
//             amountPaid: item.amountPaid,
//         }));

//         res.status(200).json(formatted);
//     } catch (err) {
//         res.status(500).json({ message: "Failed to fetch book history", error: err.message });
//     }
// });


router.get('/all', verifyTokenAndAdmmin, async (req, res) => {
    try {
        const history = await PaymentHistory.find().sort({ createdAt: -1 });

        const formatted = await Promise.all(history.map(async (item) => {
            // Find the user based on custom string ID)
            const user = await User.findOne({ userId: item.userId });

            return {
                _id: item._id,
                userId: item.userId,
                userName: user ? user.name : 'Unknown',
                userEmail: user ? user.email : 'Unknown',
                bookimg: item.bookimg,
                bookId: item.bookId,
                bookTitle: item.bookTitle,
                startDate: item.startDate,
                endDate: item.endDate,
                amountPaid: item.amountPaid
            };
        }));

        res.status(200).json(formatted);
    } catch (err) {
        console.error("Fetch history error:", err);
        res.status(500).json({ message: "Failed to fetch book history", error: err.message });
    }
});

module.exports = router;