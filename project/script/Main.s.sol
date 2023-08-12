// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Main} from "../src/Main.sol";

contract MainScript is Script {
    Main main; // Declare main as state variable

    constructor() {
        main = Main(0xE32DAF04A5328b4598F754538D2058EbBb7a3E76); // Initialize main with the deployed address
    }

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        main.transaction(3, 10, 0x742d35Cc6634C0532925a3b844Bc454e4438f44e);

        vm.stopBroadcast();
    }
}
