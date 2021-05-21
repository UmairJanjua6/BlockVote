export const CONTRACT_ADDRESS = "0x03b8aC236E36E7e6Ec86C4e93833Be43CFC62016";
export const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voterAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_cnic",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_voteConstituency",
				"type": "uint256"
			}
		],
		"name": "addVoter",
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
				"internalType": "address",
				"name": "_voterAddress",
				"type": "address"
			}
		],
		"name": "deleteVoter",
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
		"inputs": [],
		"name": "getVoterAddress",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voterAddress",
				"type": "address"
			}
		],
		"name": "getVoterInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "voterName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "cnic",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "voteConstituency",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "authorize",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isVoter",
						"type": "bool"
					}
				],
				"internalType": "struct voterListContract.Voter[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]