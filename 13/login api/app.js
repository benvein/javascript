import express from 'express';
import path from 'path';
import * as db from './util/database.js';
import { fileURLToPath } from 'url';

const port = 8080;
const app = express();
app.use(express.json());

app.get('/users')