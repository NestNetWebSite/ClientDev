export default function formatNumber(num: number, digits: number): string {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'm' },
        { value: 1e9, symbol: 'g' },
        { value: 1e12, symbol: 't' },
        { value: 1e15, symbol: 'p' },
        { value: 1e18, symbol: 'e' },
    ];

    const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup
        .slice()
        .reverse()
        .find(item => num >= item.value);
    return item ? `${(num / item.value).toFixed(digits).replace(regex, '$1')}${item.symbol}` : '0';
}
