// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Main} from "../src/Main.sol";

contract MainScript is Script {
    Main main; // Declare main as state variable

    constructor() {
        main = Main(0x0eE22cA5dC70Ee5f9169D65505cC9982Fb51CcE5); // Initialize main with the deployed address
    }

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        main.transaction(
            1,
            50,
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
            0x7EFd0B777026A9c42757d92A3f79361467372435
        );
        // main.addMoney(100, 0x7EFd0B777026A9c42757d92A3f79361467372435);
        // main.requestProduct(
        //     30,
        //     50,
        //     0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
        //     0x7EFd0B777026A9c42757d92A3f79361467372435
        // );

        vm.stopBroadcast();
    }
}
