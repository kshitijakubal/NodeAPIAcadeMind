const express = require('express');
const app = require('../../app');
const router = express.Router();
const orderController = require('../controllers/orders.controller');
const checkAuth = require('../middleware/checkAuth');

router.get('/',checkAuth,orderController.get_all_orders);
router.post('/',checkAuth, orderController.create_order);
router.get('/:id',checkAuth, orderController.get_order_details);
router.patch('/:productId',checkAuth, orderController.patch_order);
router.delete('/:id',checkAuth, orderController.delete_order);


module.exports = router;