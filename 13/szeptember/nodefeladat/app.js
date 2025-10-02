import express from 'express';

const PORT = 3001;

const app = express();
app.use(express.json());

let cars = [
    { id: 1, brand: 'Honda', model: 'civic' },
    { id: 2, brand: 'Volvo', model: 'S80' },
    { id: 3, brand: 'Skoda', model: 'Octavia' },
];

app.get('/cars', (req, res) => {
    res.status(200).json(cars);
});

app.get('/cars/:id', (req, res) => {
    const id = +req.params.id;
    const car = cars.find((car) => car.id === id);
    if (!car) {
        return res.status(404).json({ message: 'car not found' });
    }
    res.status(200).json(car);
});

app.post('/cars', (req, res) => {
    const { brand, model } = req.body;
    if (!brand || !model) {
        res.status(400).json({ message: 'Invalid credentials' });
    }

    const id = cars[cars.length - 1]?.id + 1 || 1;
    const car = { id, brand, model };

    cars.push();

    res.status(201).json(car);
});

app.put('/cars/:id', (req, res) => {
    const id = +req.params.id;
    let car = cars.find((car) => car.id === id);

    if (!car) {
        return res.status(404).json({ message: 'car not found' });
    }

    const { brand, model } = req.body;
    if (!brand || !model) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const index = cars.indexOf(car);
    car = { ...car, brand, model };
    cars[index] = car;
    res.status(200).json(car);
});

app.delete('/cars/:id', (req, res) => {
    const id = +req.params.id;
    const car = cars.find((car) => car.id === id);
    if (!car) {
        return res.status(404).json({ message: 'car not found' });
    }
    const index = cars.indexOf(car);
    cars.splice(index, 1);
    res.status(200).json({ message: 'car deleted' });
});

app.listen(PORT, () => {
    console.log('server runs on http://localhost:' + PORT);
});
