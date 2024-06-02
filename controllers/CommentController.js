const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const commentController = {
    // Create a comment
    createComment: async (req, res) => {
        const { post_id, message } = req.body;
        const userId = req.userId;

        try {
            const newComment = await prisma.commentaire.create({
                data: {
                    utilisateur_id: userId,
                    post_id,
                    message,
                },
            });

            res.status(201).json(newComment);
        } catch (error) {
            console.error("Error creating comment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Delete a comment
    deleteComment: async (req, res) => {
        const { id } = req.params;

        try {
            const comment = await prisma.commentaire.findUnique({
                where: { id: parseInt(id) },
            });

            if (!comment) {
                return res.status(404).json({ error: "Comment not found" });
            }

            await prisma.commentaire.delete({
                where: { id: parseInt(id) },
            });

            res.json({ message: "Comment deleted successfully" });
        } catch (error) {
            console.error("Error deleting comment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Get all comments for a specific post
    getAllComments: async (req, res) => {
        const { post_id } = req.params;

        try {
            const comments = await prisma.commentaire.findMany({
                where: { post_id: parseInt(post_id) },
                orderBy: { date_creation: 'desc' },
                include: {
                    utilisateur: {
                        select: { firstname: true, lastname: true }  // Assuming you want to include user details
                    }
                }
            });

            res.json(comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = commentController;
