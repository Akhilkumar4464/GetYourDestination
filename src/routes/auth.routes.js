import express from "express";
import { register_user, login_user  , logout_user} from "../controllers/auth.controller.js";

const auth_router = express.Router();

/**
 * @route POST api/auth/register
 * @desc Register a new user
 * @access Public
 * 
 * @route POST api/auth/login
 * @desc Login a user and return a JWT token
 * @access Public
 * 
 * @route GET api/auth/logout
 * @desc Logout a user and invalidate the JWT token
 * @access Public
 */

auth_router.post("/register", register_user);

auth_router.post("/login", login_user);

auth_router.get("/logout", logout_user);

export default auth_router;