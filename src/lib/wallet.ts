import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.VITE_WALLET_CONNECT_PROJECT_ID || 'f47ac10b58cc4372a5670e02b2c3d479';

// Validate projectId
if (!projectId) {
  console.warn('WalletConnect Project ID is missing. Please set VITE_WALLET_CONNECT_PROJECT_ID environment variable.');
}

// Create a metadata object - this will be used by RainbowKit
export const metadata = {
  name: 'FHE Data Vault',
  description: 'Secure privacy-preserving data storage with FHE encryption',
  url: 'https://fhe-data-vault.vercel.app', // origin must match your domain & subdomain
  icons: ['/favicon.ico']
};

// Set up wagmi config
export const config = getDefaultConfig({
  appName: metadata.name,
  projectId,
  chains: [sepolia, mainnet, polygon, arbitrum, optimism],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

// Contract addresses for different networks
export const contractAddresses = {
  sepolia: process.env.VITE_CONTRACT_ADDRESS_SEPOLIA || '0x0000000000000000000000000000000000000000',
  mainnet: process.env.VITE_CONTRACT_ADDRESS_MAINNET || '0x0000000000000000000000000000000000000000',
  polygon: process.env.VITE_CONTRACT_ADDRESS_POLYGON || '0x0000000000000000000000000000000000000000',
  arbitrum: process.env.VITE_CONTRACT_ADDRESS_ARBITRUM || '0x0000000000000000000000000000000000000000',
  optimism: process.env.VITE_CONTRACT_ADDRESS_OPTIMISM || '0x0000000000000000000000000000000000000000',
};

// Contract ABI - this will be generated from the compiled contract
export const contractABI = [
  // User Management
  {
    "inputs": [
      {"internalType": "string", "name": "_publicKey", "type": "string"},
      {"internalType": "externalEuint32", "name": "initialQuota", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "registerUser",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"},
      {"internalType": "externalEuint32", "name": "newReputation", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "updateUserReputation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Data Record Management
  {
    "inputs": [
      {"internalType": "string", "name": "_dataHash", "type": "string"},
      {"internalType": "string", "name": "_metadataHash", "type": "string"},
      {"internalType": "externalEuint32", "name": "dataSize", "type": "bytes"},
      {"internalType": "externalEuint32", "name": "encryptionLevel", "type": "bytes"},
      {"internalType": "externalEuint32", "name": "expiresIn", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createDataRecord",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "recordId", "type": "uint256"},
      {"internalType": "string", "name": "_newDataHash", "type": "string"},
      {"internalType": "string", "name": "_newMetadataHash", "type": "string"},
      {"internalType": "externalEuint32", "name": "newDataSize", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "updateDataRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "recordId", "type": "uint256"}],
    "name": "deleteDataRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Access Control
  {
    "inputs": [
      {"internalType": "uint256", "name": "recordId", "type": "uint256"},
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "grantAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "recordId", "type": "uint256"},
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Access Logging
  {
    "inputs": [
      {"internalType": "uint256", "name": "recordId", "type": "uint256"},
      {"internalType": "externalEuint32", "name": "accessType", "type": "bytes"},
      {"internalType": "string", "name": "ipHash", "type": "string"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "logAccess",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // View Functions
  {
    "inputs": [{"internalType": "uint256", "name": "recordId", "type": "uint256"}],
    "name": "getDataRecordInfo",
    "outputs": [
      {"internalType": "string", "name": "dataHash", "type": "string"},
      {"internalType": "string", "name": "metadataHash", "type": "string"},
      {"internalType": "uint8", "name": "dataSize", "type": "uint8"},
      {"internalType": "uint8", "name": "accessCount", "type": "uint8"},
      {"internalType": "uint8", "name": "encryptionLevel", "type": "uint8"},
      {"internalType": "bool", "name": "isPublic", "type": "bool"},
      {"internalType": "bool", "name": "isEncrypted", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "updatedAt", "type": "uint256"},
      {"internalType": "uint256", "name": "expiresAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserProfile",
    "outputs": [
      {"internalType": "uint8", "name": "userId", "type": "uint8"},
      {"internalType": "uint8", "name": "reputation", "type": "uint8"},
      {"internalType": "uint8", "name": "storageQuota", "type": "uint8"},
      {"internalType": "uint8", "name": "usedStorage", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "string", "name": "publicKey", "type": "string"},
      {"internalType": "address", "name": "walletAddress", "type": "address"},
      {"internalType": "uint256", "name": "joinedAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "recordId", "type": "uint256"}],
    "name": "getAuthorizedUsers",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  // Events
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "recordId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "dataHash", "type": "string"}
    ],
    "name": "DataRecordCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "recordId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "updater", "type": "address"}
    ],
    "name": "DataRecordUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "recordId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "deleter", "type": "address"}
    ],
    "name": "DataRecordDeleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "recordId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "granter", "type": "address"}
    ],
    "name": "AccessGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "recordId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "revoker", "type": "address"}
    ],
    "name": "AccessRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "userId", "type": "uint256"}
    ],
    "name": "UserRegistered",
    "type": "event"
  }
] as const;
