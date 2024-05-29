const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret';

router.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await prisma.utilisateur.findUnique({
        where: { email },
    });

    if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.utilisateur.create({
        data: {
            firstname,
            lastname,
            email,
            password: hashedPassword,
        },
    });

    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.utilisateur.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

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

module.exports = { router, authMiddleware };
