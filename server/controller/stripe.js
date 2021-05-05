const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var empty_field = { 
    succes: false,
    message: "All fields must be filled and present" 
}

const payment_types = ['card', 'paypal', 'alipay'];

class Stripe{
    // @route   GET api/stripe/config
    // @desc    Get Stripe public key
    // @access  Public

    async get_stripe_config(req, res){
        res.send({
            publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
            currency: process.env.CURRENCY,
        });
    }

    // @route   GET api/stripe/checkout-session
    // @desc    Fetch the Checkout Session to display the JSON result on the success page
    // @access  Public

    async get_checkout_session(req, res){
        const { sessionId } = req.query;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        res.send(session);
    }

    // @route   POST api/stripe/create-checkout-session
    // @desc    Create a checkout session with Stripe
    // @access  Public

    async post_create_checkout_session(req,res){
        const domainURL = process.env.DOMAIN;

        const { line_items, c_email } = req.body;

        if(!line_items || !c_email){
            res.send(empty_field);
        }

        var stripe_li = [];
        for(var i = 0; line_items.length; i++){
            stripe_li[i] = {
                price: line_items[i].price_id,
                quantity: line_items[i].quantity,
            };
        }

        // The list of supported payment method types.
        const pmTypes = (payment_types || 'card').split(',').map((m) => m.trim());

        // Create new Checkout Session for the order
        const session = await stripe.checkout.sessions.create({
            payment_method_types: pmTypes,
            mode: 'payment',
            line_items: stripe_li, // array of price_ids and their quantity
            // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
            success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainURL}/canceled.html`,
            customer_email: c_email,
            allow_promotion_codes: true,
            billing_address_collection: required,
        });

        res.send({
            sessionId: session.id,
        });
    }
}

const stripe_controller = new Stripe
module.exports = stripe_controller