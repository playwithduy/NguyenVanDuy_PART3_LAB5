// middleware/auth.js
module.exports = {
    ensureAuth: (req, res, next) => {
        try {
            if (req.session && req.session.userId) {
                return next();
            }
            res.redirect("/auth/login");
        } catch (err) {
            console.error("Auth error:", err);
            res.redirect("/auth/login");
        }
    }
};