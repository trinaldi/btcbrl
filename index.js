const express = require('express');
const dotenv = require('dotenv').config();
// Unbelievable that node doesn't handle fetchAPI, ffs
const fetch = require('node-fetch');
const dayjs = require('dayjs');
// App related
const app = express();
const router = express.Router();
const port = 3000;


async function getQuote(url='') {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

router.get('/exchange/:from/:to', (req, res, next) => {
  let fiatBaseUrl = `https://openexchangerates.org/api/latest.json?app_id=${process.env.APP_ID}`;
  let cryptoBaseUrl = `https://www.bitstamp.net/api/v2/ticker/`;

  let from = req.params.from.toLowerCase();
  let to = req.params.to.toLowerCase();

  let fiatFullUrl = `${fiatBaseUrl}&${from}&symbols=${to}`;
  let cryptoFullUrl = `${cryptoBaseUrl}btcusd`;
  let fullUrl = (from === 'btc' && to === 'usd') ? cryptoFullUrl : fiatFullUrl;

  // Redirect to MercadoBitcoin to get BTC/BRL exchange
  if(from === 'btc' && to === 'brl') next('route')

  let results = getQuote(fullUrl);

  if(fullUrl.includes("btc")) {
    results.then(data => {
      res.send(data.last);
    })
  } else {
    results.then(data => {
      res.send(data.rates.BRL.toString());
    })
  }

})

router.get('/exchange/:from/:to', (req, res) => {
  let url = 'https://www.mercadobitcoin.net/api/BTC/ticker/'

  let results = getQuote(url);
  results.then(data => {
    res.send(data.ticker.last);
  })

})

app.use('/worthit/:amount', (req, res) => {
  const btcFee = 0.0005;
  let amount = parseFloat(req.params.amount);

  let btcUrl = `https://www.bitstamp.net/api/v2/ticker/btcusd`;
  let btcUsdUrl = `https://openexchangerates.org/api/latest.json?app_id=${process.env.APP_ID}&usd&symbols=brl`;
  let btcBrlUrl = 'https://www.mercadobitcoin.net/api/BTC/ticker/'

  let btcQuote = getQuote(btcUrl);
  let usdQuote = getQuote(btcUsdUrl);
  let brlQuote = getQuote(btcBrlUrl);

  (async function worthIt() {
    let btc = await btcQuote;
    let usd = await usdQuote;
    let brl = await brlQuote;

    let realBtc = parseFloat(amount - btcFee);

    let btcUsd = (realBtc * parseFloat(btc.last)) * parseFloat(usd.rates.BRL);
    let btcBrl = realBtc * parseFloat(brl.ticker.last);

    // Please don't calculate float like this
    // Please
    let diff = btcBrl - btcUsd;

    diff >= 0 ? res.send("1") : res.send("0");
  })()

})

app.use('/', router);


app.listen(port, () => {
  console.info(`App listening at http://localhost:${port}`);
})
