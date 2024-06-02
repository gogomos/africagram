const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
// const prisma = new PrismaClient();


app.use(cors());
app.use(express.json());
// importing route files
const authRoutes = require('./routes/AuthRoutes');
const postRoutes = require("./routes/PostRoutes");
const followerRoutes = require("./routes/FollowerRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const likeRoutes = require("./routes/LikesRoutes");
const profileRoutes = require("./routes/ProfileRoutes");

// Mounting the routes
app.use("/api/posts", postRoutes)
app.use("/api/followers", followerRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/profiles", profileRoutes);
app.use('/auth', authRoutes)

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
    console.log(error.stack);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
