import sql from '../config/db.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json ({
            success: false,
            error: 'Email and password are required'
        });
    }

    try {
        const existingUsers = await sql`SELECT * FROM users WHERE email = ${email}`;
        if(existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                error: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await sql`
            INSERT INTO users (email, password)
            VALUES (${email}, ${hashedPassword})
            RETURNING id
        `;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: result[0].id
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Email and password are required'
        });
    }

    try {
        const users = await sql`SELECT * FROM users WHERE email = ${email}`;
        if(users.length == 0){
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const user = users[0]

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            success: true,
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}