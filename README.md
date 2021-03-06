# BTC/BRL: Worth it?

Do you ever wonder if you should keep your BTC abroad or not? Here's the 'answer'.

## Rationale

Some people, like myself, keep their cryptocurrency (BTC, in this case), in an international exchange.
This Node.js service gives you BTC/BRL exchange rate and also FIAT exchange from [Open Exchange Rates](https://openexchangerates.org), you can check their website for a list of tickers.

The idea is, *very basically*, try to *guess* if it's worth to transfer to a Brazilian Exchange, in this case [Mercado Bitcoin](mercadobitcoin.com.br), or not.

**NOTE:** This is not - in any way, shape or form - based on any economical basis. I can't stress this enough, please. This is a Node.js API disguised on a service :)

## Endpoints

`/exchange/:from/:to` - Use Open Exchange API to output FIAT prices. Using `btc`and `brl`as parameters, it will use Mercado Bitcoin's API for the last exchange price.

`/worthit/:amount` - `amount` is the amount of BTC in satoshi - yes, `0.01` is a valid input. This endpoint will output the "worthness" of moving your BTC to Mercado Bitcoin.

## Requirements

  + [Open Exchange Rates](https://openexchangerates.org) `APP_ID` inside a `.env` file.
  + Node.js (Please use the last LTS version, at least).
  + `npm` or `yarn` for the scripts.

## Usage

`npm`/`yarn` to install and run the server. You know the drill.

## WIP

This is a Work In Progress project.
Wanna help? That'd be awesome!

## Again

**NOTE:** This is not - in any way, shape or form - based on any economical basis. I can't stress this enough, please. This is a Node.js API disguised on a service :)
