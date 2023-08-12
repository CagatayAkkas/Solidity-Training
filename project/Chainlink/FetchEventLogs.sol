// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract FetchEventLogs is ChainlinkClient {
    bytes32 public data;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    // Define the contract constructor
    constructor(
        address _oracle,
        string memory _jobId,
        uint256 _fee,
        address _link
    ) {
        setChainlinkToken(_link);
        oracle = _oracle;
        jobId = stringToBytes32(_jobId);
        fee = _fee;
    }

    // Create a Chainlink request to retrieve the event logs
    function requestEventLogs() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // Set the URL and path to the API endpoint, and add other parameters as needed
        request.add(
            "get",
            "https://api-ropsten.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xE32DAF04A5328b4598F754538D2058EbBb7a3E76"
        );
        request.add("path", "result"); // Modify the path according to the response structure

        // Send the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    // Fulfillment function to handle the response
    function fulfill(
        bytes32 _requestId,
        bytes32 _data
    ) public recordChainlinkFulfillment(_requestId) {
        data = _data;
    }

    // Utility function to convert a string to bytes32
    function stringToBytes32(
        string memory source
    ) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}
