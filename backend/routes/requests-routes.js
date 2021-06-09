const express = require('express');

const requestsController = require('../controllers/requests-controller');

const router = express.Router();

router.get('/:uid', requestsController.getIsApproved);

router.post('/', requestsController.createRequest);

module.exports = router;
