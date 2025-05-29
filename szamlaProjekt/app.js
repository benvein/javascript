import express from 'express';
import * as db from './util/database.js';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 8080;
const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = __dirname;

app.use(express.static(path.join(root, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(root, "public", "index.html"));
});

app.get('/bills', (req, res) => {
    try {
        const bills = db.getBills();
        res.status(200).json(bills);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.get('/bills/:id', (req, res) => {
    try {
        const bill = db.getBill(req.params.id);
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.status(200).json(bill);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});
app.post('/bills', (req, res) => {
    try {
        const { sellerId, buyerId, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax } = req.body;
        if (!sellerId || !buyerId || !billNumber || !date || !dateOfCompletion || !dueDate || !totalAmount || !tax) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const savedBill = db.saveBill(sellerId, buyerId, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax);
        if (savedBill.changes !== 1) {
            return res.status(501).json({ message: 'Error saving bill' });
        }
        res.status(201).json({ message: 'Bill created successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});
app.put('/bills/:id', (req, res) => {
    try {
        const { sellerId, buyerId, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax } = req.body;
        if (!sellerId || !buyerId || !billNumber || !date || !dateOfCompletion || !dueDate || !totalAmount || !tax) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const updatedBill = db.updateBill(req.params.id, sellerId, buyerId, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax);
        if (updatedBill.changes !== 1) {
            return res.status(501).json({ message: 'Error updating bill' });
        }
        res.status(200).json({ message: 'Bill updated successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});
app.delete('/bills/:id', (req, res) => {
    try {
        const deletedBill = db.deleteBill(req.params.id);
        if (deletedBill.changes !== 1) {
            return res.status(501).json({ message: 'Error deleting bill' });
        }
        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});
app.get('/buyers', (req, res) => {
    try {
        const buyers = db.getBuyers();
        res.status(200).json(buyers);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.get('/buyers/:id', (req, res) => {
    try {
        const buyer = db.getBuyer(req.params.id);
        if (!buyer) {
            return res.status(404).json({ message: 'Buyer not found' });
        }
        res.status(200).json(buyer);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.post('/buyers', (req, res) => {
    try {
        const { name, taxNumber } = req.body;
        if (!name || !taxNumber) {
            return res.status(400).json({ message: 'Name and taxNumber are required' });
        }
        const savedBuyer = db.saveBuyer(name, taxNumber);
        if (savedBuyer.changes !== 1) {
            return res.status(501).json({ message: 'Error saving buyer' });
        }
        res.status(201).json({ message: 'Buyer created successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.put('/buyers/:id', (req, res) => {
    try {
        const { name, taxNumber } = req.body;
        if (!name || !taxNumber) {
            return res.status(400).json({ message: 'Name and taxNumber are required' });
        }
        const updatedBuyer = db.updateBuyer(req.params.id, name, taxNumber);
        if (updatedBuyer.changes !== 1) {
            return res.status(501).json({ message: 'Error updating buyer' });
        }
        res.status(200).json({ message: 'Buyer updated successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.delete('/buyers/:id', (req, res) => {
    try {
        const deletedBuyer = db.deleteBuyer(req.params.id);
        if (deletedBuyer.changes !== 1) {
            return res.status(501).json({ message: 'Error deleting buyer' });
        }
        res.status(200).json({ message: 'Buyer deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.get('/sellers', (req, res) => {
    try {
        const sellers = db.getSellers();
        res.status(200).json(sellers);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.get('/sellers/:id', (req, res) => {
    try {
        const seller = db.getSeller(req.params.id);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.status(200).json(seller);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.post('/sellers', (req, res) => {
    try {
        const { name, taxNumber } = req.body;
        if (!name || !taxNumber) {
            return res.status(400).json({ message: 'Name and taxNumber are required' });
        }
        const savedSeller = db.saveSeller(name, taxNumber);
        if (savedSeller.changes !== 1) {
            return res.status(501).json({ message: 'Error saving seller' });
        }
        res.status(201).json({ message: 'Seller created successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.put('/sellers/:id', (req, res) => {
    try {
        const { name, taxNumber } = req.body;
        if (!name || !taxNumber) {
            return res.status(400).json({ message: 'Name and taxNumber are required' });
        }
        const updatedSeller = db.updateSeller(req.params.id, name, taxNumber);
        if (updatedSeller.changes !== 1) {
            return res.status(501).json({ message: 'Error updating seller' });
        }
        res.status(200).json({ message: 'Seller updated successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.delete('/sellers/:id', (req, res) => {
    try {
        const deletedSeller = db.deleteSeller(req.params.id);
        if (deletedSeller.changes !== 1) {
            return res.status(501).json({ message: 'Error deleting seller' });
        }
        res.status(200).json({ message: 'Seller deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
