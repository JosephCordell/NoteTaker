const router = require('express').Router();

// "/notes" responds with the notes.html file
router.get('/notes', (req, res) => {
    res.render('notes');
  });
  
  // All other routes respond with the index.html file
  router.get('/', (req, res) => {
    res.render('home');
  });
  
  module.exports = router;