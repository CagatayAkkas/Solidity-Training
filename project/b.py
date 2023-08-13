import requests

hashMapOfProducts = {
#Albeni
    "0x6E2fC3E4c7d4eC1b1293aD91C7a9e10C5a16fFee" : 1,
#Ayran
    "0x52fA377A44B9e3c918D75293c7A6e488Ea487a94":2,
#Makarna
    "0x8Bf9Cf4b3415e6A2f5EA05E49B2a9C20F3c64bA3":3,

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
# 0x6E2fC3E4c7d4eC1b1293aD91C7a9e10C5a16fFee
# 0x52fA377A44B9e3c918D75293c7A6e488Ea487a94
# 0x8Bf9Cf4b3415e6A2f5EA05E49B2a9C20F3c64bA3
# 0x9eCE15Df30d3DAd64FbF3E5e8cDb16aFaA9b2a8C
# 0x3D0Aa4649e683fe7865df75f22a1a494Bf252c22
# 0x4743F7f1B434dF4eC38c7922fA952f034a9C68E4
# 0x9f2B77dC5298f65e4F557a99494dce76B2f7Cf17
# 0xF5E23CfC5e812C7951Fa4869f81aDaf5A78a0eD5
# 0x6eE407eDF83Ae76Ae2Ce0e1e839ab2f080A5D692
# 0xa81A9bD16601dCeC307Fd862375e4F9F0e00C225

def checkTransactionPrice(priceOfTheProduct, productCode):
    if priceOfTheProduct/amountOfProduct <= hashMapOfProducts[productCode]:
        print("Price is ok") 
    else:
        print("Price is not ok")

