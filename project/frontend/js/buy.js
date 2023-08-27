async function callMethod() {
  const web3 = new Web3(window.ethereum);

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const sender = urlParams.get("wallet");
    const contractAddress = "0xEda8a77ff47e04a544C685445949Ad4BCeFeC673";
    const contractABI = [
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
            internalType: "uint256",
            name: "totalPrice",
            type: "uint256",
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
        stateMutability: "view",
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
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    async function callContractFunction() {
      const productCode = document.getElementById("productCode").value;
      const productPrice = document.getElementById("productPrice").value;
      const productAmount = document.getElementById("productAmount").value;
      hesap = "0x97E7f2B08a14e4C0A8Dca87fbEB1F68b397c91df";

      const functionCallData = contract.methods
        .requestProduct(productAmount, productPrice, productCode, hesap)
        .encodeABI();

      const txData = {
        from: sender,
        to: contractAddress,
        data: functionCallData,
        gas: await contract.methods
          .requestProduct(productAmount, productPrice, productCode, hesap)
          .estimateGas({ from: sender }),
      };

      try {
        const txHash = await web3.eth.sendTransaction(txData);
        console.log("Transaction sent. Transaction hash:", txHash);
      } catch (error) {
        console.error("Error sending transaction:", error);
      }
    }

    callContractFunction();
  } catch (error) {
    console.error("Error requesting accounts:", error);
  }
}

callMethod();
