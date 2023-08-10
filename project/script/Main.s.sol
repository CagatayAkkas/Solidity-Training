// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Main} from "../src/Main.sol";

contract MainScript is Script {
    Main main; // Declare main as state variable

    constructor() {
        main = Main(0x47744B4B94f3C7e692cA2010672ae8a4776F2572); // Initialize main with the deployed address
    }

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        main.addMoney(10, 0x742d35Cc6634C0532925a3b844Bc454e4438f44e);
        main.punish(15, 0x742d35Cc6634C0532925a3b844Bc454e4438f44e);
        console.log(
            main.checkVault(0x742d35Cc6634C0532925a3b844Bc454e4438f44e),
            main.checkdept(0x742d35Cc6634C0532925a3b844Bc454e4438f44e)
        );
        main.transaction(0x742d35Cc6634C0532925a3b844Bc454e4438f44e, 33);
        vm.stopBroadcast();
    }
}
