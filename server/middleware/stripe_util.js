const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function stripe_add_product(p_code, p_name, p_price, callback){
    // add product to stripe
    const stripe_product = await stripe.products.create({
        id: p_code,
        name: p_name,
    });

    // create price object
    if(stripe_product){
        stripe.prices.create({
            product: p_code,
            unit_amount: p_price*100,
            currency: 'aud'
        }, (err, stripe_price) => {
            if(err) {
                stripe_delete_product(p_code);
                return callback(new Error(`Error creating price object in Stripe - ${err.message}`))
            }
            return callback(null,{
                price_id: stripe_price.id,
                message: 'Price object created in Stripe'
            });
        })     
    }
    else{
        return callback(new Error('Error creating product object in Stripe'));
    }
}
async function stripe_deactivate_product(p_code, p_price_id){
    // deactivate price
    const price = await stripe.prices.update(
        p_price_id,
        {active: false}
    );

    if(price.active){ // if update fails
        return {success: false,
            message: 'Error deactivating price object'}
    }
    
    //deactivate product
    const product = await stripe.products.update(
        p_code,
        {active: false}
    );

    if(product.active){ // if update fails
        await stripe.prices.update(
            p_price_id,
            {active: false}
        );
        return {success: false,
            message: 'Error deactivating product object.'}
    }

    return {success: true,
        message: 'Product deactivated.'}
}

async function stripe_delete_product(p_code){
    const deleted = await stripe.products.del(p_code);

    if(deleted.deleted){
        console.log("Product deleted from stripe");
    }else{
        console.log(deleted)
    }
}

async function stripe_update_product(p_code, p_name){
    // update product
    const product = await stripe.products.update(
        p_code,
        {
            name: p_name
        }
    );

    if(product) // if update fails
        console.log(product)
}

async function stripe_update_price(p_code, new_p_price, old_p_price_id){
    // create new price associated with the p_code
    const new_price = await stripe.prices.create({
        product: p_code,
        unit_amount: new_p_price*100,
        currency: 'aud',
    });

    if(new_price){
        // deactivate old price
        const old_price = await stripe.prices.update(
            old_p_price_id,
            {active: false}
        );
        if(!old_price.active) // if update fails
            console.log(price)

        return {
            success: true,
            p_price_id: new_price.id,
            message: 'Price object created in Stripe'
        };

    }else{ // if new price's creation fails
        console.log(new_price);
        return {
            success: false,
            message: 'Error creating price object in Stripe'
        };
    }
}

async function stripe_post_charge(req, res) {
    try {
      const { amount, source, receipt_email } = req.body
  
      const charge = await stripe.charges.create({
        amount,
        currency: 'aud',
        source,
        receipt_email
      })
  
      if (!charge) throw new Error('charge unsuccessful')
  
      res.status(200).json({
        message: 'charge posted successfully',
        charge
      })
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
}

module.exports = {
    stripe_add_product,
    stripe_deactivate_product,
    stripe_update_product,
    stripe_update_price,
    stripe_post_charge,
};
