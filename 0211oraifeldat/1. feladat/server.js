import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello üdvözöllek a weboldalamon.");
})


app.listen(3003, () => {
    console.log('server runs on port 3003');
});