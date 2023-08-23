from flask import Flask, jsonify
from flask_cors import CORS
import requests
from apscheduler.schedulers.background import BackgroundScheduler
from web3 import Web3
app = Flask(__name__)
CORS(app)
hashMapOfProducts = {
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266": 5,
    "0x9d70a76e6f5e5da7950585a59522b2f8efb49f66": 10,
    "0x63a6f8e70f1e666dd6afe2e51652370772a7b2d6": 15,
}

marketAddresses = [
    ["0x7efd0b777026a9c42757d92a3f79361467372435", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 10, 10,20],
    ["0x5b38da6a701c568545dcfcb03fcb875f56beddc4", "0x9d70a76e6f5e5da7950585a59522b2f8efb49f66", 20, 15,30],
    ["0x4b20993bc481177ec7e8f571cecae8a9e22c02db", "0x63a6f8e70f1e666dd6afe2e51652370772a7b2d6", 30, 20,40],
    ["0x97E7f2B08a14e4C0A8Dca87fbEB1F68b397c91df", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 10, 10,20],
    
]
#    marketAddress           productAddress                totalAmountInHand  #Punish Amount #stock limit

exampleHashMap = {address[0]: [address[1], address[2],address[3],address[4]] for address in marketAddresses}


#0x7efd0b777026a9c42757d92a3f79361467372435 -> benim adres, market adres
# 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 -bu  urun
# 0x37E64E8d534A174bF4b7aBA5943dD99cC1a47202
# 0x9d70a76e6f5e5da7950585a59522b2f8efb49f66
# 0x63a6f8e70f1e666dd6afe2e51652370772a7b2d6
# 0x45A3e8C1a54c8Ae48B21Dd8f98c9FEEa0f70DB3E
# 0x791AF412A222d334C2A3c61C9cE8C1EeA5fc61F2
# 0x2bEf0A9381C0951A68980eA242b8f5F0F0cA78a3
# 0x8c87AeE8345bEfE7457D9e7C4923F08b2b4E5142
# 0x17a2E8400e2CA602F8453E214b8a813ca69E8fF4
# 0xf9Cf6A857F6faA8e7600fB0B6fC45e5c28d6b458

web3 = Web3(Web3.HTTPProvider('https://eth-sepolia.g.alchemy.com/v2/AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA'))
url = "https://explorer.testedge2.haqq.network/api/v2/addresses/0xf95770a25E27927117b9b1f2Fd63b0cc7B94669b/transactions?filter=to%20%7C%20from"
private_key = "46fcb707d3d440ad20741f0e4d722a54817f4641ae4ecdfa6d72f25344130323"
account = web3.eth.account.from_key(private_key)


contract_abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "moneyAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "marketAddress",
				"type": "address"
			}
		],
		"name": "addMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "totalPrice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "marketAddress",
				"type": "address"
			}
		],
		"name": "buyProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "penaltyFee",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "guiltyAddress",
				"type": "address"
			}
		],
		"name": "punish",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountOfProduct",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_priceOfTheProduct",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_productCode",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_marketAddress",
				"type": "address"
			}
		],
		"name": "transaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "uint256",
				"name": "_amountOfProduct",
				"type": "uint256"
			},
			{
				"indexed": True,
				"internalType": "uint256",
				"name": "_priceOfTheProduct",
				"type": "uint256"
			},
			{
				"indexed": True,
				"internalType": "address",
				"name": "_productCode",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "address",
				"name": "_marketAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "address",
				"name": "_contractAddress",
				"type": "address"
			}
		],
		"name": "Transaction",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "uint256",
				"name": "_amountOfProduct",
				"type": "uint256"
			},
			{
				"indexed": True,
				"internalType": "uint256",
				"name": "_priceOfTheProduct",
				"type": "uint256"
			},
			{
				"indexed": True,
				"internalType": "address",
				"name": "_productCode",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "address",
				"name": "_marketAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "address",
				"name": "_contractAddress",
				"type": "address"
			}
		],
		"name": "buyRequest",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "bool",
				"name": "_punishment",
				"type": "bool"
			}
		],
		"name": "punishment",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountOfProduct",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalPrice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addressOfProduct",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "marketAddress",
				"type": "address"
			}
		],
		"name": "requestProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "canSell",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "marketAddress",
				"type": "address"
			}
		],
		"name": "checkdept",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "marketAddress",
				"type": "address"
			}
		],
		"name": "checkVault",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "dept",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_marketAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_priceOfTheProduct",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_productCode",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "vault",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
response = requests.get(url)
data = response.json()
transaction = data["items"][0]["raw_input"]
result = data["items"]

api_data_counter = len(result)-1
oldTimeStamp= ""
timeStamp = ""
oldProductCode,oldRealPrice,oldSellingPrice,oldMarketAddress,oldBuyerAddress,oldWantedProductAddress,oldWantedAmountOfProduct,oldTheMoneyToBuy,oldCanSell,oldPunishAmount,oldNeedPunish,oldContractAddress,oldIsTransaction =None, None,None,None,None,None,None,None,None,None,None,None,None
#Kendimize notlar:
#Counter eklenerek topics arraylerinin iclerindeki hardcode giderilebilir.
#örnek sayıları arttırılmalı.
def get_product_info():
    global api_data_counter 
    global timeStamp
    global oldTimeStamp
    global oldProductCode
    global oldRealPrice
    global oldSellingPrice
    global oldMarketAddress
    global oldBuyerAddress
    global oldWantedProductAddress
    global oldWantedAmountOfProduct
    global oldTheMoneyToBuy
    global oldCanSell
    global oldPunishAmount
    global oldNeedPunish
    global oldContractAddress
    global oldIsTransaction

    response = requests.get(url)
    data = response.json()
    transaction = data["items"][0]["raw_input"]
    result = data["items"]
    try:
        timeStamp = data["items"][0]["timestamp"]
    except:
        print("Max rate limit reached")

    print("time stamp is" + timeStamp)
    if result and len(result) > api_data_counter and oldTimeStamp != timeStamp:
        print("first")
        oldTimeStamp=timeStamp
        result_item = data["items"][0]
        if isinstance(result_item, dict):
            topics = result_item.get('topics')
            print("second")
        else:
            print("Unexpected result item:", result_item)
            return oldProductCode,oldRealPrice,oldSellingPrice,oldMarketAddress,oldBuyerAddress,oldWantedProductAddress,oldWantedAmountOfProduct,oldTheMoneyToBuy,oldCanSell,oldPunishAmount,oldNeedPunish,oldContractAddress,oldIsTransaction
            print("third")
        api_data_counter = len(result)-1
        #bu cezanın kodu
        if data["items"][0]["method"] != "0xb3f7451a":
            
            #topicin boyutu 2 ise tum bu satırları atlayıp yeni api data bulmaya gec
            contractAddress = data["items"][0]["to"]["hash"]
            
            sellingPrice = int(transaction[137:-128],16) // int(transaction[73:-192],16)
            
            print("fourth")
            productCode = "0x" + transaction[162:-64]  # The last 40 characters of the fourth topic
            needPunish = False
            realPrice = hashMapOfProducts.get(productCode.lower()) # Fetching from the hashmap using the lowercase product code

            marketAddress = "0x" + transaction[226:]  # Extracting the address, skipping the first 26 characters (24 zeros + 0x)
            
            topics2 = data["items"][0]
            buyerAddress = transaction[226:]  # Extracting buyer address
            isTransaction = data["items"][0]["method"]
            isTransaction = True if isTransaction == "0xedafb22e" else False
            print(isTransaction)
            wantedProductAddress = "0x" + transaction[162:-64]  # Extracting wanted product address
            wantedAmountOfProduct = int(transaction[73:-192],16)  # Converting hex to int for wanted amount of product
            #bu nedir bulunmalı
            theMoneyToBuy = int(transaction[137:-128],16) # Extracting money to buy and converting from hex to int
            print("marketAddress" + marketAddress )
            dataOfMarket = exampleHashMap.get(marketAddress.lower())
            print("data of market is" , dataOfMarket)
            codeOfProductFromMarket, currentStock, punishAmount,stockLimit = dataOfMarket[0], dataOfMarket[1], dataOfMarket[2] , dataOfMarket[3]
            
            print("the real price is" + str(realPrice) + "the selling price is" + str(sellingPrice) + "the is transaction is" + str(isTransaction))
            if realPrice < sellingPrice and isTransaction==True:
                needPunish = True
                punishAmount = punishAmount +10
                currentStock -= int(transaction[73:-192],16)
                print("5")
                
            if needPunish == False :
                #bu gercek depoda dusulmeli
                currentStock -= int(transaction[73:-192],16)
                print("6")
                    #buradaki şartlar düzenlenmeli
            else:
                checksum_contract_address = Web3.to_checksum_address(contractAddress)
                contract = web3.eth.contract(address=checksum_contract_address, abi=contract_abi)
                print("CURRENT MARKET ADDRESS İS" + marketAddress)
                
                market_checksum_address = Web3.to_checksum_address(marketAddress)
                print("punishAmount" + str(punishAmount) + "market_checksum_address" + str(market_checksum_address ))
                transaction = contract.functions.punish(punishAmount, market_checksum_address).build_transaction({
                    'from': account.address,
                    'nonce': web3.eth.get_transaction_count(account.address),
                    'gas': 200000,
                    'gasPrice': web3.to_wei('50', 'gwei')
                })
                print("7")
                signed_txn = web3.eth.account.sign_transaction(transaction, private_key=private_key)
                transaction_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
                print("PUNİSHENT SENT")
                
            canSell = False
        
            print("api data counter " + str(api_data_counter) +"\n contract Address " + str(contractAddress) + "\n selling price" + str(sellingPrice) + "\n product code" + str(productCode) + "\n real price " + str(realPrice) + "\n market address " + str(marketAddress) + "\n buyer address " + str(buyerAddress) + "\n wanted product address " + str(wantedProductAddress) + "\n wanted amount of product " + str(wantedAmountOfProduct) + "\n the money to buy " + str(theMoneyToBuy) + "\n code of product from market " + str(codeOfProductFromMarket) + "\n current stock " + str(currentStock) + "\n punish amount " + str(punishAmount) + "\n need punish " + str(needPunish) + "\n contract address " + str(contractAddress) + "\n is transaction " + str(isTransaction))
            if currentStock+wantedAmountOfProduct <= stockLimit and isTransaction==False and  theMoneyToBuy >= wantedAmountOfProduct* (hashMapOfProducts.get(wantedProductAddress.lower()))  and str(codeOfProductFromMarket.lower()) == str(wantedProductAddress.lower()):
                canSell = True
                print("I AM MAKİNG THE TRANSACTİON OF BUYY")
                currentStock += wantedAmountOfProduct
                checksum_contract_address = Web3.to_checksum_address(contractAddress)
                contract = web3.eth.contract(address=checksum_contract_address, abi=contract_abi)
                buyer_checksum_address = Web3.to_checksum_address(buyerAddress)
                product_checksum_address = Web3.to_checksum_address(wantedProductAddress)
                #the money to buy degil onu kontrol ettigimiz deger buyProducta gonderilmeli
                transactionBuy = contract.functions.buyProduct(theMoneyToBuy,buyer_checksum_address).build_transaction({
                    'from': account.address,
                    'nonce': web3.eth.get_transaction_count(account.address),
                    'gas': 200000,
                    'gasPrice': web3.to_wei('50', 'gwei')
                })
                signed_txn2 = web3.eth.account.sign_transaction(transactionBuy, private_key=private_key)
                transaction_hash = web3.eth.send_raw_transaction(signed_txn2.rawTransaction)
                print("The product is available in the market")
            oldProductCode = productCode
            oldRealPrice = realPrice
            oldSellingPrice = sellingPrice
            oldMarketAddress = marketAddress
            oldBuyerAddress = buyerAddress
            oldWantedProductAddress = wantedProductAddress
            oldWantedAmountOfProduct = wantedAmountOfProduct
            oldTheMoneyToBuy = theMoneyToBuy
            oldCanSell = canSell
            oldPunishAmount = punishAmount
            oldNeedPunish = needPunish
            oldContractAddress = contractAddress
            oldIsTransaction = isTransaction
            return productCode, realPrice, sellingPrice , marketAddress , buyerAddress , wantedProductAddress , wantedAmountOfProduct , theMoneyToBuy , canSell , punishAmount ,needPunish ,contractAddress , isTransaction
        else:
           
            return oldProductCode,oldRealPrice,oldSellingPrice,oldMarketAddress,oldBuyerAddress,oldWantedProductAddress,oldWantedAmountOfProduct,oldTheMoneyToBuy,oldCanSell,oldPunishAmount,oldNeedPunish,oldContractAddress,oldIsTransaction
    else:
        return oldProductCode,oldRealPrice,oldSellingPrice,oldMarketAddress,oldBuyerAddress,oldWantedProductAddress,oldWantedAmountOfProduct,oldTheMoneyToBuy,oldCanSell,oldPunishAmount,oldNeedPunish,oldContractAddress,oldIsTransaction
        

def scheduled_product_info():
    get_product_info()
    print("Updated product info")


@app.route('/api/products', methods=['GET'])
def products():
    product_info = get_product_info()

    if product_info:
        productCode, realPrice, sellingPrice, marketAddress, buyerAddress, wantedProductAddress, wantedAmountOfProduct, theMoneyToBuy, canSell, punishAmount, needPunish, contractAddress, isTransaction = product_info

        product_info_dict = {
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
            "contractAddress": str(contractAddress),
            "isTransaction": isTransaction
        }
        return jsonify([product_info_dict])
    else:
        print("Last transaction is punish. Waiting for a new transaction")
        return jsonify({"error": "No product found"}), 400

scheduler = BackgroundScheduler(daemon=True)
# Schedule the job to update the product info every 7 seconds
scheduler.add_job(scheduled_product_info, 'interval', seconds=20)
scheduler.start()


if __name__ == '__main__':
    app.run(port=5000)