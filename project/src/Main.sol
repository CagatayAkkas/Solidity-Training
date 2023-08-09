// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

contract Main {
    address public s_productCode;
    uint256 public s_priceOfTheProduct;

    mapping(address => uint256) public vault;
    mapping(address => uint256) public depth;

    event Transaction(address _productCode, uint256 _priceOfTheProduct);

    function addMoney(uint256 moneyAmount, address marketAddress) public {
        vault[marketAddress] += moneyAmount;
    }

    function transaction(
        address _productCode,
        uint256 _priceOfTheProduct
    ) public {
        emit Transaction(_productCode, _priceOfTheProduct);
    }

    function punish(uint256 penaltyFee, address guiltyAddress) public {
        if (vault[guiltyAddress] < penaltyFee) {
            depth[guiltyAddress] += penaltyFee - vault[guiltyAddress];
            vault[guiltyAddress] = 0;
        } else {
            vault[guiltyAddress] -= penaltyFee;
        }
    }

    function buyProduct(
        address marketAddress,
        uint256 priceOfTheProduct
    ) public {
        if (vault[marketAddress] < priceOfTheProduct) {
            revert("Not enough money");
        } else {
            vault[marketAddress] -= priceOfTheProduct;
        }
    }

    function checkVault(address marketAddress) public returns (uint256) {
        return vault[marketAddress];
    }

    function checkDepth(address marketAddress) public returns (uint256) {
        return depth[marketAddress];
    }
}
