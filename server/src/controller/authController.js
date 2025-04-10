import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  createInstructor,
  createStudent,
  findInstructorByEmail,
  findStudentByEmail,
} from '../models/authModel.js'; // adjust the path if needed

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const generateToken = (user, role) => {
  return jwt.sign({ id: user.id, email: user.email, role }, JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const register = async (req, res) => {
  const { role, name, first_name, last_name, email, password } = req.body;

  if (!role || !email || !password) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (role === 'instructor') {
      if (!name) return res.status(400).json({ message: 'Instructor name is required' });
      newUser = await createInstructor(name, email, hashedPassword);
    } else if (role === 'student') {
      if (!first_name) return res.status(400).json({ message: 'Student first name is required' });
      newUser = await createStudent(first_name, last_name, email, hashedPassword);
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const token = generateToken(newUser, role);
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    let user;

    if (role === 'instructor') {
      user = await findInstructorByEmail(email);
    } else if (role === 'student') {
      user = await findStudentByEmail(email);
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) return res.status(404).json({ message: `${role} not found` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = generateToken(user, role);
    res.status(200).json({ user, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
