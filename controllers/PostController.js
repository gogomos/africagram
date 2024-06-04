const { PrismaClient } = require('@prisma/client');
const cloudinary = require('../config/cloudinary');
const upload = require('../config/multer');
const prisma = new PrismaClient();

const postController = {
    getMyPosts: async (req, res) => {
        const userId = req.userId;

        try {
            const posts = await prisma.post.findMany({
                where: { utilisateur_id: userId },
                orderBy: { date_creation: 'desc' },
            });
            res.json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;

        try {
            const post = await prisma.post.findUnique({
                where: { id: parseInt(id) },
            });
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(post);
        } catch (error) {
            console.error('Error fetching post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createPost: async (req, res) => {
        const userId = req.userId;
        const { caption } = req.body;
        // console.log(req.body);

        try {
            // Call multer middleware to handle file upload
           

                // Check if file is present
                const file = req.file;
                // console.log(file);

                // If file is present, upload to Cloudinary
                let image_url = null;
                if (file) {
                    const result = await cloudinary.uploader.upload(file.path);
                    image_url = result.secure_url;
                }

                // Create new post
                const newPost = await prisma.post.create({
                    data: {
                        utilisateur_id: userId,
                        caption: caption,
                        image_url: image_url,
                        date_creation: new Date(),
                        date_modification: new Date(),
                    },
                });

                res.status(201).json(newPost);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updatePost: async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;
        const { caption } = req.body;
        const { file } = req;

        try {
            const post = await prisma.post.findUnique({
                where: { id: parseInt(id) },
            });

            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            if (post.utilisateur_id !== userId) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            const image = file ? await cloudinary.uploader.upload(file.path) : null;

            const updatedPost = await prisma.post.update({
                where: { id: parseInt(id) },
                data: {
                    caption,
                    image_url: image ? image.secure_url : post.image_url,
                    date_modification: new Date(),
                },
            });

            res.json(updatedPost);
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deletePost: async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;

        try {
            const post = await prisma.post.findUnique({
                where: { id: parseInt(id) },
            });

            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            if (post.utilisateur_id !== userId) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            if (post.image_url) {
                const publicId = post.image_url.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            await prisma.post.delete({
                where: { id: parseInt(id) },
            });

            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = postController;
