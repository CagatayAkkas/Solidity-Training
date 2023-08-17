from flask import Flask, jsonify
import requests

app = Flask(__name__)

hashMapOfProducts = {
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266": 1,
    "0xAnotherProductAddressHere": 2,
    "0xAnotherProductAddressHere2": 3,
}

marketAddresses= [["0x7EFd0B777026A9c42757d92A3f79361467372435" , "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" , 40 , 10]]
#                       marketAddress                          productAddress                               totalAmountInHand  #Punish Amount

exampleHashMap = {address[0]: [address[1], address[2],address[3]] for address in marketAddresses}


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

api_data_counter = 0
url = "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0x0eE22cA5dC70Ee5f9169D65505cC9982Fb51CcE5&api_key=9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN"

#Kendimize notlar:
#Counter eklenerek topics arraylerinin iclerindeki hardcode giderilebilir.
#örnek sayıları arttırılmalı.
def get_product_info():
    global api_data_counter 
    response = requests.get(url)
    result = response.json().get('result')
    
    if result and len(result) > api_data_counter:
        api_data_counter = len(result)-1
        topics = result[api_data_counter].get('topics')
        if len(topics) != 2:
            #topicin boyutu 2 ise tum bu satırları atlayıp yeni api data bulmaya gec
            contractAddress = result[api_data_counter]['address']
            
            sellingPrice = int(topics[2], 16) // int(topics[1], 16)
            
            
            productCode = "0x" + topics[3][-40:]  # The last 40 characters of the fourth topic
            needPunish = False
            realPrice = hashMapOfProducts.get(productCode.lower()) # Fetching from the hashmap using the lowercase product code

            marketAddress = result[api_data_counter]['data'][26:]  # Extracting the address, skipping the first 26 characters (24 zeros + 0x)
            topics2 = result[api_data_counter].get('topics')
            buyerAddress = result[api_data_counter]['data'][26:]  # Extracting buyer address
            wantedProductAddress = "0x" + topics2[3][-40:]  # Extracting wanted product address
            wantedAmountOfProduct = int(topics2[1], 16)  # Converting hex to int for wanted amount of product
            #bu nedir bulunmalı
            theMoneyToBuy = int(topics2[2], 16) # Extracting money to buy and converting from hex to int
            
            dataOfMarket = exampleHashMap.get("0x7EFd0B777026A9c42757d92A3f79361467372435")
            codeOfProductFromMarket, currentStock, punishAmount = dataOfMarket[0], dataOfMarket[1], dataOfMarket[2]
            if realPrice < sellingPrice:
                needPunish = True
                punishAmount = punishAmount +10
                
            if needPunish == False :
                #bu gercek depoda dusulmeli
                currentStock -= int(topics[1], 16)
                    #buradaki şartlar düzenlenmeli
            canSell = False
            print("api data counter " + str(api_data_counter) +"\n contract Address " + str(contractAddress) + "\n selling price" + str(sellingPrice) + "\n product code" + str(productCode) + "\n real price " + str(realPrice) + "\n market address " + str(marketAddress) + "\n buyer address " + str(buyerAddress) + "\n wanted product address " + str(wantedProductAddress) + "\n wanted amount of product " + str(wantedAmountOfProduct) + "\n the money to buy " + str(theMoneyToBuy) + "\n code of product from market " + str(codeOfProductFromMarket) + "\n current stock " + str(currentStock) + "\n punish amount " + str(punishAmount) + "\n need punish " + str(needPunish) + "\n contract address " + str(contractAddress))
            if currentStock >= wantedAmountOfProduct and theMoneyToBuy >= wantedAmountOfProduct* (hashMapOfProducts.get(wantedProductAddress.lower()))  and str(codeOfProductFromMarket.lower()) == str(wantedProductAddress.lower()):
                canSell = True
                currentStock += wantedAmountOfProduct
                print("The product is available in the market")
            return productCode, realPrice, sellingPrice , marketAddress , buyerAddress , wantedProductAddress , wantedAmountOfProduct , theMoneyToBuy , canSell , punishAmount ,needPunish ,contractAddress
        else:
            return None, None, None, None, None, None, None, None, None, None, None, None



@app.route('/api/products', methods=['GET'])
def products():
    productCode, realPrice, sellingPrice , marketAddress,buyerAddress , wantedProductAddress , wantedAmountOfProduct , theMoneyToBuy,canSell, punishAmount,needPunish , contractAddress = get_product_info() # Notice the updated return values
    print(productCode, realPrice, sellingPrice)
    if productCode:
        product_info = {
            "addressOfProduct": productCode,
            "realPrice": realPrice,
            "sellingPrice": sellingPrice,
            "marketAddress": str(marketAddress),
            "buyerAddress": buyerAddress,
            "wantedProductAddress": wantedProductAddress,
            "wantedAmountOfProduct": wantedAmountOfProduct,
            "theMoneyToBuy": theMoneyToBuy,
            "canSell": canSell,
            "punishAmount": punishAmount,
            "needPunish": needPunish,
            "contractAddress": str(contractAddress)


        }
        return jsonify([product_info])
    else:
        return jsonify({"error": "No product found"}), 400


if __name__ == '__main__':
    app.run(port=5000)

