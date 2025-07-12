const Issue = require('../Modules/Issue');

exports.issueBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        if (!userId || !bookId) {
            return res.status(400).json({ message: 'userId and bookId are required' });
        }

        const issue = new Issue({ userId, bookId, issueDate: new Date() });
        await issue.save();

        res.status(201).json({ message: 'Book issued' });
    } catch (err) {
        console.error('Issue error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { issueId } = req.body;
        if (!issueId) {
            return res.status(400).json({ message: 'issueId is required' });
        }

        const updated = await Issue.findByIdAndUpdate(issueId, {
            returned: true,
            returnDate: new Date()
        });

        if (!updated) {
            return res.status(404).json({ message: 'Issue record not found' });
        }

        res.json({ message: 'Book returned ' });
    } catch (err) {
        console.error('Return error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
