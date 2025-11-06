const express = require('express');
const { admin, protect } = require('../middleware/authMiddleware');
const { getUsers, deleteUser, getStats } = require('../controllers/aiController'); // Admin methods exported from aiController for simplicity

const router = express.Router();

// All routes here require admin access
router.use(protect, admin);

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/stats', getStats);

module.exports = router;