# FHE Data Vault

A secure data vault application built with Fully Homomorphic Encryption (FHE) technology, providing privacy-preserving data storage and management capabilities.

## Project Overview

This project implements a decentralized data vault system that allows users to store, manage, and share sensitive data while maintaining complete privacy through FHE encryption. The system ensures that data remains encrypted even during computation, providing unprecedented levels of privacy and security.

## Technologies Used

This project is built with:

- **Frontend**: Vite, TypeScript, React
- **UI Components**: shadcn-ui, Tailwind CSS
- **Blockchain**: Ethereum with FHE support
- **Wallet Integration**: RainbowKit with multiple wallet providers
- **Encryption**: Fully Homomorphic Encryption (FHE)
- **State Management**: TanStack Query
- **Routing**: React Router DOM

## Features

- **Secure Data Storage**: Store sensitive data with FHE encryption
- **Privacy-Preserving Computation**: Perform operations on encrypted data
- **Multi-Wallet Support**: Connect with various Web3 wallets
- **User-Friendly Interface**: Modern, responsive design
- **Decentralized Architecture**: Built on blockchain technology

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lucasmartin85/fhe-data-vault.git
cd fhe-data-vault
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── ...             # Feature-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── main.tsx           # Application entry point
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy your application

### Environment Variables

Create a `.env.local` file with the following variables:

```env
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
VITE_ALCHEMY_API_KEY=your_alchemy_key
VITE_CONTRACT_ADDRESS=your_contract_address
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub or contact the development team.