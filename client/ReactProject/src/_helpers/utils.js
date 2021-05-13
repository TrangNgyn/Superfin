/*
  Author: Trang Nguyen
  Notes: This file contains utility functions,
    such as the function to round a number to two decimal points
    and format it as a price (e.g. A$100.00)
*/

// function to format a prices
export const formatNumber = ( amount ) => {
    if(!amount) amount = 0.0

    // round to two decimal points
    amount = Math.round((amount + Number.EPSILON) * 100) / 100;

    const numberFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AUD',
      currencyDisplay: 'symbol',
    });

    return numberFormat.format(amount);
  };