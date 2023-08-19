const express = require("express");
const axios = require("axios");
const { scheduleJob } = require("node-schedule");
const { ethers } = require("ethers");

const app = express();
const port = 5000;

const hashMapOfProducts = {
  "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266": 1,
  "0xAnotherProductAddressHere": 2,
  "0xAnotherProductAddressHere2": 3,
};

const marketAddresses = [
  [
    "0x7EFd0B777026A9c42757d92A3f79361467372435",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    40,
    10,
  ],
  ["0xNewMarketAddress1Here", "0xNewProductAddress1Here", 50, 15],
  ["0xNewMarketAddress2Here", "0xNewProductAddress2Here", 60, 20],
];

const exampleHashMap = marketAddresses.reduce((acc, address) => {
  acc[address[0]] = [address[1], address[2], address[3]];
  return acc;
}, {});

let apiDataCounter = 0;

const url =
  "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xdcC4796AFD0c1F5f3adF07eD4008462E70d4b948&api_key=9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN";

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA"
);

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
  "46fcb707d3d440ad20741f0e4d722a54817f4641ae4ecdfa6d72f25344130323";

const getProductInfo = async () => {
  try {
    const response = await axios.get(url);
    const result = response.data.result;

    if (result && result.length > apiDataCounter) {
      const resultItem = result[apiDataCounter];
      if (typeof resultItem === "object") {
        const topics = resultItem.topics;
        apiDataCounter = result.length - 1;

        if (topics.length !== 2) {
          const contractAddress = result[apiDataCounter].address;
          const sellingPrice = Math.floor(
            parseInt(topics[2], 16) / parseInt(topics[1], 16)
          );

          const productCode = "0x" + topics[3].slice(-40);
          let needPunish = false;

          const realPrice = hashMapOfProducts[productCode.toLowerCase()];
          const marketAddress = result[apiDataCounter].data.slice(26, 66);
          const topics2 = result[apiDataCounter].topics;
          const buyerAddress = result[apiDataCounter].data.slice(26, 66);
          const wantedProductAddress = "0x" + topics2[3].slice(-40);
          const wantedAmountOfProduct = parseInt(topics2[1], 16);
          const theMoneyToBuy = parseInt(topics2[2], 16);

          const dataOfMarket =
            exampleHashMap["0x7EFd0B777026A9c42757d92A3f79361467372435"];
          const codeOfProductFromMarket = dataOfMarket[0];
          let currentStock = dataOfMarket[1];
          let punishAmount = dataOfMarket[2];

          if (realPrice < sellingPrice) {
            needPunish = true;
            punishAmount += 10;
          }

          if (!needPunish) {
            currentStock -= parseInt(topics[1], 16);
          }

          let canSell = false;

          if (
            currentStock >= wantedAmountOfProduct &&
            theMoneyToBuy >=
              wantedAmountOfProduct *
                hashMapOfProducts[wantedProductAddress.toLowerCase()] &&
            codeOfProductFromMarket.toLowerCase() ===
              wantedProductAddress.toLowerCase()
          ) {
            canSell = true;
            currentStock += wantedAmountOfProduct;
          }
          const wallet = new ethers.Wallet(privateKey, provider);
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            wallet
          );

          try {
            const tx = await contract.punish(punishAmount, marketAddress, {
              gasLimit: 200000,
            });
            await tx.wait();
            console.log("Transaction successful!");
          } catch (error) {
            console.error("Error:", error);
          }

          console.log("api data counter " + apiDataCounter);
          console.log("contract Address " + contractAddress);
          console.log("selling price " + sellingPrice);
          console.log("product code " + productCode);
          console.log("real price " + realPrice);
          console.log("market address " + marketAddress);
          console.log("buyer address " + buyerAddress);
          console.log("wanted product address " + wantedProductAddress);
          console.log("wanted amount of product " + wantedAmountOfProduct);
          console.log("the money to buy " + theMoneyToBuy);
          console.log("code of product from market " + codeOfProductFromMarket);
          console.log("current stock " + currentStock);
          console.log("punish amount " + punishAmount);
          console.log("need punish " + needPunish);
          console.log("contract address " + contractAddress);

          return {
            productCode,
            realPrice,
            sellingPrice,
            marketAddress,
            buyerAddress,
            wantedProductAddress,
            wantedAmountOfProduct,
            theMoneyToBuy,
            canSell,
            punishAmount,
            needPunish,
            contractAddress,
          };
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      productCode: null,
      realPrice: null,
      sellingPrice: null,
      marketAddress: null,
      buyerAddress: null,
      wantedProductAddress: null,
      wantedAmountOfProduct: null,
      theMoneyToBuy: null,
      canSell: false,
      punishAmount: null,
      needPunish: false,
      contractAddress: null,
    };
  }
};

const scheduledProductInfo = () => {
  getProductInfo();
  console.log("Updated product info");
};

app.get("/api/products", async (req, res) => {
  try {
    const {
      productCode,
      realPrice,
      sellingPrice,
      marketAddress,
      buyerAddress,
      wantedProductAddress,
      wantedAmountOfProduct,
      theMoneyToBuy,
      canSell,
      punishAmount,
      needPunish,
      contractAddress,
    } = await getProductInfo();

    if (productCode) {
      const productInfo = {
        addressOfProduct: productCode,
        realPrice,
        sellingPrice,
        marketAddress: marketAddress.toString(),
        buyerAddress,
        wantedProductAddress,
        wantedAmountOfProduct,
        theMoneyToBuy,
        canSell,
        punishAmount,
        needPunish,
        contractAddress: contractAddress.toString(),
      };
      res.json([productInfo]);
    } else {
      res.status(400).json({ error: "No product found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Schedule the job to update the product info every 30 seconds
scheduleJob("*/30 * * * * *", scheduledProductInfo);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
