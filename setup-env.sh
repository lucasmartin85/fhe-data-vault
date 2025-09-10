#!/bin/bash

# FHE Data Vault Environment Setup Script
echo "🔧 Setting up FHE Data Vault environment variables..."

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# WalletConnect Project ID for development
VITE_WALLET_CONNECT_PROJECT_ID=f47ac10b58cc4372a5670e02b2c3d479

# Other environment variables for development
VITE_ALCHEMY_API_KEY=your_alchemy_api_key_here
VITE_CONTRACT_ADDRESS_SEPOLIA=0x0000000000000000000000000000000000000000
VITE_CONTRACT_ADDRESS_MAINNET=0x0000000000000000000000000000000000000000
VITE_CONTRACT_ADDRESS_POLYGON=0x0000000000000000000000000000000000000000
VITE_CONTRACT_ADDRESS_ARBITRUM=0x0000000000000000000000000000000000000000
VITE_CONTRACT_ADDRESS_OPTIMISM=0x0000000000000000000000000000000000000000
VITE_FHE_NETWORK_URL=https://devnet.zama.ai
VITE_FHE_CHAIN_ID=0x1a2
VITE_APP_NAME=FHE Data Vault
VITE_APP_DESCRIPTION=Secure privacy-preserving data storage with FHE encryption
VITE_APP_URL=http://localhost:5173
EOF
    echo "✅ .env.local file created successfully!"
else
    echo "⚠️  .env.local file already exists. Skipping creation."
fi

echo ""
echo "🚀 Environment setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Start development server: npm run dev"
echo "3. Open your browser to http://localhost:5173"
echo ""
echo "💡 To get your own WalletConnect Project ID:"
echo "   Visit: https://cloud.walletconnect.com"
echo "   Create a new project and replace the Project ID in .env.local"
echo ""
echo "🔒 For production deployment, make sure to:"
echo "   - Use your own WalletConnect Project ID"
echo "   - Set up proper contract addresses"
echo "   - Configure environment variables in your deployment platform"
