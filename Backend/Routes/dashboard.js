const express = require('express');
const router = express.Router();
const Book = require('../Models/Book');
const paymenthistory=require('../Models/PaymentHistory');
// const Issue = require('../Models/Issue');
// const User = require('../Models/User');
const verifyToken = require('../Middleware/Auth');

function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().slice(0, 10));
    }
    return days;
}

// router.get('/metrics', verifyToken, async (req, res) => {
//     try {
//         const totalBooks = await Book.countDocuments();

//         // Count issued books (Issue documents where returned is false)
//         const booksIssued = await Book.countDocuments({ status: "Issued" });

//         // Count returned books (Issue documents where returned is true)
//         const booksReturned = await Book.countDocuments({ status: "Available", issuedTo: null });



//         const booksAvailable = totalBooks - booksIssued;

//         const totalAdmins = await User.countDocuments({ role: 'admin' });

//         const recentBooks = await Book.find()
//             .sort({ createdAt: -1 })
//             .limit(5)
//             .select('title author category createdAt');

//         const last7Days = getLast7Days();

//         // Aggregate issues count by date for last 7 days
//         const issueAggregation = await Issue.aggregate([
//             {
//                 $match: {
//                     issueDate: {
//                         $gte: new Date(new Date().setDate(new Date().getDate() - 6))
//                     },
//                     returned: false
//                 },
//             },
//             {
//                 $group: {
//                     _id: {
//                         $dateToString: { format: "%Y-%m-%d", date: "$issueDate" }
//                     },
//                     count: { $sum: 1 }
//                 }
//             }
//         ]);

//         const issueMap = {};
//         issueAggregation.forEach(item => {
//             issueMap[item._id] = item.count;
//         });

//         const issueChart = last7Days.map(date => ({
//             date,
//             count: issueMap[date] || 0,
//         }));

//         res.json({
//             stats: {
//                 totalBooks,
//                 booksIssued,
//                 booksReturned,
//                 booksAvailable,
//                 totalAdmins,
//             },
//             recentBooks,
//             issueChart,
//         });
//     } catch (error) {
//         // console.error("Dashboard metrics error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });


router.get('/metrics', verifyToken, async (req, res) => {
    try {
        // Total books in the system
        const totalBooks = await Book.countDocuments();

        // Books currently issued (status: "Issued")
        const purchasedBooks = await paymenthistory.countDocuments();

        // Books returned (status: "Available" and not currently issued)
        const totalStock = await Book.countDocuments({ status: "Available", issuedTo: null });

        const stockOut = await Book.countDocuments({ quantity: { $eq: 0 } });

        const newUsers=await 


        // Borrowed books (books issued to someone)
        // const booksBorrowed = await Issue.countDocuments();


        // const totalAdmins = await User.countDocuments({ role: 'admin' });

        // const recentBooks = await Book.find()
        //     .sort({ createdAt: -1 })
          
        //     .select('title author category createdAt');

        res.json({
            stats: {
                totalBooks,
                purchasedBooks,
                totalStock,
                stockOut
            }
        });

    } catch (error) {
        console.error("Dashboard metrics error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
