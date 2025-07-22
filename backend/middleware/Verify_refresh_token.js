const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verify_refresh_token = async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) return res.status(401).send({ error: 'No refresh token' });

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    } catch (e) {
        console.error('JWT verification failed:', e);
        return res.status(401).send({ error: 'Invalid refresh token' });
    }

    const user = await User.findById(decoded.user);
    if (!user) return res.status(403).send({ error: 'User not found' });

    req.user = user;
    next();
};

module.exports = verify_refresh_token;