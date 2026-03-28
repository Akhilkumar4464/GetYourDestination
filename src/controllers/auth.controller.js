import User from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function register_user(req, res) {
    const { name, email, password } = req.body;
    try {


        if (!name || !email || !password) {
            res.status(400).json({ message: "Please provide name, email, and password" });
            return;
        }
        const existingUser = await User.findOne(
            {
                $or: [{ email }, { name }]
            }
        );
        if (existingUser) {
            return res.status(400).json({ message: "User with this email or username already exists" });
        }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name , email , password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
 
  const token =   jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(201).json({ message: "User registered successfully", token });

    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
