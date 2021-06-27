const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// function to add new product and price to stripe database
async function stripe_add_product(p_code, p_name, p_price, callback){

    // could try and create first and if it throws an error on the create that is product already exists
    // could then instead set it to active and assign the new price instead of searching first 
    // it would prevent an unneccessary potential entire collection search from occuring before the system 
    // even attempts to add a price and a new product.


    // attempt to find the product 
    stripe.products.retrieve(p_code,(err,product) => {
        // this is really really bad and should be done differently - Ollie
        let con = true
        // if error is thrown check if it is the product not found error 
        if(err) {
            if(err.message == `No such product: '${p_code}'`)
                con = false
            else   
                return callback(new Error(`Error searching for product object in stripe - ${err.message}`))

        }
        // if con is still true update the found product to active and create a new price for the product 
        if(con) {
            stripe.products.update(p_code,{active: true},(err,reactiveated_product) => {
                if(err)
                    return callback(new Error(`Error reactivating product object in Stripe - ${err.message}`))
                // attempt to create a price object and link it to the updated product
                stripe.prices.create({
                    product: reactiveated_product.id,
                    unit_amount: Math.round(p_price*100),
                    currency: 'aud'
                },(err, stripe_price) => {
                    if(err) {
                        stripe_delete_product(p_code);
                        return callback(new Error(`Error creating price object in Stripe - ${err.message}`))
                    }
                    // return price object id in the callback
                    return callback(null,{
                        price_id: stripe_price.id,
                        message: 'Price object created in Stripe'
                    });
                })
            })
        }
        // if con is no longer true (i.e. the product doesn't alread exist) then create a new product and new 
        // price and assign it to the price 
        else {
            // create a new product in stripe
            stripe.products.create({
                id: p_code,
                name: p_name,
            },(err,stripe_product) => {
                if(err) {
                    return callback(new Error(`Error creating product object in Stripe - ${err.message}`))
                }
                // create price object in stripe
                stripe.prices.create({
                        product: stripe_product.id,
                        unit_amount: Math.round(p_price*100),
                        currency: 'aud'
                    }, (err, stripe_price) => {
                        if(err) {
                            // delete the newly created product if the price creation fails
                            stripe_delete_product(p_code);
                            return callback(new Error(`Error creating price object in Stripe - ${err.message}`))
                        }
                        // return price object id in the callback
                        return callback(null,{
                            price_id: stripe_price.id,
                            message: 'Price object created in Stripe'
                        });
                    })     
            });
        }
    })
}

// function to deactiveate products and any matching price associated with them 
async function stripe_deactivate_product(p_code, p_price_id, callback){
    
    // updatea price object setting it to false
    stripe.prices.update(p_price_id,{active: false}, (err) => {
        if(err)
            return callback(new Error(`Error updating price on stripe - ${err.message}`))
        // update a product object setting it to false
        stripe.products.update(p_code, {active: false}, (err) => {
            if(err)
                return callback(new Error(`Error updating product on stripe - ${err.message}`))
            return callback(null)
        })
    })

    // promise solution that could be implemented instead 
    // const pending = Promise.all([
    //     stripe.prices.update(
    //         p_price_id,
    //         {active: false}
    //     ),
    //     stripe.products.update(
    //         p_code,
    //         {active: false}
    //     )
    // ])

    // const [price, product ] = await pending
    // return {success: true,
    //         message: 'Product deactivated.'}
}

// this is never called 
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

// function to update the price of a stripe objet 
async function stripe_update_price(p_code, new_p_price, old_p_price_id, callback){
    // create new stripe price object
    stripe.prices.create({
        product: p_code,
        unit_amount: new_p_price*100,
        currency: 'aud'
    }, (err, new_price) => {
        // if there is an error in creating the object return that error in the callback
        if(err) 
            return callback(new Error(`Error creating price object in Stripe - ${err.message}`))
        // if there is no error attempt to update the price object stored on stripe to be deactivated
        stripe.prices.update(old_p_price_id,{active:false},(err,old_price)=>{
            if(err)
                return callback(new Error(`Error updating price object in Stripe - ${err.message}`))
            // return the created price object id to the callback
            return callback(null, {
                p_price_id: new_price.id,
                message: 'Price object created in Stripe'
            })
        })
    })
}

// function to post a charge to stripe
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
