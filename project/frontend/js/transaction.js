// API URL
var apiUrl = "http://127.0.0.1:5000/api/products";

// Store the data that has already been added to the table
var oldData = [];

// İlk verileri yükle ve tabloyu oluştur
fetchDataAndRefreshTable();

// Her 10 saniyede bir verileri güncelle
setInterval(fetchDataAndRefreshTable, 10000);

function fetchDataAndRefreshTable() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (!arraysAreEqual(oldData, data)) {
        updateData(data);
      } else {
        console.error("API Hatası:", data.message);
      }
    })
    .catch((error) => {
      console.error("API Bağlantı Hatası:", error);
    });
}

// Function to check if two arrays are equal based on their content
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!isObjectEqual(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
}

// Function to check if two objects are equal
function isObjectEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

function updateData(newData) {
  oldData = newData;
  var tableBody = document.getElementById("transactionTableBody");

  // Iterate through the new data and add it to the table
  newData.forEach((newItem) => {
    var newRow = tableBody.insertRow();

    // Check if the 'topics' array exists and has a length of at least 2
    if (newItem) {
      var addressCell = newRow.insertCell(0);
      var slicedData = "0x" + newItem.marketAddress;
      var canSell = newItem.canSell;
      addressCell.className = "scrollable-cell";
      var link = document.createElement("a");
      link.href =
        "https://sepolia.etherscan.io/address/" + newItem.contractAddress;
      link.innerHTML = slicedData;
      addressCell.appendChild(link);

      var productCodeCell = newRow.insertCell(1);
      productCodeCell.innerHTML = newItem.addressOfProduct;

      var priceCell = newRow.insertCell(2);
      priceCell.innerHTML = newItem.sellingPrice;

      var punishmentCell = newRow.insertCell(3);
      punishmentCell.innerHTML = newItem.needPunish ? newItem.punishAmount : 0;

      if (newItem.needPunish == false) {
        if (newItem.canSell == true) {
          statusT = 2;
          punishmentCell.innerHTML = 0;
        } else {
          statusT = 0;
          punishmentCell.innerHTML = 0;
        }
      } else {
        statusT = 1;
        punishmentCell.innerHTML = 1;
        punishmentCell.innerHTML = newItem.needPunish
          ? newItem.punishAmount
          : 0;
      }

      if (statusT == 0) {
        //correct transaction
        newRow.style.backgroundColor = "#40f55b";
      } else if (statusT == 1) {
        //punish transaction
        newRow.style.backgroundColor = "#f57a7a";
      } else {
        //buy request
        newRow.style.backgroundColor = "#09c7ed";
      }
    }
  });
}
