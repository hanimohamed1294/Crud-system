const Model = require('../models/itemModel');

async function list(req, res) {
  try {
    const items = await Model.getAll();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function get(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await Model.getById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function create(req, res) {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const newItem = await Model.create({
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
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;
    const existing = await Model.getById(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const updated = await Model.update(id, {
      name: name || existing.name,
      description: description ?? existing.description,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function remove(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await Model.getById(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    await Model.remove(id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { list, get, create, update, remove };
