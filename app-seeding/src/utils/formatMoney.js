export function formatMoney(value) {
    return Number(value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
};