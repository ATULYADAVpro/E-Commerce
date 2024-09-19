import jwt from 'jsonwebtoken';
import { CLIENT_SECRET_KEY } from '../../utils/index.js';
const authMiddleware = {
     /* ---------------------> Auth Middleware Logic <---------------------- */
     async auth(req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorised user have not token!'
            })
        }

        try {
            const decoded = jwt.verify(token, CLIENT_SECRET_KEY)
            req.user = decoded;
            // console.log(req.user)
            next()
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Unauthorised user!'
                // message: error.message
            })
        }
    }
}

export default authMiddleware;