import express from 'express';
import usersRoutes from './routes/usersRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import cors from "cors";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);




app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})