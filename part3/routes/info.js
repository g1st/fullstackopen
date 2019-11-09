const router = require('express').Router();
const info = require('../controllers/info');

router.get('/', info.getInfo);

module.exports = router;
