export const degenFactoryAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "referralAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "imageURL",
        type: "string",
      },
    ],
    name: "completeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    name: "initiateMint",
    outputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingContractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_defaultReferralAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    name: "TokenCreated",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "defaultReferralAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "getAllTokensPaginated",
    outputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "creators",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "getCreatorTokenCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "getCreatorTokensPaginated",
    outputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "names",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "symbols",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "supplies",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "getTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getTokenByIndex",
    outputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "getTokenImageURL",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "getTokenInfo",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "supply",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "creatorAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "airdroppedAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "stakingContract",
            type: "address",
          },
          {
            internalType: "bool",
            name: "mintCompleted",
            type: "bool",
          },
          {
            internalType: "string",
            name: "imageURL",
            type: "string",
          },
        ],
        internalType: "struct DegenFactory.TokenDetails",
        name: "details",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalCreatedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "isFactoryToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenAddresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenCreators",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "creatorAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "airdroppedAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "stakingContract",
        type: "address",
      },
      {
        internalType: "bool",
        name: "mintCompleted",
        type: "bool",
      },
      {
        internalType: "string",
        name: "imageURL",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const metaDataDBAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "string",
        name: "logoURL",
        type: "string",
      },
      {
        internalType: "string",
        name: "twitterHandle",
        type: "string",
      },
      {
        internalType: "string",
        name: "telegramLink",
        type: "string",
      },
      {
        internalType: "string",
        name: "websiteLink",
        type: "string",
      },
    ],
    name: "addMetadata",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "logoURL",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "twitterHandle",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "telegramLink",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "websiteLink",
        type: "string",
      },
    ],
    name: "MetadataAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getMetadata",
    outputs: [
      {
        internalType: "string",
        name: "logoURL",
        type: "string",
      },
      {
        internalType: "string",
        name: "twitterHandle",
        type: "string",
      },
      {
        internalType: "string",
        name: "telegramLink",
        type: "string",
      },
      {
        internalType: "string",
        name: "websiteLink",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
