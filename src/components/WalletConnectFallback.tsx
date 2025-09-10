import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ExternalLink, Copy } from 'lucide-react';
import { toast } from 'sonner';

export const WalletConnectFallback: React.FC = () => {
  const copyProjectId = () => {
    navigator.clipboard.writeText('f47ac10b58cc4372a5670e02b2c3d479');
    toast.success('Project ID copied to clipboard');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>WalletConnect Configuration</CardTitle>
        <CardDescription>
          To enable wallet connection, you need to configure WalletConnect Project ID
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            WalletConnect Project ID is required for wallet connection functionality.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-3">
          <h4 className="font-medium">Quick Setup:</h4>
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li>Visit <a href="https://cloud.walletconnect.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
              WalletConnect Cloud <ExternalLink className="h-3 w-3 ml-1" />
            </a></li>
            <li>Create a new project</li>
            <li>Copy your Project ID</li>
            <li>Set the environment variable: <code className="bg-muted px-1 rounded">VITE_WALLET_CONNECT_PROJECT_ID</code></li>
          </ol>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">For development, you can use this temporary Project ID:</p>
          <div className="flex items-center space-x-2">
            <code className="flex-1 bg-muted p-2 rounded text-xs font-mono">
              f47ac10b58cc4372a5670e02b2c3d479
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={copyProjectId}
              className="flex items-center space-x-1"
            >
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </Button>
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground text-center">
            After setting up the Project ID, restart your development server.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnectFallback;
