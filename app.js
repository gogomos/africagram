const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();


app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/AuthRoutes');
const postRoutes = require("./routes/PostRoutes");
const followerRoutes = require("./routes/FollowerRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const likeRoutes = require("./routes/LikesRoutes");
const profileRoutes = require("./routes/ProfileRoutes");
const statisticsRoutes = require("./routes/StatisticsRoutes");
const UserRoutes = require("./routes/UserRoutes");

app.use("/api/posts", postRoutes)
app.use("/api/followers", followerRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/statistic", statisticsRoutes);
app.use("/api/user", UserRoutes);
app.use('/auth', authRoutes)

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
    console.log(error.stack);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
