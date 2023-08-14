from flask import Flask, jsonify
import requests

app = Flask(__name__)

hashMapOfProducts = {
    "0x742d35cc6634c0532925a3b844bc454e4438f44e": 1,
    "0xAnotherProductAddressHere": 2,
    "0xAnotherProductAddressHere2": 3,
}

# marketAddresses[[marketAddress , productCode , productAmount]]

url = "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xDFF2526dA273A765cBEdf2ad25551fcc10d71BE0&api_key=9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN"

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
        return productCode, realPrice, sellingPrice , marketAddress
    else:
        return None, None, None



@app.route('/api/products', methods=['GET'])
def products():
    productCode, realPrice, sellingPrice , marketAddress = get_product_info() # Notice the updated return values
    print(productCode, realPrice, sellingPrice)
    if productCode:
        product_info = {
            "addressOfProduct": productCode,
            "realPrice": realPrice,
            "sellingPrice": sellingPrice,
            "marketAddress": marketAddress
        }
        return jsonify([product_info])
    else:
        return jsonify({"error": "No product found"}), 400


if __name__ == '__main__':
    app.run(port=5000)
