# Vercel Deployment Guide for FHE Data Vault

This guide provides step-by-step instructions for manually deploying the FHE Data Vault application to Vercel.

## Prerequisites

- GitHub account with access to the `lucasmartin85/fhe-data-vault` repository
- Vercel account (free tier available)
- WalletConnect Project ID (optional but recommended)

## Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Complete the account setup process

## Step 2: Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select the `lucasmartin85/fhe-data-vault` repository
3. Click "Import" to proceed with the project setup

## Step 3: Configure Project Settings

### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables
Click "Add" to add the following environment variables:

```
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id_here
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
VITE_APP_URL=https://your-app-name.vercel.app
```

### Important Configuration Notes

1. **WalletConnect Project ID**: 
   - Get this from [cloud.walletconnect.com](https://cloud.walletconnect.com)
   - Create a new project and copy the Project ID
   - This enables wallet connection functionality

2. **Contract Addresses**: 
   - Replace with actual deployed contract addresses
   - Currently set to placeholder addresses
   - Update after deploying smart contracts

3. **Alchemy API Key** (Optional):
   - Get from [alchemy.com](https://alchemy.com)
   - Provides enhanced RPC endpoints
   - Improves wallet connection reliability

## Step 4: Deploy

1. Review all settings to ensure they are correct
2. Click "Deploy" to start the deployment process
3. Wait for the build to complete (usually 2-5 minutes)

## Step 5: Post-Deployment Configuration

### Domain Setup
1. After successful deployment, you'll get a Vercel URL like `https://fhe-data-vault-xxx.vercel.app`
2. To use a custom domain:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Environment Variables Update
1. Update `VITE_APP_URL` with your actual Vercel URL
2. Redeploy to apply the changes

## Step 6: Verify Deployment

1. Visit your deployed application URL
2. Test wallet connection functionality
3. Verify that the application loads correctly
4. Check that all features are working as expected

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all dependencies are properly installed
   - Verify that the build command is correct
   - Check the build logs for specific error messages

2. **Environment Variables Not Working**:
   - Ensure all variables start with `VITE_`
   - Check for typos in variable names
   - Redeploy after adding new variables

3. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check that the project is properly configured
   - Ensure the domain is added to the WalletConnect project

4. **Contract Interaction Issues**:
   - Verify contract addresses are correct
   - Check that contracts are deployed on the correct networks
   - Ensure the user is connected to the right network

### Performance Optimization

1. **Enable Vercel Analytics**:
   - Go to Project Settings → Analytics
   - Enable Web Analytics for performance monitoring

2. **Configure Caching**:
   - Vercel automatically handles static asset caching
   - Consider implementing service worker for offline functionality

3. **Monitor Performance**:
   - Use Vercel's built-in performance monitoring
   - Check Core Web Vitals scores

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to the repository
   - Use Vercel's environment variable system
   - Regularly rotate API keys

2. **HTTPS**:
   - Vercel automatically provides HTTPS
   - Ensure all external API calls use HTTPS

3. **Content Security Policy**:
   - Consider implementing CSP headers
   - Configure in `vercel.json` if needed

## Monitoring and Maintenance

1. **Deployment Monitoring**:
   - Set up deployment notifications
   - Monitor build success/failure rates

2. **Performance Monitoring**:
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Set up alerts for performance degradation

3. **Regular Updates**:
   - Keep dependencies updated
   - Monitor security advisories
   - Regular security audits

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Wagmi Documentation](https://wagmi.sh/)

## Deployment Checklist

- [ ] Vercel account created and connected to GitHub
- [ ] Project imported from GitHub repository
- [ ] Build settings configured correctly
- [ ] Environment variables added
- [ ] WalletConnect Project ID configured
- [ ] Contract addresses updated (if available)
- [ ] Deployment successful
- [ ] Application accessible via URL
- [ ] Wallet connection working
- [ ] All features tested and functional
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Performance monitoring set up

## Next Steps After Deployment

1. **Smart Contract Deployment**:
   - Deploy the FHE Data Vault contract to testnet
   - Update contract addresses in environment variables
   - Test contract interactions

2. **User Testing**:
   - Conduct user acceptance testing
   - Gather feedback and iterate
   - Monitor user behavior and performance

3. **Production Readiness**:
   - Implement comprehensive error handling
   - Add monitoring and alerting
   - Prepare for mainnet deployment

4. **Documentation**:
   - Update user documentation
   - Create API documentation
   - Document deployment procedures

---

**Note**: This deployment guide assumes you have the necessary permissions and access to the GitHub repository and Vercel account. Make sure to follow security best practices and keep sensitive information secure.
