async function fetchData() {
  const rpcUrl =
    "https://eth-sepolia.g.alchemy.com/v2/AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA";
  const privateKey =
    "46fcb707d3d440ad20741f0e4d722a54817f4641ae4ecdfa6d72f25344130323"; // Replace with your private key

  const response = await fetch(
    "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0x0068Cf9f4e9A003a6858Caa5a115B25E8B209d22&api_key=9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN"
  );
  const data = await response.json();
  const result = data.result;

  // Check if result is an array
  if (Array.isArray(result)) {
    // Iterate over the array of data and log it
    result.forEach((item) => {
      console.log("Address:", item.address);
      console.log("Topics:", item.topics);
      console.log("Data:", item.data);
      console.log("Block Number:", item.blockNumber);
      console.log("Block Hash:", item.blockHash);
      console.log("Timestamp:", item.timeStamp);
      console.log("Gas Price:", item.gasPrice);
      console.log("Gas Used:", item.gasUsed);
      console.log("Log Index:", item.logIndex);
      console.log("Transaction Hash:", item.transactionHash);
      console.log("Transaction Index:", item.transactionIndex);
      console.log("\n"); // Add a separator for clarity
    });
  } else {
    console.error("API response does not contain an array of results.");
  }

  return result; // You can return the entire array if needed
}
fetchData();
// Export the fetchData function
module.exports = fetchData;
