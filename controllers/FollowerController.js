const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const followerController = {
    // Follow a user
    followUser: async (req, res) => {
        const { following_id } = req.body;
        const userId = req.userId;
        const follower_id = userId;
        try {
            // Check if the user is trying to follow themselves
            if (following_id === follower_id) {
                return res.status(400).json({ error: "Cannot follow yourself" });
            }

            // Check if the user is already following the target user
            const existingFollow = await prisma.follower.findFirst({
                where: {
                    follower_id,
                    following_id,
                },
            });
            if (existingFollow) {
                return res.status(400).json({ error: "Already following this user" });
            }

            // Create a new follower entry
            const newFollower = await prisma.follower.create({
                data: {
                    follower_id,
                    following_id,
                },
            });

            res.status(201).json(newFollower);
        } catch (error) {
            console.error("Error following user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Unfollow a user
    unfollowUser: async (req, res) => {
        const { following_id } = req.body;
        userId = req.userId;    
        const follower_id = userId;

        try {
            // Check if the user is trying to unfollow themselves
            if (following_id === follower_id) {
                return res.status(400).json({ error: "Cannot unfollow yourself" });
            }

            // Check if the user is already not following the target user
            const existingFollow = await prisma.follower.findFirst({
                where: {
                    follower_id,
                    following_id,
                },
            });
            if (!existingFollow) {
                return res.status(400).json({ error: "Not following this user" });
            }

            // Delete the follower entry
            await prisma.follower.delete({
                where: {
                    follower_id,
                    following_id,
                },
            });

            res.json({ message: "User unfollowed successfully" });
        } catch (error) {
            console.error("Error unfollowing user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = followerController;
