//22.08 20.00
// API URL
var apiUrl = "http://127.0.0.1:5000/api/products";

// Store the data that has already been added to the table
var oldDataTimestamp = "0x0";

// Keep track of the current row index
var currentRowIndex = 0;

// İlk verileri yükle ve tabloyu oluştur
fetchDataAndRefreshTable();

// Her 10 saniyede bir verileri güncelle
setInterval(fetchDataAndRefreshTable, 10000);

function fetchDataAndRefreshTable() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0 && oldDataTimestamp !== data[0].timeStamp) {
        // Check if the fetched data has a different timestamp from the old data
        oldDataTimestamp = data[0].timeStamp;
        updateData(data);
      } else {
        console.error("API Hatası: Veri güncellenmedi.");
      }
    })
    .catch((error) => {
      console.error("API Bağlantı Hatası:", error);
    });
}

// Function to update the table with new data
function updateData(newData) {
  var tableBody = document.getElementById("transactionTableBody");

  newData.forEach((newItem) => {
    var newRow = tableBody.insertRow(currentRowIndex); // Use the current row index

    // Increment the current row index for the next update
    currentRowIndex++;

    // Check if the 'topics' array exists and has a length of at least 2
    if (newItem) {
      var addressCell = newRow.insertCell(0);
      var slicedData = newItem.marketAddress;
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

      if (newItem.needPunish === false) {
        if (newItem.canSell === true) {
          punishmentCell.innerHTML = 0;
          newRow.style.backgroundColor = "#09c7ed"; // Correct transaction
        } else {
          punishmentCell.innerHTML = 0;
          newRow.style.backgroundColor = "#40f55b"; // Buy request
        }
      } else {
        punishmentCell.innerHTML = newItem.punishAmount || 0;
        newRow.style.backgroundColor = "#f57a7a"; // Punish transaction
      }
    }
  });
}
