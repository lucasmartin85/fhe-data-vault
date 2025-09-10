import { useState } from "react";
import { ClinicalHeader } from "@/components/ClinicalHeader";
import { ClinicalCharts } from "@/components/ClinicalCharts";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();
  const { toast } = useToast();

  const handleConnectWallet = () => {
    if (isWalletConnected) {
      setIsWalletConnected(false);
      setWalletAddress(undefined);
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected from the platform.",
      });
    } else {
      // Simulate wallet connection
      const mockAddress = "0x1234...5678";
      setIsWalletConnected(true);
      setWalletAddress(mockAddress);
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to FHE clinical trials platform.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-lab">
      <ClinicalHeader 
        onConnectWallet={handleConnectWallet}
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Clinical Trials Dashboard
          </h2>
          <p className="text-muted-foreground">
            Real-time analysis of encrypted clinical trial data using Fully Homomorphic Encryption
          </p>
        </div>
        
        <ClinicalCharts />
      </main>
    </div>
  );
};

export default Index;