export default async function (arr: any): Promise<string> {
    try {
        let finalMessage: string = '';

        arr.forEach((element: any) => {
            let price = parseFloat(element.quote.USD.price).toFixed(2).toLocaleString();
            let currencyItemString = `${element.name.toUpperCase()}: ${price} $`;

            let arrowIcon24h = element.quote.USD.percent_change_24h > 0 ? '\u{2197}' : '\u{2198}';
            let percentChange24h = `24 часа: ${element.quote.USD.percent_change_24h.toFixed(1)}%${arrowIcon24h}`;

            let arrowIcon7d = element.quote.USD.percent_change_7d > 0 ? '\u{2197}' : '\u{2198}';
            let percentChange7d = `7 дней: ${element.quote.USD.percent_change_7d.toFixed(1)}%${arrowIcon7d}`;

            let itemFinalString = `${currencyItemString}\n${percentChange24h} ${percentChange7d}\n`;
            finalMessage += itemFinalString;
        });

        return finalMessage;
    } catch (err) {
        console.error(err);
        return '';
    }
};