var ethereumwallet = require('ethereumjs-wallet');
const fs = require('fs');
// const web3 = require('web3');
const ethers = require('ethers');
const network = 'https://bsc-dataseed.binance.org/'
const provider = ethers.getDefaultProvider(network)
async function send()
{
    const ethWallet = ethereumwallet.default.generate();
    console.log("address: " + ethWallet.getAddressString());
    console.log("privatekey: " + ethWallet.getPrivateKeyString());
    console.log("V3Filename: " + ethWallet.getV3Filename());
    const pvtKey = ethWallet.getPrivateKeyString();
    const wallet = new ethers.Wallet(pvtKey, provider);
    const balancePromise = await wallet.getBalance();
    const divide = 1000000000000000000
    const balance = parseInt(balancePromise/divide) 
    console.log("Balance --> "+ balance + " BNB");
    fs.appendFileSync('data.txt', "Address: " + ethWallet.getAddressString() + "\n" + "Private Key: " + ethWallet.getPrivateKeyString() + "\n" + "Balance: " + balance + "BNB \n");
    
}

setInterval(() => send(), 2000);


// WALLET CREATTION USING WEB3 AND  JS

// const Web3API = require('web3');
// const main = () => {
// const web3 = new Web3API(new Web3API.providers.HttpProvider('https://mainnet.infura.io'));
// let account = web3.eth.accounts.create(web3.utils.randomHex(32));
// let wallet = web3.eth.accounts.wallet.add(account);
// let keystore = wallet.encrypt(web3.utils.randomHex(32));
// console.log({
// account: account,
// wallet: wallet,
// keystore: keystore
// });
// };
// main();

