const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function stripe_add_product(p_code, p_name, p_image_uri, p_price){
    // add product to stripe
    const stripe_product = await stripe.products.create({
        id: p_code,
        name: p_name,
        images: p_image_uri,
    });

    // create price object
    if(stripe_product){
        const stripe_price = await stripe.prices.create({
            product: p_code,
            unit_amount: p_price*100,
            currency: 'aud',
        });

        if(stripe_price){
            return {success: true,
                price_id: stripe_price.id,
                message: 'Price object created in Stripe'};
        }else{
            await stripe_delete_product(p_code);
            console.log(stripe_price);
            return {success: false,
                message: 'Error creating price object in Stripe'};
        }
            
    }
    else{
        console.log(stripe_product);
        return {success: false,
            message: 'Error creating product object in Stripe'};
    }

}

async function stripe_deactivate_product(p_code, p_price_id){
    // deactivate price
    const price = await stripe.prices.update(
        p_price_id,
        {active: false}
    );
    
    if(!price.active) // if update fails
        console.log(price)

    //deactivate product
    const product = await stripe.products.update(
        p_code,
        {active: false}
    );

    if(!product.active) // if update fails
        console.log(product)
}

async function stripe_delete_product(p_code){
    const deleted = await stripe.products.del(p_code);

    if(deleted.deleted){
        console.log("Product deleted from stripe");
    }else{
        console.log(deleted)
    }
}

async function stripe_update_product(p_code, p_name, p_image_uri){
    // update product
    const product = await stripe.products.update(
        p_code,
        {
            name: p_name,
            images: p_image_uri
        }
    );

    if(product) // if update fails
        console.log(product)
}

async function stripe_update_price(p_code, new_p_price, old_p_price_id){
    // create new price associated with the p_code
    const new_price = await stripe.prices.create({
        product: p_code,
        unit_amount: new_p_price,
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

        return {success: true,
            price_id: new_price.id,
            message: 'Price object created in Stripe'};

    }else{ // if new price's creation fails
        console.log(new_price);
        return {success: false,
            message: 'Error creating price object in Stripe'};
    }
}

async function stripe_create_session(items){
    const session = await stripe.checkout.sessions.create({
        success_url: 'https://superfinpkg.com.au/payment-success',
        cancel_url: 'https://superfinpkg.com.au/payment-cancel',
        payment_method_types: ['card'],
        line_items: items,
        mode: 'payment',
    });
}

module.exports = {
    stripe_add_product,
    stripe_deactivate_product,
    stripe_update_product,
    stripe_update_price,
    stripe_create_session
};

// module.exports = stripe_add_product;
// module.exports = stripe_deactivate_product;