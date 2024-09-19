/* =========== IMPORTING ============ */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User.js';
import { CLIENT_SECRET_KEY } from '../../utils/index.js';

const authController = {
    /* ---------------------> Register Logic <---------------------- */
    async registerUser(req, res) {
        const { username, email, password } = req.body; // Ensure password exists in req.body
        try {

            // Check if all required fields are provided
            if (!username || !email || !password) {
                console.log({ username, email, password })
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const checkUser = await User.findOne({ email })
            if (checkUser) {
                return res.json({ success: false, message: 'Already have register' })
            }

            // Hash password using bcrypt with salt rounds
            const saltRounds = 10; // You can change this number if needed
            const hashPassword = bcrypt.hashSync(password, saltRounds);

            // Create a new user instance
            const newUser = new User({ username, email, password: hashPassword });
            await newUser.save();

            res.status(200).json({
                success: true,
                message: "Registration Successful"
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Some error occurred"
            });
        }
    },
    /* ---------------------> Login Logic <---------------------- */
    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            // login logic here
            const checkUser = await User.findOne({ email })
            if (!checkUser) {
                return res.json({ success: false, message: "User doesn't exists! Please register" })
            }

            const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
            if (!checkPasswordMatch) {
                return res.json({ success: false, message: "Invaild details check email and password" })
            }
            // create || sign jsonwebtoken ==> created!
            const token = jwt.sign({
                id: checkUser._id, role: checkUser.role, email: checkUser.email
            }, CLIENT_SECRET_KEY, { expiresIn: '60m' })
            //===> store cookie <===
            res.cookie('token', token, { httpOnly: true, secure: false }).json({
                success: true,
                message: 'Logged In successfully',
                user: {
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser._id,
                }
            })

        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Some error occurred"
            });
        }
    },
    /* ---------------------> LoginOut Logic <---------------------- */
    async loginOutUser(req, res) {
        res.clearCookie('token').json({
            success: true,
            message: 'Logged out successfull'
        })
    },

    /* ---------------------> Check User Auth Logic <---------------------- */
    async checkUser(req, res) {
        const user = req.user;
        
        res.status(200).json({
            success: true,
            message: 'Authenticated user',
            user
        })
    }

};

export default authController;
