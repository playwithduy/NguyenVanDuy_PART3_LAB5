const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const sessionConfig = require("./config/session");
const User = require("./models/User");
const app = express();

// Middleware parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(sessionConfig);

// Gắn user từ session vào res.locals
app.use(async(req, res, next) => {
    try {
        if (req.session.userId) {
            const user = await User.findById(req.session.userId);
            res.locals.user = user || null;
        } else {
            res.locals.user = null;
        }
    } catch (err) {
        console.error("Error fetching user:", err);
        res.locals.user = null;
    }
    next();
});

// Đảm bảo session luôn có trong view
app.use((req, res, next) => {
    res.locals.session = req.session || {};
    // ✅ Đảm bảo luôn tồn tại biến user
    if (typeof res.locals.user === "undefined") {
        res.locals.user = null;
    }
    next();
});

// Static & View engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Layout middleware
app.use(expressLayouts);
app.set("layout", "layout"); // layout.ejs trong /views

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/suppliers", require("./routes/suppliers"));

// DB connect & Start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        );
    })
    .catch((err) => console.error("MongoDB connection error:", err));