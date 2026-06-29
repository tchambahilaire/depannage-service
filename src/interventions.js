const express = require('express');
const router = express.Router();
const interventionController = require('../controllers/interventionController');
const auth = require('../middleware/auth');

router.post('/create', auth, interventionController.createIntervention);
router.post('/accept', auth, interventionController.acceptIntervention);

module.exports = router;
