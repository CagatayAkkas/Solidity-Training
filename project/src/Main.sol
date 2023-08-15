// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

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
        uint256 indexed _amountOfProduct,
        uint256 indexed _priceOfTheProduct,
        address indexed _productCode,
        address _marketAddress
    );
    event buyRequest(
        uint256 indexed _amountOfProduct,
        uint256 indexed _priceOfTheProduct,
        address indexed _productCode,
        address _marketAddress
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
        uint256 _amountOfProduct,
        uint256 _priceOfTheProduct,
        address _productCode,
        address _marketAddress
    ) public {
        emit Transaction(
            _amountOfProduct,
            _priceOfTheProduct,
            _productCode,
            _marketAddress
        );
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
        //bunu ifin icine alabiliriz
        emit punishment(true);
        return true;
    }

    // @dev Function to buy a product, deducting the cost from the vault.
    // @param marketAddress Address of the market.
    // @param priceOfTheProduct Price of the product to be bought.
    //request product
    function requestProduct(
        uint256 amountOfProduct,
        uint256 totalPrice,
        address addressOfProduct,
        address marketAddress
    ) public {
        if (vault[marketAddress] < totalPrice) {
            revert("Not enough money");
        } else {
            emit buyRequest(
                amountOfProduct,
                totalPrice,
                addressOfProduct,
                marketAddress
            );
        }
    }

    function buyProduct(
        uint256 amountOfProduct,
        uint256 totalPrice,
        address addressOfProduct,
        address marketAddress
    ) public {
        vault[marketAddress] -= totalPrice;
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
