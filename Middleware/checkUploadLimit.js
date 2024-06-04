const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkUploadLimit = async (userId) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const uploadCount = await prisma.post.count({
        where: {
            utilisateur_id: userId,
            date_creation: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });

    return uploadCount < 10;
};

// Middleware to check the upload limit
const checkUploadLimitMiddleware = async (req, res, next) => {
    const userId = req.userId; // Assuming userId is extracted from the token and set in the request object

    const canUpload = await checkUploadLimit(userId);
    if (!canUpload) {
        return res.status(403).json({ error: 'Upload limit reached. You can only upload 10 images per day.' });
    }

    next();
};

module.exports = { checkUploadLimitMiddleware };