import requests

url = "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xE32DAF04A5328b4598F754538D2058EbBb7a3E76&api_key=9MWB7ZQYSHVYVE7C85IPMSQUVR1CAYUTWN"
response = requests.get(url)

# Extracting the result from the response
result = response.json().get('result')

# Extracting and printing the topics array from the result
if result and len(result) > 0:
    topics = result[0].get('topics')
    print(topics[0])
else:
    print("No topics found")
