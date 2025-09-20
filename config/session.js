const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

module.exports = session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 giờ
        httpOnly: true, // chống XSS, cookie chỉ đọc từ server
        secure: false // nếu deploy HTTPS thì để true
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions"
    })
});