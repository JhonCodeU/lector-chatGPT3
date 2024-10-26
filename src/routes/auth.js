import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const users = [];

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username }, 'secret_key');
      res.json({ token });
    } else {
      res.status(401).send('Invalid password');
    }
  } else {
    res.status(401).send('User not found');
  }
});

export default router;
