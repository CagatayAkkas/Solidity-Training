from flask import Flask, jsonify
import requests
from apscheduler.schedulers.background import BackgroundScheduler
from web3 import Web3
app = Flask(__name__)

hashMapOfProducts = {
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266": 10,
    "0x9d70a76e6f5e5da7950585a59522b2f8efb49f66": 20,
    "0x63a6f8e70f1e666dd6afe2e51652370772a7b2d6": 30,
}

marketAddresses = [
    ["0x7efd0b777026a9c42757d92a3f79361467372435", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 40, 10,100],
    ["0x5b38da6a701c568545dcfcb03fcb875f56beddc4", "0x9d70a76e6f5e5da7950585a59522b2f8efb49f66", 50, 15,90],
    ["0x4b20993bc481177ec7e8f571cecae8a9e22c02db", "0x63a6f8e70f1e666dd6afe2e51652370772a7b2d6", 60, 20,80]
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
url = "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xF756bdB220986167496F6995CC64287AF4648DEa&api_key=9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN"
private_key = "46fcb707d3d440ad20741f0e4d722a54817f4641ae4ecdfa6d72f25344130323"
account = web3.eth.account.from_key(private_key)


contract_abi =[
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
		"name": "buyProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkCancelled",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkFulfilled",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_requestCanSell",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "_canSell",
				"type": "bool"
			}
		],
		"name": "fulfillCanSell",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": True,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferRequested",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": True,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "requestCanSell",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": False,
				"internalType": "bool",
				"name": "canSell",
				"type": "bool"
			}
		],
		"name": "RequestCanSell",
		"type": "event"
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
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferOwnership",
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
		"name": "owner",
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
result = response.json().get('result')
api_data_counter = len(result)-1
#Kendimize notlar:
#Counter eklenerek topics arraylerinin iclerindeki hardcode giderilebilir.
#örnek sayıları arttırılmalı.
def get_product_info():
    global api_data_counter 
    response = requests.get(url)
    result = response.json().get('result')
    
    if result and len(result) > api_data_counter:
        
        result_item = result[api_data_counter]
        if isinstance(result_item, dict):
            topics = result_item.get('topics')
        else:
            print("Unexpected result item:", result_item)
            return (None,) * 12
        api_data_counter = len(result)-1
        print(len(topics))
        if len(topics) != 2:
            
            #topicin boyutu 2 ise tum bu satırları atlayıp yeni api data bulmaya gec
            contractAddress = result[api_data_counter]['address']
            
            sellingPrice = int(topics[2], 16) // int(topics[1], 16)
            
            
            productCode = "0x" + topics[3][-40:]  # The last 40 characters of the fourth topic
            needPunish = False
            realPrice = hashMapOfProducts.get(productCode.lower()) # Fetching from the hashmap using the lowercase product code

            marketAddress = result[api_data_counter]['data'][26:66]  # Extracting the address, skipping the first 26 characters (24 zeros + 0x)
            topics2 = result[api_data_counter].get('topics')
            buyerAddress = result[api_data_counter]['data'][26:66]  # Extracting buyer address
            wantedProductAddress = "0x" + topics2[3][-40:]  # Extracting wanted product address
            wantedAmountOfProduct = int(topics2[1], 16)  # Converting hex to int for wanted amount of product
            #bu nedir bulunmalı
            theMoneyToBuy = int(topics2[2], 16) # Extracting money to buy and converting from hex to int
            
            dataOfMarket = exampleHashMap.get("0x"+marketAddress.lower())
            codeOfProductFromMarket, currentStock, punishAmount,stockLimit = dataOfMarket[0], dataOfMarket[1], dataOfMarket[2] , dataOfMarket[3]
            if realPrice < sellingPrice:
                needPunish = True
                punishAmount = punishAmount +10
                currentStock -= int(topics[1], 16)
                
            if needPunish == False :
                #bu gercek depoda dusulmeli
                currentStock -= int(topics[1], 16)
                    #buradaki şartlar düzenlenmeli
            else:
                checksum_contract_address = Web3.to_checksum_address(contractAddress)
                contract = web3.eth.contract(address=checksum_contract_address, abi=contract_abi)
                market_checksum_address = Web3.to_checksum_address(marketAddress)
                transaction = contract.functions.punish(punishAmount, market_checksum_address).build_transaction({
                    'from': account.address,
                    'nonce': web3.eth.get_transaction_count(account.address),
                    'gas': 200000,
                    'gasPrice': web3.to_wei('50', 'gwei')
                })
                signed_txn = web3.eth.account.sign_transaction(transaction, private_key=private_key)
                transaction_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
                print("PUNİSHENT SENT")
                
            canSell = False
        
            print("api data counter " + str(api_data_counter) +"\n contract Address " + str(contractAddress) + "\n selling price" + str(sellingPrice) + "\n product code" + str(productCode) + "\n real price " + str(realPrice) + "\n market address " + str(marketAddress) + "\n buyer address " + str(buyerAddress) + "\n wanted product address " + str(wantedProductAddress) + "\n wanted amount of product " + str(wantedAmountOfProduct) + "\n the money to buy " + str(theMoneyToBuy) + "\n code of product from market " + str(codeOfProductFromMarket) + "\n current stock " + str(currentStock) + "\n punish amount " + str(punishAmount) + "\n need punish " + str(needPunish) + "\n contract address " + str(contractAddress))
            if currentStock+wantedAmountOfProduct <= stockLimit and theMoneyToBuy >= wantedAmountOfProduct* (hashMapOfProducts.get(wantedProductAddress.lower()))  and str(codeOfProductFromMarket.lower()) == str(wantedProductAddress.lower()):
                canSell = True
                currentStock += wantedAmountOfProduct
                checksum_contract_address = Web3.to_checksum_address(contractAddress)
                contract = web3.eth.contract(address=checksum_contract_address, abi=contract_abi)
                buyer_checksum_address = Web3.to_checksum_address(buyerAddress)
                product_checksum_address = Web3.to_checksum_address(wantedProductAddress)
                transactionBuy = contract.functions.buyProduct(wantedAmountOfProduct,theMoneyToBuy,product_checksum_address,buyer_checksum_address).build_transaction({
                    'from': account.address,
                    'nonce': web3.eth.get_transaction_count(account.address),
                    'gas': 200000,
                    'gasPrice': web3.to_wei('50', 'gwei')
                })
                signed_txn = web3.eth.account.sign_transaction(transactionBuy, private_key=private_key)
                print("The product is available in the market")
            return productCode, realPrice, sellingPrice , marketAddress , buyerAddress , wantedProductAddress , wantedAmountOfProduct , theMoneyToBuy , canSell , punishAmount ,needPunish ,contractAddress
        else:
           
            return (None,) * 12
    
        

def scheduled_product_info():
    get_product_info()
    print("Updated product info")


@app.route('/api/products', methods=['GET'])
def products():
    productCode, realPrice, sellingPrice , marketAddress,buyerAddress , wantedProductAddress , wantedAmountOfProduct , theMoneyToBuy,canSell, punishAmount,needPunish , contractAddress = get_product_info() # Notice the updated return values
    
    if productCode or realPrice or sellingPrice or marketAddress or buyerAddress or wantedProductAddress or wantedAmountOfProduct or theMoneyToBuy or canSell or punishAmount or needPunish or contractAddress:
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
        print("Last transaction is punish. Waiting for new transaction")
        return jsonify({"error": "No product found"}), 400

scheduler = BackgroundScheduler(daemon=True)
# Schedule the job to update the product info every 7 seconds
scheduler.add_job(scheduled_product_info, 'interval', seconds=30)
scheduler.start()


if __name__ == '__main__':
    app.run(port=5000)

