from flask import Flask, jsonify
import requests

app = Flask(__name__)

hashMapOfProducts = {
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266": 1,
    "0xAnotherProductAddressHere": 2,
    "0xAnotherProductAddressHere2": 3,
}

marketAddresses= [["0x7EFd0B777026A9c42757d92A3f79361467372435" , "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" , 40]]
#                       marketAddress                          productAddress                               totalAmountInHand

exampleHashMap = {address[0]: [address[1], address[2]] for address in marketAddresses}


#0x7EFd0B777026A9c42757d92A3f79361467372435 -> benim adres, market adres
# 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 -bu  urun
# 0x37E64E8d534A174bF4b7aBA5943dD99cC1a47202
# 0x9D70A76E6F5e5dA7950585a59522b2F8eFb49f66
# 0x63a6f8E70f1E666DD6afE2e51652370772a7b2D6
# 0x45A3e8C1a54c8Ae48B21Dd8f98c9FEEa0f70DB3E
# 0x791AF412A222d334C2A3c61C9cE8C1EeA5fc61F2
# 0x2bEf0A9381C0951A68980eA242b8f5F0F0cA78a3
# 0x8c87AeE8345bEfE7457D9e7C4923F08b2b4E5142
# 0x17a2E8400e2CA602F8453E214b8a813ca69E8fF4
# 0xf9Cf6A857F6faA8e7600fB0B6fC45e5c28d6b458

url = "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0x908f15307770E5A92552074BD926a81C0770fF1B&api_key=9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN"

#Kendimize notlar:
#Counter eklenerek topics arraylerinin iclerindeki hardcode giderilebilir.
#örnek sayıları arttırılmalı.
def get_product_info():
    response = requests.get(url)
    result = response.json().get('result')
    if result and len(result) > 0:
        topics = result[0].get('topics')
        sellingPrice = int(topics[2], 16) // int(topics[1], 16)
        productCode = "0x" + topics[3][-40:]  # The last 40 characters of the fourth topic
        realPrice = hashMapOfProducts.get(productCode.lower()) # Fetching from the hashmap using the lowercase product code
        marketAddress = result[0]['data'][26:]  # Extracting the address, skipping the first 26 characters (24 zeros + 0x)
        print(marketAddress)
        topics2 = result[1].get('topics')
        buyerAddress = result[1]['data'][26:]  # Extracting buyer address
        wantedProductAddress = "0x" + topics2[3][-40:]  # Extracting wanted product address
        wantedAmountOfProduct = int(topics2[1], 16)  # Converting hex to int for wanted amount of product
        theMoneyToBuy = int(topics2[2], 16) # Extracting money to buy and converting from hex to int
        dataOfMarket = exampleHashMap.get("0x7EFd0B777026A9c42757d92A3f79361467372435")
        codeOfProductFromMarket , currentStock = dataOfMarket[0] , dataOfMarket[1]
        print("code of product is :" + codeOfProductFromMarket + " and current stock is :" + str(currentStock) + "wanted " + str(wantedProductAddress) , " wanted amount" + str(wantedAmountOfProduct))
                #buradaki şartlar düzenlenmeli
        if currentStock >= wantedAmountOfProduct and str(codeOfProductFromMarket.lower()) == str(wantedProductAddress.lower()):
            canSell = True
            #true ise ürünler marketin hesabına eklenmeli
            print("The product is available in the market")
        return productCode, realPrice, sellingPrice , marketAddress , buyerAddress , wantedProductAddress , wantedAmountOfProduct , theMoneyToBuy , canSell
    else:
        return None, None, None, None, None, None, None, None, None



@app.route('/api/products', methods=['GET'])
def products():
    productCode, realPrice, sellingPrice , marketAddress,buyerAddress , wantedProductAddress , wantedAmountOfProduct , theMoneyToBuy,canSell  = get_product_info() # Notice the updated return values
    print(productCode, realPrice, sellingPrice)
    if productCode:
        product_info = {
            "addressOfProduct": productCode,
            "realPrice": realPrice,
            "sellingPrice": sellingPrice,
            "marketAddress": marketAddress,
            "buyerAddress": buyerAddress,
            "wantedProductAddress": wantedProductAddress,
            "wantedAmountOfProduct": wantedAmountOfProduct,
            "theMoneyToBuy": theMoneyToBuy,
            "canSell": canSell


        }
        return jsonify([product_info])
    else:
        return jsonify({"error": "No product found"}), 400


if __name__ == '__main__':
    app.run(port=5000)



#     Working code
# def get_product_info():
#     response = requests.get(url)
#     result = response.json().get('result')
#     if result and len(result) > 0:
#         topics = result[0].get('topics')
#         sellingPrice = int(topics[2], 16) // int(topics[1], 16)
#         productCode = "0x" + topics[3][-40:]  # The last 40 characters of the fourth topic
#         realPrice = hashMapOfProducts.get(productCode.lower()) # Fetching from the hashmap using the lowercase product code
#         marketAddress = result[0]['data'][26:]  # Extracting the address, skipping the first 26 characters (24 zeros + 0x)
#         print(marketAddress)
#     #buyyerAddress =
#     #wantedProductAddress =
#     #theMoneyToBuy = 
#     #wantedAmountOfProduct = 
#         return productCode, realPrice, sellingPrice , marketAddress
#     else:
#         return None, None, None