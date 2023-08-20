// API URL
var apiUrl =
  "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0x0068Cf9f4e9A003a6858Caa5a115B25E8B209d22&api_key=9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN";

// İlk verileri yükle ve tabloyu oluştur
fetchDataAndRefreshTable();

// Her 10 saniyede bir verileri güncelle
setInterval(fetchDataAndRefreshTable, 10000);

function fetchDataAndRefreshTable() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "1") {
        clearDataAndShowData(data.result);
      } else {
        console.error("API Hatası:", data.message);
      }
    })
    .catch((error) => {
      console.error("API Bağlantı Hatası:", error);
    });
}

function clearDataAndShowData(results) {
  var tableBody = document.getElementById("transactionTableBody");
  tableBody.innerHTML = "";
  // document.getElementById("address").innerHTML = results.address.slice(-40);
  results.forEach((item, index) => {
    document.getElementById("address").innerHTML =
      "0x" + item.address.slice(-40);
    document.querySelector(".contractAddress").href =
      "https://sepolia.etherscan.io/address/0x" + item.address.slice(-40);
    var newRow = tableBody.insertRow();
    if (item.topics.length != 2) {
      var addressCell = newRow.insertCell(0);
      var slicedData = item.data.slice(26, 66);
      addressCell.className = "scrollable-cell";
      var link = document.createElement("a");
      link.href =
        "https://sepolia.etherscan.io/address/0x" + item.address.slice(-40);
      link.innerHTML = "0x" + slicedData;
      addressCell.appendChild(link);

      var intValue1 = parseInt(item.topics[1], 16);
      var intValue2 = parseInt(item.topics[2], 16);
      var result = intValue2 / intValue1;

      var priceCell = newRow.insertCell(1);
      var productCode = item.topics[3];
      var processedProductCode = "0x" + productCode.slice(-40);
      priceCell.innerHTML = processedProductCode;

      var codeCell = newRow.insertCell(2);
      codeCell.innerHTML = result;

      var punishmentCell = newRow.insertCell(3);
      if (item.topics[4]) {
        punishmentCell.innerHTML = item.topics[4];
      } else {
        punishmentCell.innerHTML = 0;
      }

      if (punishmentCell.innerHTML == 0) {
        newRow.style.backgroundColor = "#edffed";
      } else {
        newRow.style.backgroundColor = "#ffeded";
      }
    } else {
      var previousItem = results[index - 1];
      var addressCell = newRow.insertCell(0);
      addressCell.className = "scrollable-cell";
      var link = document.createElement("a");
      link.href =
        "https://sepolia.etherscan.io/address/0x" + item.address.slice(-40);
      link.innerHTML = "0x" + previousItem.data.slice(26, 66);
      addressCell.appendChild(link);
      newRow.style.backgroundColor = "#ffeded";

      var intValue1 = parseInt(previousItem.topics[1], 16);
      var intValue2 = parseInt(previousItem.topics[2], 16);
      var result = intValue2 / intValue1;

      var priceCell = newRow.insertCell(1);
      var productCode = previousItem.topics[3];
      var processedProductCode = "0x" + productCode.slice(-40);
      priceCell.innerHTML = processedProductCode;

      var codeCell = newRow.insertCell(2);
      codeCell.innerHTML = result;

      var punishmentCell = newRow.insertCell(3);
      punishmentCell.innerHTML = result * 2;
    }
  });
}
