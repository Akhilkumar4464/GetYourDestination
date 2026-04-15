import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Blacklist from "../models/Blacklist.model.js";


export async function register_user(req, res) {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email, and password"
            });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { name }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // TOKEN
        const token = jwt.sign(
            { id: newUser._id, name: newUser.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // COOKIE (secure)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "strict"
        });

        return res.status(201).json({
            message: "User registered successfully",
            token,
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}


export async function login_user(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
    httpOnly: true,
    secure: false,      // production me true (HTTPS)
    sameSite: "lax"
});
        res.status(200).json({
            message: "Login successful",
            id: user._id,
            name: user.name,
            email: user.email
            , token
        });


    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export async function logout_user(req, res) {
    try {
        const token = req.cookies.token;

        if (token) {
            await Blacklist.create({ token });
        }

        res.clearCookie("token");

        return res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        console.log("LOGOUT ERROR:", error); // 👈 debug ke liye
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export async function get_current_user(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};