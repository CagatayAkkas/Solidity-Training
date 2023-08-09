// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Main} from "../src/Main.sol";

contract Seller is Test {
    Main public main;

    function setUp() public {
        main = new Main();
    }

    function testTransaction() public {
        main.transaction(0x742d35Cc6634C0532925a3b844Bc454e4438f44e, 5);
    }

    function testPunisher() public {
        main.punish(5, 0x742d35Cc6634C0532925a3b844Bc454e4438f44e);
    }
}
