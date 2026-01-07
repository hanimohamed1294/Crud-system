const pool = require('../db');

const table = 'items';

async function getAll() {
  const [rows] = await pool.query(`SELECT * FROM ${table} ORDER BY id DESC`);
  return rows;
}

async function getById(id) {
  const [rows] = await pool.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
  return rows[0];
}

async function create(data) {
  const { name, description } = data;
  const [result] = await pool.query(
    `INSERT INTO ${table} (name, description) VALUES (?, ?)`,
    [name, description]
  );
  return { id: result.insertId, name, description };
}

async function update(id, data) {
  const { name, description } = data;
  await pool.query(
    `UPDATE ${table} SET name = ?, description = ? WHERE id = ?`,
    [name, description, id]
  );
  return getById(id);
}

async function remove(id) {
  await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
}

module.exports = { getAll, getById, create, update, remove };
