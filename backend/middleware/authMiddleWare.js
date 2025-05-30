import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';
import asyncHandler from './AsyncHandler.js';

// Protect routes (authenticated users)
const authenticated = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Try to get token from cookie
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    // 2. Otherwise try Authorization header (Bearer token)
    else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.userId).select('-password');

        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized, user not found');
        }

        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});

// Check for admin user
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};

export { authenticated, authorizeAdmin };
