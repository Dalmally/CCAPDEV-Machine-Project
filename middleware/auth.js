// middleware/auth.js
module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        return next(); // Carry on!
    }
    // Not logged in? Kick them to login
    res.redirect('/login');
};
