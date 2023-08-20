// punish.js dosyası

// Web3 bağlantısı
const web3 = new Web3(
  Web3.givenProvider ||
    "https://eth-sepolia.g.alchemy.com/v2/AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA"
);

// Deploy edilmiş kontrat adresi
const contractAddress = "0x0068Cf9f4e9A003a6858Caa5a115B25E8B209d22";

// Kontratın ABI'si
const contractABI = [
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
      {
        indexed: false,
        internalType: "bool",
        name: "isTransaction",
        type: "bool",
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
      {
        indexed: false,
        internalType: "bool",
        name: "isTransaction",
        type: "bool",
      },
    ],
    name: "buyRequest",
    type: "event",
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

// Kontrat nesnesi oluşturma
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Punish Table gösterme işlemleri
function showData() {
  const urlParams = new URLSearchParams(window.location.search);

  // "wallet" parametresini alın
  var walletAddress = urlParams.get("wallet");
  if (walletAddress.trim() !== "") {
    // API'den alınan JSON verisi üzerinden gerekli işlemleri yap

    // Burada API'den gelen veriyi işleyerek `punishAmount` değerini elde edebilirsiniz

    // checkVault fonksiyonunu çağır
    contract.methods
      .checkVault(walletAddress)
      .call()
      .then((result) => {
        // Sonucu işle
        console.log("checkVault Result:", result);

        // Tabloya ekleme işlemleri burada yapılabilir
        var tableBody = document.getElementById("punishTableBody");
        var newRow = tableBody.insertRow();

        var addressCell = newRow.insertCell(0);
        addressCell.innerHTML = walletAddress;

        var punishCell = newRow.insertCell(1);
        punishCell.innerHTML = result; // result, checkVault fonksiyonunun çıktısıdır
      })
      .catch((error) => {
        console.error("checkVault Hata:", error);
      });
  } else {
    alert("Lütfen geçerli bir cüzdan adresi giriniz.");
  }
}

function clearData() {
  var tableBody = document.getElementById("punishTableBody");
  tableBody.innerHTML = "";
}
