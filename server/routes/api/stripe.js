const express = require('express');
const router = express.Router();
const stripe_controller = require('../../controller/stripe');

router.get('/config', stripe_controller.get_stripe_config); // public
router.get('/checkout-session', stripe_controller.get_checkout_session); // public
router.post('/create-checkout-session', stripe_controller.post_create_checkout_session); // public
 