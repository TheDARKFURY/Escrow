const fs = require("fs");
const web3 = require('web3')
const hre = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();
var events = require('events');
// var eventEmitter = new events.EventEmitter();
const network = process.env.NETWORK;
const provider = hre.ethers.getDefaultProvider(network);
const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
const abiJson = JSON.parse(fs.readFileSync("./abi/escrowContractABI.json"));//abiJson
const usdtContractAddress = process.env.BUSDT_ADDRESS;
const contract = new hre.ethers.Contract(usdtContractAddress, abiJson, signer);
const receiver = "0xDCa621F4000301AEe463CfEaCC74dDDb35C17127";
const amount = "0.0001";
const contractAbiJson = JSON.parse(fs.readFileSync("./abi/escrowContractABI.json"));
const transferAmount = hre.ethers.utils.parseEther(amount);
const escrowContractAddress = process.env.ESCROW_CONTRACT_ADDRESS;
const escrowContract = new hre.ethers.Contract(escrowContractAddress, contractAbiJson, signer);
async function main() {
  try {
    // const balance = await contract.balanceOf("0x111423FA917A010A4f62c9B2742708744B4CbFc4");
    // console.log("Balance ==> ",balance / 10**18);
    // const currentBalance = balance / 10**18
    // console.log("2% = " , currentBalance * process.env.PROFIT_PERCENT);
    // var finalTransferToEscrow = currentBalance * (process.env.PROFIT_PERCENT / 100)
    // var finalTransferToReceiver = currentBalance * (process.env.SEND_PERCENT / 100)
    // console.log("Final Transfer to escrow = ",finalTransferToEscrow);
    // console.log("Final Transfer to receiver = ",finalTransferToReceiver);
    // const result = await contract.transfer(receiver, transferAmount);
    const result = await escrowContract.releaseFund(receiver);
    // const logs = await escrowContract.filters.ReleaseFund(receiver)
    // console.log(result);
    // // console.log("HASH ==> ", result.hash);
    // console.log("==> " ,result.value);
    //==========================================
  } catch (error) {
    console.log("Error => ", error);
  }
}
const checkEvents = async() => {
  escrowContract.on('ReleaseFund' , (from , to , hash) => {
    console.log("From ==> ",from)
    console.log("To ==> ",to);
    console.log("Hash ==> ", hash.transactionHash);
    console.log("=====================================================================================");
  })
}
// checkEvents()
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });