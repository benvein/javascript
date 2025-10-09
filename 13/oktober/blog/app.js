import express from 'express';
import bcrypt from 'bcrypt';
import usersRoutes from './routes/usersRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import cors from "cors";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})