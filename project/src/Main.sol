// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

// @title Main Contract
// @dev This contract allows users to manage transactions, balances, and penalties.
contract Main {
    // @dev Represents the product code's address.
    address public s_productCode;

    // @dev Represents the price of the product.
    uint256 public s_priceOfTheProduct;

    // @dev Maps an address to its stored money.
    mapping(address => uint256) public vault;

    // @dev Maps an address to its dept (possibly owed money).
    mapping(address => uint256) public dept;

    // @dev Event to log transactions with product code and price.
    event Transaction(
        address indexed _productCode,
        uint256 indexed _priceOfTheProduct
    );
    event punishment(bool indexed _punishment);

    // @dev Function to add money to a market's vault.
    // @param moneyAmount Amount of money to add.
    // @param marketAddress Address of the market.
    function addMoney(uint256 moneyAmount, address marketAddress) public {
        vault[marketAddress] += moneyAmount;
    }

    // @dev Function to create a transaction event.
    // @param _productCode Address representation of the product code.
    // @param _priceOfTheProduct Price of the product.
    function transaction(
        address _productCode,
        uint256 _priceOfTheProduct
    ) public {
        emit Transaction(_productCode, _priceOfTheProduct);
    }

    // @dev Function to apply a penalty to an address.
    // @param penaltyFee Amount of the penalty.
    // @param guiltyAddress Address to be penalized.
    function punish(
        uint256 penaltyFee,
        address guiltyAddress
    ) public returns (bool) {
        if (vault[guiltyAddress] < penaltyFee) {
            dept[guiltyAddress] += penaltyFee - vault[guiltyAddress];
            vault[guiltyAddress] = 0;
        } else {
            vault[guiltyAddress] -= penaltyFee;
        }
        emit punishment(true);
        return true;
    }

    // @dev Function to buy a product, deducting the cost from the vault.
    // @param marketAddress Address of the market.
    // @param priceOfTheProduct Price of the product to be bought.
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

    // @dev Function to check the money stored in a market's vault.
    // @param marketAddress Address of the market.
    // @return Amount of money in the vault.
    function checkVault(address marketAddress) public returns (uint256) {
        return vault[marketAddress];
    }

    // @dev Function to check the dept (owed money) of a market.
    // @param marketAddress Address of the market.
    // @return Amount of money in the dept.
    function checkdept(address marketAddress) public returns (uint256) {
        return dept[marketAddress];
    }
}
