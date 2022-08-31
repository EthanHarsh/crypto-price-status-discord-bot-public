/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable semi */
const fetch = require('node-fetch');
const {Client, Intents} = require('discord.js');
const {token} = require('./config.json');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({intents: myIntents});

let tokenSwitch = 'ethereum';

client.on('ready', (ready) => {
  console.log(`Logged in as ${client.user.tag}!`);
  let length = 60000 / 49.5;
  setInterval(() => {
    getAndWritePrice();
  }, length);
  length = 60000 / 2;
  // Change Bot Status with Token Price
  setInterval(() => {
    switch (tokenSwitch) {
      case 'ethereum':
        tokenSwitch = 'fantom';
        console.log(`Token Shift => ${tokenSwitch}`);
        break
      case 'fantom':
        tokenSwitch = 'ethereum'
        console.log(`Token Shift => ${tokenSwitch}`);
        break
    }
  }, length);
});

client.login(token); // login bot using token

// Get Price from CoinGecko API
async function getAndWritePrice() {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cfantom&vs_currencies=usd');
  const {ethereum, fantom} = await response.json();
  setStatus(fantom, ethereum);
}
// Set status of bot on discord server
function setStatus(fantom, ethereum) {
  switch (tokenSwitch) {
    case 'ethereum':
      client.user.setActivity(`ETH: $${ethereum.usd.toFixed(2)}`, {type: 'WATCHING'});
      console.log(`ETH: $${ethereum.usd.toFixed(2)}`);
      break
    case 'fantom':
      client.user.setActivity(`FTM: $${fantom.usd.toFixed(2)}`, {type: 'WATCHING'});
      console.log(`FTM: $${fantom.usd.toFixed(2)}`);
      break
  }
}
