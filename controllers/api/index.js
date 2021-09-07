const router = require('express').Router();
const notesRoutes = require('./notesRoutes');

router.use('/notes', notesRoutes);

module.exports = router;
