const express = require('express');
const { initialData } = require('../../controllers/admin/initialData');
const router = express.Router();

const app = express();

router.post('/initialdata', initialData);

module.exports = router;
