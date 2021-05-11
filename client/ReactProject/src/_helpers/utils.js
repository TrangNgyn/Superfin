// export const formatNumber = number => {
//     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' }).format(number);
// }

export const formatNumber = ( amount ) => {
    if(!amount) amount = 0.0

    const numberFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AUD',
      currencyDisplay: 'symbol',
    });
    const parts = numberFormat.formatToParts(amount);
    let zeroDecimalCurrency = true;
    for (let part of parts) {
      if (part.type === 'decimal') {
        zeroDecimalCurrency = false;
      }
    }
    amount = zeroDecimalCurrency ? amount : amount / 100;
    const total = amount.toFixed(2) * 100;
    return numberFormat.format(total);
  };