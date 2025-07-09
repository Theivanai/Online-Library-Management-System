const router = require("express").Router();
const User = require("../Models/User");
const PaymentHistory = require('../Models/PaymentHistory');
const verifyToken = require("../Middleware/Auth");
const bcrypt = require('bcryptjs');     


//change password
router.put('/change-password', verifyToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
});



// User profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('name email userId profileImage');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
});




router.get('/book-history', verifyToken, async (req, res) => {
    try {
        //To fetch user details
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        //match custom userID
        const history = await PaymentHistory.find({ userId: user.userId });

        const result = history.map((entry, index) => ({
            id: index + 1,
            userID: entry.userId,
            title: entry.bookTitle || "N/A",
            startDate: entry.startDate,
            endDate: entry.endDate,
            status: entry.status,
            amountPaid: entry.amountPaid
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book history' });
    }
});







// User borrowing history
// router.get('/history', verifyToken, async (req, res) => {
//     try {
//         const history = await Issue.find({ userId: req.user.id }) //fetches userId from JWT token
//             .populate('bookId', 'title author')
//             .sort({ issuedAt: -1 });

//         const formatted = history.map(entry => ({
//             _id: entry._id,
//             bookTitle: entry.bookId?.title || 'Unknown',
//             bookAuthor: entry.bookId?.author || 'Unknown',
//             bookStatus: entry.status,
//             borrowDate: entry.issueDate,
//             returnDate: entry.returnDate || null,
//             returned: !!entry.returnDate
//         }));

//         res.json(formatted);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching borrowing history' });
//     }
// });

module.exports = router;