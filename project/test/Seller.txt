// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Main} from "../src/Main.sol";

contract Seller is Test {
    Main public main;
    address constant testAddress = 0x742d35Cc6634C0532925a3b844Bc454e4438f44e;

    function setUp() public {
        main = new Main();
    }

    function testTransaction() public {
        main.transaction(5, 10, testAddress);
    }

    function testAddMoney() public {
        main.addMoney(10, testAddress);

        assertEq(
            main.checkVault(testAddress),
            10,
            "Vault balance should be 10 after adding money"
        );
    }

    function testPunisherWithoutEnoughBalance() public {
        main.punish(15, testAddress);

        assertEq(
            main.checkVault(testAddress),
            0,
            "Vault balance should be 0 after punishment without enough balance"
        );

        assertEq(
            main.checkdept(testAddress),
            5,
            "dept should be 5 after punishment without enough balance"
        );
    }

    function testPunisherWithEnoughBalance() public {
        main.addMoney(20, testAddress);
        main.punish(10, testAddress);

        assertEq(
            main.checkVault(testAddress),
            10,
            "Vault balance should be 10 after punishment with enough balance"
        );

        assertEq(
            main.checkdept(testAddress),
            5,
            "dept should remain 5 after punishment with enough balance"
        );
    }

    function testBuyProductWithoutEnoughMoney() public {
        main.buyProduct(testAddress, 15);
    }

    function testBuyProductWithEnoughMoney() public {
        main.addMoney(50, testAddress);
        main.buyProduct(testAddress, 25);

        assertEq(
            main.checkVault(testAddress),
            25,
            "Vault balance should be 25 after buying a product"
        );
    }

    function testCheckVault() public {
        assertEq(
            main.checkVault(testAddress),
            25,
            "Vault balance should be 25"
        );
    }

    function testCheckdept() public {
        assertEq(main.checkdept(testAddress), 5, "dept should be 5");
    }
}
