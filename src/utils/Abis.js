export const createVaultAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_createdTokenBalance",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "createVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const vaultCreatedAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "CreatedVaults",
    outputs: [
      {
        internalType: "contract Vault[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const faucetAbi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokenAddress",
        type: "address[]",
      },
    ],
    name: "faucet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const bridgeTokenAbi = [{}];
export const withdrawAbi = [{}];
export const withdrawETHAbi = [{}];
