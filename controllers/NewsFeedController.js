const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getNewsFeed = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 5; 

        const skip = (page - 1) * pageSize;

        const posts = await prisma.post.findMany({
            orderBy: { date_creation: 'desc' },
            include: {
                utilisateur: true,
                likes: true,
                comments: {
                    include: {
                        utilisateur: true,
                    },
                },
            },
            skip,
            take: pageSize,
        });

        res.json(posts);
    } catch (error) {
        console.error('Error retrieving news feed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getNewsFeed };
