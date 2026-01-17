const Item = require('../models/itemModel');

async function list(req, res) {
  try {
    const items = await Item.find().sort({ _id: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function get(req, res) {
  try {
    const id = req.params.id;
    // Check if id is valid ObjectId if strictly using Mongo ObjectIds, 
    // but Mongoose often casts or throws if invalid. 
    // For simplicity, we just try to find.
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

async function create(req, res) {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const newItem = await Item.create({
      name,
      description: description || null,
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const updated = await Item.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    const deleted = await Item.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { list, get, create, update, remove };
