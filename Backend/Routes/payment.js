const path = require('path');
const fs = require('fs');
const express = require("express");
// const Razorpay = require("razorpay");
const router = express.Router();
const PaymentHistory = require("../Models/PaymentHistory");
const BookHistory = require("../Models/BookHistory");
const User = require("../Models/User");
const Book = require("../Models/Book");
const verifyToken = require("../Middleware/Auth");
require("dotenv").config();

// const jwt = require('jsonwebtoken');


// Create Razorpay Order
router.post('/create-order', verifyToken, async (req, res) => {
    try {
        const { amount } = req.body;

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
        };

        const order = await razorpay.orders.create(options);
        res.json({ order });
    } catch (error) {
        console.error("Create order failed:", error);
        res.status(500).json({ message: "Order creation failed", error: error.message });
    }
});


// Verify Razorpay Payment and Save
// router.post("/verify", verifyToken, async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookId, duration, place,amount } = req.body;

//     const startDate = new Date();
//     const endDate = new Date(startDate);
//     endDate.setDate(startDate.getDate() + parseInt(duration));

//     await BookHistory.create({
//         userId: req.user.id,
//         bookId,
//         amountPaid: amount,
//         paymentId: razorpay_payment_id,
//         orderId: razorpay_order_id,
//         place: req.body.place,
//         duration: req.body.duration,
//         status: "Purchased",
//         startDate: new Date(),
//         endDate: new Date(Date.now() + req.body.duration * 24 * 60 * 60 * 1000)
//     });


//     res.status(200).json({ message: "Book purchased successfully" });
// });

// router.get("/book-status/:bookId", verifyToken, async (req, res) => {
//     try {
//         const history = await PaymentHistory.findOne({
//             userId: req.user.id,
//             bookId: req.params.bookId,
//             status: "Purchased"
//         });

//         if (!history) return res.json({ purchased: false });

//         res.json({
//             purchased: true,
//             startDate: history.startDate,
//             endDate: history.endDate
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Failed to check purchase status" });
//     }
// });

// router.get("/book-status/:bookId", verifyToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         const history = await PaymentHistory.findOne({
//             userId: user.userId,
//             bookId: req.params.bookId,
//             status: "Purchased"
//         });

//         if (!history) return res.json({ purchased: false });

//         res.json({
//             purchased: true,
//             startDate: history.startDate,
//             endDate: history.endDate
//         });
//     } catch (err) {
//         console.error("Purchase status check failed:", err);
//         res.status(500).json({ message: "Failed to check purchase status" });
//     }
// });


router.get("/book-status/:bookId", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const bookId = req.params.bookId;

        const history = await PaymentHistory.findOne({
            userId: user.userId,
            bookId,
            status: "Purchased"
        });

        if (history) {
            return res.status(200).json({
                purchased: true,
                startDate: history.startDate,
                endDate: history.endDate
            });
        } else {
            return res.status(200).json({ purchased: false });
        }
    } catch (err) {
        console.error("Book status check error:", err.message);
        res.status(500).json({ message: "Failed to check book status" });
    }
});



//verify fake payment
// router.post("/verify", verifyToken, async (req, res) => {
//     try {
//         const {
//             bookId,
//             duration,
//             place,
//             amountPaid,
//             startDate,
//             endDate
//         } = req.body;

//         // Validate required fields
//         if (!bookId || !duration || !place || !amountPaid || !startDate || !endDate) {
//             return res.status(400).json({ message: "Missing required payment fields" });
//         }

//         //Fetch user to get custom userId
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Fetch book for custom bookId and title
//         const book = await Book.findOne({ bookId });
//         if (!book) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         if (!book.bookFile) {
//             return res.status(400).json({ message: "PDF not found for this book" });
//         }

//         const newHistory = new PaymentHistory({
//             userId: user.userId,
//             bookId: book.bookId,
//             userName:user.name,
//             userEmail:user.email,
//             bookimg: book.image,
//             bookTitle: book.title,
//             amountPaid: amountPaid,
//             place,
//             duration,
//             status: "Purchased",
//             startDate: new Date(startDate),
//             endDate: new Date(endDate),
//             isFake: true,
//             paymentId: "FAKE_PAYMENT_" + Date.now(),
//             orderId: "FAKE_ORDER_" + Date.now(),
//             pdfPath: book.bookFile
//         });

//         await newHistory.save();

//         res.status(200).json({ message: "Fake payment recorded successfully" });
//     } catch (error) {
//         console.error("Fake payment error:", error);
//         res.status(500).json({ message: "Failed to record fake payment", error: error.message });
//     }
// });

router.post("/verify", verifyToken, async (req, res) => {
    try {
        const {
            bookId,
            duration,
            place,
            amountPaid,
            startDate,
            endDate
        } = req.body;

        // Validate required fields
        if (!bookId || !duration || !place || !amountPaid || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing required payment fields" });
        }

        // Fetch user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch book
        const book = await Book.findOne({ bookId });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (!book.bookFile) {
            return res.status(400).json({ message: "PDF not found for this book" });
        }

        // ✅ Check if user already purchased this book
        const existingPurchase = await PaymentHistory.findOne({
            userId: user.userId,
            bookId: book.bookId,
            status: "Purchased"
        });

        if (existingPurchase) {
            return res.status(400).json({ message: "You have already purchased this book." });
        }

        // Save new fake payment
        const newHistory = new PaymentHistory({
            userId: user.userId,
            bookId: book.bookId,
            userName: user.name,
            userEmail: user.email,
            bookimg: book.image,
            bookTitle: book.title,
            amountPaid,
            place,
            duration,
            status: "Purchased",
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            isFake: true,
            paymentId: "FAKE_PAYMENT_" + Date.now(),
            orderId: "FAKE_ORDER_" + Date.now(),
            pdfPath: book.bookFile
        });

        await newHistory.save();

        res.status(200).json({ message: "Fake payment recorded successfully" });
    } catch (error) {
        console.error("Fake payment error:", error);
        res.status(500).json({ message: "Failed to record fake payment", error: error.message });
    }
});


//reduce stock
router.put("/reduce-stock/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json("Book not found");

        if (book.stock > 0) {
            book.stock -= 1;
            if (book.stock === 0) {
                book.status = "Out of Stock"; // Auto mark
            }
            await book.save();
            return res.status(200).json("Stock updated");
        } else {
            book.status = "Out of Stock";
            await book.save();
            return res.status(400).json("Book is already out of stock");
        }
    } catch (err) {
        res.status(500).json("Error updating stock");
    }
});




//purchasedbooks
// router.get('/purchased-books', verifyToken, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const purchases = await BookHistory.find({ userId }).select("bookId -_id");
//         res.status(200).json(purchases);
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching purchasing books" });
//     }
// });




router.get('/pdf/:bookId', verifyToken, async (req, res) => {
    try {
        const bookId = req.params.bookId;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json("User not found");

        const history = await PaymentHistory.findOne({
            userId: user.userId,
            bookId,
            status: { $in: ["Purchased", "Success"] }
        });

        if (!history) {
            return res.status(403).json("You haven't purchased this book");
        }

        const book = await Book.findOne({ bookId });
        if (!book || !book.bookFile) {
            return res.status(404).json("Book or PDF not found");
        }

        const pdfPath = path.join(__dirname, '..', 'uploads', 'pdfs', book.bookFile);

        if (!fs.existsSync(pdfPath)) {
            return res.status(404).json("PDF file not found on server");
        }

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline',
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'X-Content-Type-Options': 'nosniff'
        });

        // res.setHeader("Permissions-Policy", "fullscreen=(self)");

        res.sendFile(pdfPath);
    } catch (error) {
        console.error("PDF fetch error:", error);
        res.status(500).json("Internal Server Error");
    }
});


//payment summary
router.get('/user-summary', verifyToken, async (req, res) => {
    const payments = await PaymentHistory.find({ userId: req.user.userId });
    const totalAmountPaid = payments.reduce((acc, p) => acc + (p.amountPaid || 0), 0);
    res.json({ totalPayments: payments.length, totalAmountPaid });
});

module.exports = router;