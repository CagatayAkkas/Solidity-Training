// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Main} from "../src/Main.sol";

contract MainScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        Main main = new Main();
        main.addMoney(10, 0x742d35Cc6634C0532925a3b844Bc454e4438f44e);
        main.punish(5, 0x742d35Cc6634C0532925a3b844Bc454e4438f44e);
        console.log(
            main.checkVault(0x742d35Cc6634C0532925a3b844Bc454e4438f44e),
            main.checkDepth(0x742d35Cc6634C0532925a3b844Bc454e4438f44e)
        );
        vm.stopBroadcast();
    }
}
