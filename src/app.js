require('dotenv').config();
const express = require('express');
const app = express();
const itemRoutes = require('./routes/itemRoutes');

app.use(express.json());
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'CRUD API running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
