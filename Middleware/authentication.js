const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // console.log('Request Headers:', req.headers);
    
    const authHeader = req.headers.authorization;
    // console.log('Authorization Header:', authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { authMiddleware };
