const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getUserCount = async (req, res) => {
    try {
        const userCount = await prisma.utilisateur.count();

        res.json({ userCount });
    } catch (error) {
        console.error('Error retrieving user count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPostCountByUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const postCount = await prisma.post.count({
            where: { utilisateur_id: userId },
        });

        res.json({ postCount });
    } catch (error) {
        console.error('Error retrieving post count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getUserCount, getPostCountByUser };
