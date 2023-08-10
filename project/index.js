const { ethers } = require("ethers");
const axios = require("axios");

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_productCode",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_priceOfTheProduct",
        type: "uint256",
      },
    ],
    name: "Transaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "_punishment",
        type: "bool",
      },
    ],
    name: "punishment",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "moneyAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "addMoney",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "priceOfTheProduct",
        type: "uint256",
      },
    ],
    name: "buyProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "checkVault",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "checkdept",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "dept",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "penaltyFee",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "guiltyAddress",
        type: "address",
      },
    ],
    name: "punish",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "s_priceOfTheProduct",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_productCode",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_productCode",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_priceOfTheProduct",
        type: "uint256",
      },
    ],
    name: "transaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "vault",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const alchemyUrl =
  "https://eth-sepolia.g.alchemy.com/v2/AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA";
const privateKey =
  "46fcb707d3d440ad20741f0e4d722a54817f4641ae4ecdfa6d72f25344130323";
const contractAddress = "0x47744B4B94f3C7e692cA2010672ae8a4776F2572";
const etherscanApiKey = "9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN";

const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);
const iface = new ethers.utils.Interface(abi);

const transactionTopic = iface.getEventTopic("Transaction");
const punishmentTopic = iface.getEventTopic("punishment");

function handleLogs(response, contract) {
  if (response.data.status !== "1") {
    console.error("Error fetching logs from Etherscan:", response.data.message);
    return;
  }

  const logs = response.data.result;

  if (!logs || logs.length === 0) {
    console.log("No logs found for the specified criteria.");
    return;
  }

  logs.forEach((log) => {
    const formattedLog = {
      topics: log.topics,
      data: log.data,
    };

    const parsedLog = contract.interface.parseLog(formattedLog);
    console.log("Parsed event:", parsedLog);
  });
}

const urlTransaction = `https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${contractAddress}&topic0=${transactionTopic}&apikey=${etherscanApiKey}`;
axios
  .get(urlTransaction)
  .then((response) => handleLogs(response, contract))
  .catch((error) => {
    console.error("Error fetching logs from Etherscan:", error.message);
  });

const urlPunishment = `https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${contractAddress}&topic0=${punishmentTopic}&apikey=${etherscanApiKey}`;
axios
  .get(urlPunishment)
  .then((response) => handleLogs(response, contract))
  .catch((error) => {
    console.error("Error fetching logs from Etherscan:", error.message);
  });
