import express from "express";
import Authcontroller from "../controllers/auth.controller.js";

const auth_router = express.Router();

/**
 * @route POST api/auth/register
 * @desc Register a new user
 * @access Public
 * 
 * @route POST api/auth/login
 * @desc Login a user and return a JWT token
 * @access Public
 */

auth_router.post("/register", Authcontroller.register_user);

auth_router.post("/login", Authcontroller.login_user);

export default auth_router;