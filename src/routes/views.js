const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');

router.get('/', viewsController.getViewsByTable);
router.post('/', viewsController.createView);
router.post('/columns', viewsController.addColumnToView);
router.get('/columns', viewsController.getColumnsByView);
router.delete('/:id', viewsController.deleteView);

module.exports = router;
