import json

# Define the address as a key-value pair
data = {
    "akkas": "123 Main St, City, Country"
}

# Write the data to data.txt
with open('data.json', 'r') as file:
    existing_data = json.load(file)

# Append the new data to the existing data as a list
existing_data.append(data)

# Write the updated data back to data.json
with open('data.json', 'w') as file:
    json.dump(existing_data, file, indent=4)

