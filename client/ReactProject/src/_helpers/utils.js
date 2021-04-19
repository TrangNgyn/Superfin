export const formatNumber = number => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' }).format(number);
}
