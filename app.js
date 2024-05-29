const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/AuthRoutes');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();


app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes)


app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
    console.log(error.stack);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
