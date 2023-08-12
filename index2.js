const ethers = require("ethers");
const axios = require("axios");
const { formatUnits } = require("ethers/lib/utils");
const contractAddress = "0x47744B4B94f3C7e692cA2010672ae8a4776F2572";
const contractABI = [
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
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA"
);
const privateKey =
  "46fcb707d3d440ad20741f0e4d722a54817f4641ae4ecdfa6d72f25344130323"; // Replace with your private key
const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);

const contract = new ethers.Contract(contractAddress, contractABI, signer);

contract.on("Transaction", (_productCode, _priceOfTheProduct, event) => {
  console.log("Transaction Event:");
  console.log("Product Code:", _productCode);
  console.log("Price of the Product:", formatUnits(_priceOfTheProduct, 18)); // Assuming 18 decimal places
  console.log("Event Details:", event);
});

// Define a function to handle the "punishment" event
contract.on("punishment", (_punishment, event) => {
  console.log("Punishment Event:");
  console.log("Punishment:", _punishment);
  console.log("Event Details:", event);
});

async function fetchDataFromEtherscan() {
  try {
    const response = await axios.get(
      "https://api.etherscan.io/api?module=account&action=balance&address=" +
        contractAddress +
        "&tag=latest&apikey=9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN"
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  try {
    const dataFromEtherscan = await fetchDataFromEtherscan();
    console.log("Data from Etherscan:", formatUnits(dataFromEtherscan, 18)); // Assuming 18 decimal places

    // Example market address, you will need to replace this with an actual address
    const marketAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

    console.log("Calling checkVault with address:", marketAddress);
    const result = await contract.checkVault(marketAddress); // Calls the function
    console.log("Raw result from checkVault:", result); // Print the raw result
    console.log("Formatted result from checkVault:", formatUnits(result, 18)); // Assuming 18 decimal places
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
