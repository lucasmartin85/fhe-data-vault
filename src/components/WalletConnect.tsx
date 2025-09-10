import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Shield, Database } from 'lucide-react';
import { projectId } from '@/lib/wallet';
import WalletConnectFallback from './WalletConnectFallback';

export const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Show fallback if projectId is not properly configured
  if (!projectId || projectId === '') {
    return <WalletConnectFallback />;
  }

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your wallet to access the FHE Data Vault and manage your encrypted data securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <ConnectButton />
          </div>
          <div className="text-sm text-muted-foreground text-center">
            <p>Supported wallets:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Badge variant="secondary">MetaMask</Badge>
              <Badge variant="secondary">Rainbow</Badge>
              <Badge variant="secondary">Coinbase</Badge>
              <Badge variant="secondary">WalletConnect</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <User className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Wallet Connected</CardTitle>
              <CardDescription className="text-sm">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => disconnect()}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Disconnect</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Storage Quota</p>
              <p className="text-xs text-muted-foreground">Loading...</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">Reputation</p>
              <p className="text-xs text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Your wallet is securely connected and ready to use FHE Data Vault features.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;
