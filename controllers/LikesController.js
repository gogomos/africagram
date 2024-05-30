const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const likesController = {
    // Like a post
    likePost: async (req, res) => {
        const { post_id } = req.body;
        const user_id = req.user.id;

        try {
            // Check if the user has already liked the post
            const existingLike = await prisma.aime.findFirst({
                where: {
                    utilisateur_id: user_id,
                    post_id,
                },
            });
            if (existingLike) {
                return res.status(400).json({ error: "Post already liked by this user" });
            }

            // Create a new like entry
            const newLike = await prisma.aime.create({
                data: {
                    utilisateur_id: user_id,
                    post_id,
                },
            });

            // Increment the likesCount of the post
            await prisma.post.update({
                where: { id: post_id },
                data: {
                    likesCount: {
                        increment: 1,
                    },
                },
            });

            res.status(201).json(newLike);
        } catch (error) {
            console.error("Error liking post:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Unlike a post
    unlikePost: async (req, res) => {
        const { post_id } = req.body;
        const user_id = req.user.id;

        try {
            // Check if the user has already liked the post
            const existingLike = await prisma.aime.findFirst({
                where: {
                    utilisateur_id: user_id,
                    post_id,
                },
            });
            if (!existingLike) {
                return res.status(400).json({ error: "Post not liked by this user" });
            }

            // Delete the like entry
            await prisma.aime.delete({
                where: {
                    utilisateur_id: user_id,
                    post_id,
                },
            });

            // Decrement the likesCount of the post
            await prisma.post.update({
                where: { id: post_id },
                data: {
                    likesCount: {
                        decrement: 1,
                    },
                },
            });

            res.json({ message: "Post unliked successfully" });
        } catch (error) {
            console.error("Error unliking post:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = likesController;
