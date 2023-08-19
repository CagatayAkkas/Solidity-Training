from web3 import Web3
# import requestscontractAddress
# from flask import Flask, jsonify
web3 = Web3(Web3.HTTPProvider('https://eth-sepolia.g.alchemy.com/v2/AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA'))

private_key = "46fcb707d3d440ad20741f0e4d722a54817f4641ae4ecdfa6d72f25344130323"
account = web3.eth.account.from_key(private_key)

contract_address = "0xdcC4796AFD0c1F5f3adF07eD4008462E70d4b948"
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


# Akıllı kontrat nesnesi oluşturma
contract = web3.eth.contract(address=contract_address, abi=contract_abi)

penaltyFee = 3
guiltyAddress = "0x7EFd0B777026A9c42757d92A3f79361467372435"
# İşlemi hazırlama
transaction = contract.functions.punish(penaltyFee, guiltyAddress).build_transaction({
    'from': account.address,
    'nonce': web3.eth.get_transaction_count(account.address),
    'gas': 200000,
    'gasPrice': web3.to_wei('50', 'gwei')
})

# İşlemi imzalama
signed_txn = web3.eth.account.sign_transaction(transaction, private_key=private_key)

# İşlemi yayınlama
transaction_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)

# İşlem onayını bekleyin
transaction_receipt = web3.eth.wait_for_transaction_receipt(transaction_hash)

print(transaction_receipt)