const Web3 = require("web3"); // Import the Web3 library
const HDWalletProvider = require("@truffle/hdwallet-provider"); // Import a provider for handling wallets
const contractAbi = [
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
        internalType: "uint256",
        name: "amountOfProduct",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "addressOfProduct",
        type: "address",
      },
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
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
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkRequested",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "canSell",
        type: "bool",
      },
    ],
    name: "RequestCanSell",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOfProduct",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_priceOfTheProduct",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_productCode",
        type: "address",
      },
      {
        internalType: "address",
        name: "_marketAddress",
        type: "address",
      },
    ],
    name: "transaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_amountOfProduct",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_priceOfTheProduct",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_productCode",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_marketAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_contractAddress",
        type: "address",
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
        internalType: "uint256",
        name: "_amountOfProduct",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_priceOfTheProduct",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_productCode",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_marketAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "buyRequest",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestCanSell",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "_canSell",
        type: "bool",
      },
    ],
    name: "fulfillCanSell",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "requestCanSell",
    outputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOfProduct",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "addressOfProduct",
        type: "address",
      },
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "requestProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "canSell",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
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
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "s_marketAddress",
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

const privateKey =
  "46fcb707d3d440ad20741f0e4d722a54817f4641ae4ecdfa6d72f25344130323"; // Replace with your private key
const alchemyUrl =
  "https://eth-sepolia.g.alchemy.com/v2/AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA"; // Replace with your Alchemy URL
const contractAddress = "0x4Be6D9d2785cb33C3ea03084506a35aa274b53B5"; // Replace with your contract's address
const senderAddress = "0x7EFd0B777026A9c42757d92A3f79361467372435"; // Replace with the address from which you want to send the transaction

// Create a web3 instance with your Alchemy URL
const provider = new HDWalletProvider(privateKey, alchemyUrl);
const web3 = new Web3(provider);

// Create a contract instance
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Function to call the punish function in your contract
async function callPunishFunction(penaltyFee, guiltyAddress) {
  try {
    const gasPrice = "20000000000"; // Replace with your desired gas price (in wei)
    const gasLimit = "210000"; // Replace with your desired gas limit

    // Send a transaction to call the punish function with parameters
    const tx = await contract.methods.punish(penaltyFee, guiltyAddress).send({
      from: senderAddress,
      gasPrice: gasPrice,
      gas: gasLimit,
    });

    console.log("Transaction hash:", tx.transactionHash);
    console.log("Punish function called successfully!");
  } catch (error) {
    console.error("Error calling punish function:", error);
  } finally {
    provider.engine.stop(); // Stop the provider when done
  }
}

// Define the parameters for the punish function
const penaltyFee = "3"; // Replace with the actual penalty fee (uint256) you want to send
const guiltyAddress = "0x7EFd0B777026A9c42757d92A3f79361467372435"; // Replace with the actual guilty address (address) you want to send

// Call the punish function with parameters
callPunishFunction(penaltyFee, guiltyAddress);
