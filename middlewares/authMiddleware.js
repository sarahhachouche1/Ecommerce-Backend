
// const isAdmin = (req, res, next) => {
//     if (req.user.role !== "admin") {
//         return next({ message: 'Access denied, you must be an admin', status: 401 });
//     }
//     next();
// };

// export default {protect,isAdmin};

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            //get user from token
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Check user's role
            const allowedRoles = ['admin', 'user'];
            if (!user.role || !allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export { protect };
