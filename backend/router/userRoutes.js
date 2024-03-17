const { test } = require('../controller/user.controller');

const router = require('express').Router();

router.get('/', test)

module.exports = router;