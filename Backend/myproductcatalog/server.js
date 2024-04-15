const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config({ path: './db.env' });

const app = express();

app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.get('/api/data', (req, res) => {
  res.json({ message: 'This is a CORS-enabled API!' });
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
app.use(express.json());

console.log('Database Password:', process.env.DB_PASSWORD); 



const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect(err => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});
;




// GET all products
app.get('/products', async (req, res) => {
  const results = await pool.query('SELECT * FROM products');
  res.json(results.rows);
});

// GET one product by id
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const results = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  if (results.rows.length === 0) {
    return res.status(404).send('Product not found');
  }
  res.json(results.rows[0]);
});

// POST create a new product
app.post('/products', async (req, res) => {
  const { name, description, price } = req.body;
  const results = await pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *', [name, description, price]);
  res.status(201).json(results.rows[0]);
});

// PUT update a product
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const results = await pool.query('UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *', [name, description, price, id]);
  if (results.rows.length === 0) {
    return res.status(404).send('Product not found');
  }
  res.json(results.rows[0]);
});

// DELETE a product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const results = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
  if (results.rows.length === 0) {
    return res.status(404).send('Product not found');
  }
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});