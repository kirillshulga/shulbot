require('dotenv').config();

import superagent from "superagent";
import { IDataCurrency } from './types';

const COINMARKETCAP_API_KEY: string = process.env.API_KEY || '';

export default async function getCurrencyPrice(): Promise<[IDataCurrency]> {
    try {
        const quoteCurrencies: any = await superagent
            .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=400&convert=USD')
            .set('X-CMC_PRO_API_KEY', COINMARKETCAP_API_KEY);

        return quoteCurrencies.body.data;
    } catch (err) {
        console.error(err);
    }
};