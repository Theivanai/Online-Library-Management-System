// const mongoose = require("mongoose");

// const PaymentHistorySchema = new mongoose.Schema({
//     userId: { type: String, required: true, unique: true },
//     bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
//     amount: Number,
//     paymentId: String,
//     orderId: String,
//     status: { type: String, default: "Success" },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("PaymentHistory", PaymentHistorySchema);


const mongoose = require("mongoose");

const PaymentHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    bookId: { type: String },
    userName: { type: String },
    userEmail: { type: String },
    // userNumber: { type: String },
    bookTitle: String,
    amountPaid: Number,
    paymentId: String,
    orderId: String,
    status: { type: String, default: "Success" },
    isFake: { type: Boolean, default: false },
    startDate: Date,
    endDate: Date,
    place: String,
    duration: String,
    bookimg: String,
    pdfPath: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("PaymentHistory", PaymentHistorySchema);
