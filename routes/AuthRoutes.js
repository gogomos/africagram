const express = require('express');
const bodyParser = require('body-parser');
const { router: authRouter, authMiddleware } = require('./AuthController');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use('/auth', authRouter);
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
