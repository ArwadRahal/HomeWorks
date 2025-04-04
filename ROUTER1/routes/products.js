// ארואד רחאל 213481963
// אימאן זייד 322793589

const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
// GET /api/products
router.get('/', (req, res) => {
  res.json({ products: data.products });
});
// GET /api/products/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = data.products.find(item => item.id === parseInt(id));
  if (product) res.json(product);
  else res.status(404).json({ message: `Product with ID: ${id} not found` });
});
// POST /api/products
//add products (body data)
router.post('/', (req, res) => {
  const productData = req.body;
  if (
    productData.id === undefined ||
    !productData.name ||
    productData.price === undefined
  ) {
    return res.status(400).json({ message: 'Missing required fields: id, name, price' });
  }
  const exists = data.products.find(item => item.id === productData.id);
  if (exists) {
    return res.status(400).json({ message: `Product with ID: ${productData.id} already exists` });
  }
  data.products.push(productData);
  res.json({ message: `Product added`, products: data.products });
});
// PUT /api/products/:id
//update product by id (path param + body data)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  const productInd = data.products.findIndex(item => item.id === parseInt(id));
  if (productInd !== -1) {
    productData.id = parseInt(id);
    data.products[productInd] = productData;
    res.json({ message: `Product with ID: ${id} updated`, products: data.products });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
});

// DELTE /api/products
//delete product by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const productInd = data.products.findIndex(item => item.id === parseInt(id));
  
  if (productInd !== -1) {
    data.products.splice(productInd, 1);
    res.json({ message: `Product with ID: ${id} deleted`, products: data.products });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
});
module.exports = router;
