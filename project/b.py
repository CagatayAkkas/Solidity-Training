import requests

hashMapOfProducts = {
#Albeni
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" : 1,
#Ayran
    "0x4E9ce36E442e55EcD9025B9a6E0D88485d628A67":2,
#Makarna
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e":3,

}

url = "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xE32DAF04A5328b4598F754538D2058EbBb7a3E76&api_key=9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN"
response = requests.get(url)

# Extracting the result from the response
result = response.json().get('result')

# Extracting and printing the topics array from the result
if result and len(result) > 0:
    topics = result[0].get('topics')
    amountOfProduct = int(topics[1], 16)
    priceOfTheProduct = int(topics[2], 16)
    productCode = "0x" + str(topics[3][-40:])
    print(amountOfProduct)
    print(priceOfTheProduct)
    print(productCode)
else:
    print("No topics found")
# 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
# 0x4E9ce36E442e55EcD9025B9a6E0D88485d628A67
# 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
# 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
# 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
# 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
# 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
# 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
# 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
# 0x742d35Cc6634C0532925a3b844Bc454e4438f44e

def checkTransactionPrice(priceOfTheProduct, productCode):
    if priceOfTheProduct <= hashMapOfProducts[productCode]:
        print("Price is ok") 
    else:
        print("Price is not ok")
        
