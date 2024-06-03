// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { PrismaClient } = require('@prisma/client');
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const path = require("path");
// dotenv.config();
// const app = express();
// // const prisma = new PrismaClient();
// app.use(cookieParser());
// // app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// //test the connection
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // importing route files
// const authRoutes = require('./routes/AuthRoutes');
// const postRoutes = require("./routes/PostRoutes");
// const followerRoutes = require("./routes/FollowerRoutes");
// const commentRoutes = require("./routes/CommentRoutes");
// const likeRoutes = require("./routes/LikesRoutes");
// const profileRoutes = require("./routes/ProfileRoutes");

// // Mounting the routes
// app.use("/api/posts", postRoutes)
// app.use("/api/followers", followerRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/likes", likeRoutes);
// app.use("/api/profiles", profileRoutes);
// app.use('/auth', authRoutes)

// app.use((error, req, res, next) => {
//     res.status(500).json({ message: error.message });
//     console.log(error.stack);
// });

// const PORT = process.env.PORT;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
dotenv.config();
const app = express();
const prisma = new PrismaClient(); // assuming you're using Prisma

app.use(cookieParser());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/AuthRoutes');
const postRoutes = require("./routes/PostRoutes");
const followerRoutes = require("./routes/FollowerRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const likeRoutes = require("./routes/LikesRoutes");
const profileRoutes = require("./routes/ProfileRoutes");
const newsFeedRoutes = require("./routes/NewsFeedRoutes");
const statisticsRoutes = require("./routes/StatisticsRoutes");

app.get('/addPost', (req, res) => {
    res.render('addPost'); // Assuming you have an 'addPost.ejs' file in your views folder
});
app.get('/login', (req, res) => {
    res.render('login'); // Assuming you have a 'login.ejs' file in your views folder
});
app.get('/register', (req, res) => {
    res.render('register'); // Assuming you have a 'register.ejs' file in your views folder
});

app.use("/api/posts", postRoutes)  
app.use("/api/followers", followerRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/profiles", profileRoutes);
app.use('/auth', authRoutes);
app.use('/newsfeed', newsFeedRoutes);
app.use('/statistics', statisticsRoutes);


app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
    console.log(error.stack);
});

const PORT = process.env.PORT || 3000; // Providing a default port if PORT is not set in environment
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
