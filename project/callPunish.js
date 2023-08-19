// Import ethers and Hardhat dependencies
const { ethers } = require("ethers");

async function main() {
  // Connect to your Ethereum provider (replace with your provider URL)
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA"
  );

  // Replace with your contract address
  const contractAddress = "0xA8f028C5F0F16eF5Fdb188DF393AAccde1C72D18";

  // Replace with your contract ABI (use the ABI of your deployed contract)
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

  // Replace with your wallet's private key
  const privateKey =
    "46fcb707d3d440ad20741f0e4d722a54817f4641ae4ecdfa6d72f25344130323";

  // Create a wallet from the private key
  const wallet = new ethers.Wallet(privateKey, provider);

  // Create a contract instance with the wallet as the signer
  const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

  // Replace the following with actual values for your function parameters
  const parameter1Value = 3; // Replace with the first parameter value
  const parameter2Value = "0x7EFd0B777026A9c42757d92A3f79361467372435"; // Replace with the second parameter value

  // Call the punish function with the two parameters
  try {
    const tx = await contract.punish(parameter1Value, parameter2Value, {
      gasLimit: 200000,
    });
    await tx.wait();
    console.log("Transaction successful!");
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
