export const setUndefinedValues = order => {
    const newOrder = order;
    if(newOrder.items){
        for(let i = 0; i < newOrder.items.lenth; i++){
            if(newOrder.items[i].special_requirements === undefined) newOrder.items[i].special_requirements = "";
        }
    }
    else newOrder.items = [];

    if(newOrder.tracking_number === undefined) newOrder.tracking_number = "";
    if(newOrder.carrier === undefined) newOrder.carrier = "";

    return newOrder;
}