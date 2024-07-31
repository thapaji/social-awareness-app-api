import express from 'express';
import {
    insertUser,
    getUserByEmail,
    updateUser
} from '../models/UserModel.js';
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from 'uuid';
import { deleteManySession, deleteSession, insertToken } from "../models/SessionModel.js";
// import { emailVerificationMail, emailOTP } from '../utils/mailUtils.js';
import { newUserValidation } from '../middlewares/joiValidation.js';
import { auth } from '../middlewares/auth.js'
import { requestHandler } from '../utils/requestHandler.js';

const router = express.Router();

router.post("/", newUserValidation, async (req, res) => {
    req.body.password = hashPassword(req.body.password);
    const operation = async () => {
        const user = await insertUser(req.body);
        if (user?._id) {
            const token = uuidv4();
            const result = await insertToken({ token, associate: user.email });
            if (result?._id) {
                emailVerificationMail({
                    email: user.email,
                    fName: user.fname,
                    url: `${process.env.FE_ROOT_URL}/verify-user?c=${token}&e=${user.email}`
                });
                return {
                    status: "success",
                    message: "We have sent you an email to verify your account. Please check your inbox/junk and click on the link to verify."
                };
            }
        }
        throw new Error("Unable to create user. Please contact administration.");
    };
    requestHandler(operation, res);
});

router.post('/user-verification', async (req, res) => {
    const { c, e } = req.body;
    const operation = async () => {
        const session = await deleteSession({ token: c, associate: e });
        if (session?._id) {
            const result = await updateUser({ email: e }, { status: 'active', isEmailVerified: true });
            if (result?._id) {
                return { status: 'success', message: 'Your Email has been Verified. You can sign in now.' };
            }
        }
        throw new Error('Invalid link, contact admin.');
    };
    requestHandler(operation, res);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const operation = async () => {
        if (!email.includes('@') || !password) {
            throw new Error('Please provide email and password');
        }
        const user = await getUserByEmail(email);
        if (user?._id) {
            const isMatch = comparePassword(password, user.password);
            if (isMatch) {
                return { status: 'success', message: 'User logged in' };
            }
        }
        throw new Error('Invalid login details');
    };
    requestHandler(operation, res);
});

router.get("/", auth, async (req, res) => {
    const operation = async () => {
        req.userInfo.refreshJWT = undefined;
        return { status: "success", message: "Successfully logged in", user: req.userInfo };
    };
    requestHandler(operation, res);
});

router.get("/new-accessjwt", async (req, res) => {
    const { authorization } = req.headers;
    const operation = async () => {
        const decoded = await verifyRefreshJWT(authorization);
        if (decoded?.email) {
            const user = await getAUser({ email: decoded.email, refreshJWT: authorization });
            if (user?._id) {
                const accessJWT = signAccessToken({ email: decoded.email });
                if (accessJWT) {
                    return { status: "success", message: "Successfully logged in", accessJWT };
                }
            }
        }
        throw new Error("Unauthorized");
    };
    requestHandler(operation, res);
});

router.delete("/logout", auth, async (req, res) => {
    const { email } = req.userInfo;
    const operation = async () => {
        await updateUser({ email }, { refreshJWT: '' });
        await deleteManySession({ associate: email });
        return { status: "success", message: "Logged out successfully" };
    };
    requestHandler(operation, res);
});

router.post("/otp", async (req, res) => {
    const { email } = req.body;
    const operation = async () => {
        const user = await getUserByEmail(email);
        if (user?._id) {
            const token = otpGenerator();
            const session = await insertToken({ token, type: 'otp', associate: email });
            if (session?._id) {
                emailOTP({ token, fName: user.fname, email });
                return { status: "success", message: "If email exists in our system, we have sent you OTP in your email address." };
            }
        }
        return { status: "error", message: "If email exists in our system, we have sent you OTP in your email address." };
    };
    requestHandler(operation, res);
});

export default router;
