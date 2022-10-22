var wallet = require('ethereumjs-wallet');
const fs = require('fs');
function send()
{
    const ethWallet = wallet.default.generate();
    console.log("address: " + ethWallet.getAddressString());
    console.log("privatekey: " + ethWallet.getPrivateKeyString());
    console.log("V3Filename: " + ethWallet.getV3Filename());
    fs.appendFileSync('data.txt', "Address: " + ethWallet.getAddressString() + "\n" + "Private Key: " + ethWallet.getPrivateKeyString() + "\n");
}

setInterval(() => send(), 5000);


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

