const express = require('express');

const requestsController = require('../controllers/requests-controller');

const router = express.Router();

router.get('/:uid', requestsController.getRequestDataByUserId);

router.get('/:uid/isApproved', requestsController.getIsApproved);

router.post('/', requestsController.createRequest);

router.patch('/:uid', requestsController.updateRequest);

module.exports = router;
