const fs = require('fs');
const hre = require("hardhat");
const dotenv = require("dotenv");
const ethereumwallet = require("ethereumjs-wallet");
dotenv.config();
var Web3 = require('web3');
const network = process.env.NETWORK;
var web3 = new Web3(new Web3.providers.HttpProvider(network));
const provider = hre.ethers.getDefaultProvider(network);
const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
const abi = JSON.parse(fs.readFileSync("./abi/binanceusdabi.json"));
const busdtAddress = process.env.BUSDT_ADDRESS;
const contract = new hre.ethers.Contract(busdtAddress, abi, signer);
// // const amountToTransfer = "0.0001";
// const escrowWallet = "0x111423FA917A010A4f62c9B2742708744B4CbFc4";
// const receiver = "0xDCa621F4000301AEe463CfEaCC74dDDb35C17127";
// const gvWallet = "0x904969532Dcb469B876fb2c6f6bE32022dda2f5e";

async function main() {
  const ethWallet = ethereumwallet.default.generate();
  const privatekey = ethWallet.getPrivateKeyString();
  const wallet = new hre.ethers.Wallet(privatekey, provider);
  const address = ethWallet.getAddressString();
  console.log("address: ", address);
  console.log("privatekey: ", privatekey);
  // console.log("V3Filename: " + ethWallet.getV3Filename());
  const balancePromise = await wallet.getBalance();
  const divide = 10**18
  const balanceOfGE = parseInt(balancePromise/divide) 
  console.log("Balance of Newly Generated Escrow ---> "+ balanceOfGE + " BNB");
  fs.appendFileSync('./scripts/data.txt', "Address: " + ethWallet.getAddressString() + "\n" + "Private Key: " + ethWallet.getPrivateKeyString() + "\n" + "Balance: " + balanceOfGE + "BNB \n");    
  console.log("Wallet generation over");

//   try {
//     const balanceOfEscrow = await contract.balanceOf(escrowWallet);
//     var balance = (balanceOfEscrow / 10**18).toString();
//     console.log("Balance of Made Escrow ---> ", balance);
//     // const transferAmount = hre.ethers.utils.parseEther(amountToTransfer);
//     // const transfer = await contract.transfer(receiver, transferAmount);
//     // console.log(transfer);
//     // console.log("Transaction Hash ---> ", transfer.hash);
//   }  catch (error) {
//     console.log("Error Message ---> ", error);
//   }

//   try {
//     const escrowPercent = process.env.PROFIT_PERCENT;
//     const mathematical_process = balance*escrowPercent;
//     var escrowAmount = mathematical_process.toString();
//     console.log("Amount for Escrow ----> ", escrowAmount);
//     const escrowProfit = hre.ethers.utils.parseEther(escrowAmount);
//     const transferEscrow = await contract.transfer(gvWallet, escrowProfit);
//     console.log("HOPE ----> ", transferEscrow);
//     console.log("Escrow sent Transaction Hash ----> ", transferEscrow.hash);
//     const getAmount = await web3.eth.getTransaction(transferEscrow.hash)   //await hre.ethers.eth_getTransactionReceipt("0xa7cb308d39939f4c2f31e036418e121d95c95b4031f7e9bfba7856a8afaf5f99")
//     // console.log("Trial ==> ",trial);
//     const hashOfValue = getAmount.input.slice(75)
//     console.log("Hash after slice ----> ", hashOfValue);
//     var decimalAmount = parseInt(hashOfValue,16)
//     const finalAmount = decimalAmount / 10**18
//     console.log("Amount transferred in BUSD ----> " ,finalAmount + ' BUSD');
//     console.log("**********************************************************************************************************************************"); 
//   } catch (error) {
//     console.log("Error from Escrow ----> ", error);
//   }
//   try {
//       const leftValue = (balance - escrowAmount - escrowAmount*0.001).toString();
//       console.log("Amount left after Comission ----> ", leftValue);
//       const receiverAmount = hre.ethers.utils.parseEther(leftValue);
//       const amountofReceiver = await contract.transfer(receiver, receiverAmount);
//       console.log("HOPE2 ===>", amountofReceiver);
//       console.log("Receiver amount HASH ===> ", amountofReceiver.hash);
//       const getAmount = await web3.eth.getTransaction(amountofReceiver.hash)   //await hre.ethers.eth_getTransactionReceipt("0xa7cb308d39939f4c2f31e036418e121d95c95b4031f7e9bfba7856a8afaf5f99")
//       // console.log("Trial ==> ",trial);
//       const hashOfValue = getAmount.input.slice(75)
//       console.log("Hash after slice ----> ", hashOfValue);
//       var decimalAmount = parseInt(hashOfValue,16)
//       const finalAmount = decimalAmount / 10**18
//       console.log("Amount transferred in BUSD ----> " ,finalAmount + ' BUSD');
//     } catch (error) {
//       console.log("Error from the receiver side ---> ", error);
//     }

}
  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
