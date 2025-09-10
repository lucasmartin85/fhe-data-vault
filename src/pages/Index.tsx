import { useState } from "react";
import { ClinicalHeader } from "@/components/ClinicalHeader";
import { ClinicalCharts } from "@/components/ClinicalCharts";
import { useToast } from "@/hooks/use-toast";

// Mock data generator for blockchain sync simulation
const generateNewTrialData = () => {
  const baseParticipants = 1000 + Math.floor(Math.random() * 500);
  const baseTrials = 15 + Math.floor(Math.random() * 15);
  const baseEfficacy = 65 + Math.random() * 25;
  const baseDataPoints = Math.floor(500 + Math.random() * 500);

  return {
    totalParticipants: baseParticipants,
    activeTrials: baseTrials,
    efficacyRate: Math.round(baseEfficacy * 10) / 10,
    dataPoints: `${baseDataPoints}K`,
    efficacyData: [
      { week: 'Week 1', placebo: 15 + Math.floor(Math.random() * 10), treatment: 12 + Math.floor(Math.random() * 8), encrypted: true },
      { week: 'Week 2', placebo: 20 + Math.floor(Math.random() * 10), treatment: 10 + Math.floor(Math.random() * 6), encrypted: true },
      { week: 'Week 4', placebo: 25 + Math.floor(Math.random() * 10), treatment: 6 + Math.floor(Math.random() * 5), encrypted: true },
      { week: 'Week 8', placebo: 30 + Math.floor(Math.random() * 10), treatment: 3 + Math.floor(Math.random() * 4), encrypted: true },
      { week: 'Week 12', placebo: 35 + Math.floor(Math.random() * 10), treatment: 2 + Math.floor(Math.random() * 3), encrypted: true },
    ],
    adverseEventsData: [
      { severity: 'Mild', count: 35 + Math.floor(Math.random() * 20) },
      { severity: 'Moderate', count: 15 + Math.floor(Math.random() * 15) },
      { severity: 'Severe', count: 3 + Math.floor(Math.random() * 8) },
      { severity: 'Critical', count: Math.floor(Math.random() * 4) },
    ],
    demographicsData: [
      { group: '18-30', value: 20 + Math.floor(Math.random() * 15), fill: 'hsl(var(--primary))' },
      { group: '31-45', value: 30 + Math.floor(Math.random() * 15), fill: 'hsl(var(--primary-glow))' },
      { group: '46-60', value: 25 + Math.floor(Math.random() * 15), fill: 'hsl(var(--accent))' },
      { group: '60+', value: 8 + Math.floor(Math.random() * 12), fill: 'hsl(var(--muted-foreground))' },
    ]
  };
};

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [isSyncing, setIsSyncing] = useState(false);
  const [dashboardData, setDashboardData] = useState(generateNewTrialData());
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

  const handleSyncData = async () => {
    setIsSyncing(true);
    
    // Simulate blockchain data sync delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newData = generateNewTrialData();
    setDashboardData(newData);
    setIsSyncing(false);
    
    toast({
      title: "Data Synchronized",
      description: "Latest clinical trial data has been synced from blockchain.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-lab">
      <ClinicalHeader 
        onConnectWallet={handleConnectWallet}
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        onSyncData={handleSyncData}
        isSyncing={isSyncing}
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
        
        <ClinicalCharts data={dashboardData} />
      </main>
    </div>
  );
};

export default Index;