import { Shield, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClinicalHeaderProps {
  onConnectWallet: () => void;
  isWalletConnected: boolean;
  walletAddress?: string;
}

export const ClinicalHeader = ({ onConnectWallet, isWalletConnected, walletAddress }: ClinicalHeaderProps) => {
  return (
    <header className="bg-gradient-lab border-b border-border shadow-clinical">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-clinical rounded-lg shadow-clinical">
                <Lock className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">
                  Confidential by FHE
                </h1>
                <p className="text-sm text-muted-foreground">
                  Private Clinical Trials Platform
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-accent" />
              <span>Encrypted Data Analysis</span>
            </div>
            
            <Button
              onClick={onConnectWallet}
              variant={isWalletConnected ? "secondary" : "default"}
              className="flex items-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>
                {isWalletConnected 
                  ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`
                  : "Connect Wallet"
                }
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};