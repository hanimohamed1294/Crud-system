require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const app = express();
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');

connectDB();

app.use(express.json());
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'CRUD API running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
