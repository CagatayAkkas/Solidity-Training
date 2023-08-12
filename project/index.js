const fetch = require("node-fetch");

const getLogs = async () => {
  const endpoint = "https://api-sepolia.etherscan.io/";
  const moduleParam = "logs";
  const action = "getLogs";
  const address = "0xE32DAF04A5328b4598F754538D2058EbBb7a3E76";
  const fromBlock = "0";
  const toBlock = "98636288";
  const page = "1";
  const offset = "3";
  const apiKey = "9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN";
  const topic0 =
    "0x6702d600671f3b808570b6aea9cdff76a55fb6413d5ff9ccf33ea6ce9cf8c2ca";
  const url = `${endpoint}?module=${moduleParam}&action=${action}&address=${address}&fromBlock=${fromBlock}&toBlock=${toBlock}&page=${page}&offset=${offset}&topic0=${topic0}&apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const logs = data.result;
  const topics = logs.map((log) => log.topics);

  return topics; // Return the topics array directly
};

module.exports = getLogs;
