import express from 'express';
import authRouter from './routes/auth';
//import authenticateToken from './middlewares/auth';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', authRouter);

/* app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Hello ${req.user.username}!`);
});
 */
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
