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

const getUsersCountByCountry = async (req, res) => {
    try {
        const usersByCountry = await prisma.utilisateur.groupBy({
            by: ['pays'],
            _count: {
                id: true
            }
        });

        res.json({ usersByCountry });
    } catch (error) {
        console.error('Error retrieving users by country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAveragePostsPerUser = async (req, res) => {
    try {
        const averagePostsPerUser = await prisma.utilisateur.aggregate({
            _avg: {
                posts: true
            }
        });

        res.json({ averagePostsPerUser });
    } catch (error) {
        console.error('Error retrieving average posts per user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getGenderDistribution = async (req, res) => {
    try {
        const genderDistribution = await prisma.profile.groupBy({
            by: ['sexe'],
            _count: {
                id: true
            }
        });

        res.json({ genderDistribution });
    } catch (error) {
        console.error('Error retrieving gender distribution:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getUserCount,getUsersCountByCountry,getAveragePostsPerUser,getGenderDistribution };