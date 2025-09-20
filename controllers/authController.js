const User = require("../models/User");

exports.getRegister = (req, res) => {
    res.render("register");
};

exports.postRegister = async(req, res) => {
    const { username, email, phone, password } = req.body;
    try {
        const user = new User({ username, email, phone, password });
        await user.save();
        res.redirect("/auth/login");
    } catch (err) {
        res.send("Register error: " + err.message);
    }
};

exports.getLogin = (req, res) => {
    res.render("login");
};

exports.postLogin = async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.send("Invalid credentials");
        }
        req.session.userId = user._id;
        req.session.user = user;
        res.redirect("/");
    } catch (err) {
        res.send("Login error: " + err.message);
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login");
    });
};