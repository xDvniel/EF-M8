const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/dashboard-client', (req, res) => {
  res.render('dashboard');
});

module.exports = router;