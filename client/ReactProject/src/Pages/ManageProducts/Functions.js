//Filter and sort functions

export const handleFilter = (products, filter) => {
    return products.filter(product => {
        return product.p_categories === filter;
    });
}


export const handleOrder = (products, order) => {
    switch(order){
        case "p_decending": {
            return products.sort((a,b) => (a.p_price < b.p_price) ? 1 : ((b.p_price < a.p_price) ? -1 : 0));
        }
        case "p_ascending": {
            return products.sort((a,b) => (a.p_price > b.p_price) ? 1 : ((b.p_price > a.p_price) ? -1 : 0));
        }
        case "n_ascending": {
            return products.sort((a,b) => (a.p_name > b.p_name) ? 1 : ((b.p_name > a.p_name) ? -1 : 0));
        }
        case "n_decending": {
            return products.sort((a,b) => (a.p_name < b.p_name) ? 1 : ((b.p_name < a.p_name) ? -1 : 0));
        }
        case "i_ascending": {
            return products.sort((a,b) => (a.p_code > b.p_code) ? 1 : ((b.p_code > a.p_code) ? -1 : 0));
        }
        case "i_decending": {
            return products.sort((a,b) => (a.p_code < b.p_code) ? 1 : ((b.p_code < a.p_code) ? -1 : 0));
        }
        default: return;
    }
}