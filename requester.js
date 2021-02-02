"use strict";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

const superagent = require("superagent");

exports.getQuoteCurrency = async() => {
    try {
        const quoteCurrencies = await superagent
            .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20&convert=USD')
            .set('X-CMC_PRO_API_KEY', process.env.API_KEY);
        
        return quoteCurrencies;

    } catch (err) {
        console.error(err);
        return null;
    }
    
}
