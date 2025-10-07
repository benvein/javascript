import express from 'express';
import cors from 'cors';
import postsRoutes from './routes/postsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/posts', postsRoutes);
app.use("/users", usersRoutes);



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
