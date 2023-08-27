// punish.js dosyası

// Web3 bağlantısı
const web3 = new Web3(
  Web3.givenProvider ||
    "https://eth-sepolia.g.alchemy.com/v2/ARuDf17aScSwZ5sopTxly32VZraI_B8b"
);

// Deploy edilmiş kontrat adresi
const contractAddress = "0xEda8a77ff47e04a544C685445949Ad4BCeFeC673";

// Kontratın ABI'si
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
