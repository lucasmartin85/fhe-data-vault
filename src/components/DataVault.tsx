import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractABI, contractAddresses } from '@/lib/wallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Upload, 
  Download, 
  Share, 
  Trash2, 
  Eye, 
  Lock, 
  Shield,
  Database,
  Clock,
  User
} from 'lucide-react';
import { toast } from 'sonner';

interface DataRecord {
  id: string;
  dataHash: string;
  metadataHash: string;
  dataSize: number;
  accessCount: number;
  encryptionLevel: number;
  isPublic: boolean;
  isEncrypted: boolean;
  owner: string;
  createdAt: number;
  updatedAt: number;
  expiresAt: number;
}

export const DataVault: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<DataRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  // Form states
  const [uploadForm, setUploadForm] = useState({
    dataHash: '',
    metadataHash: '',
    dataSize: '',
    encryptionLevel: '1',
    expiresIn: '86400'
  });

  const [accessForm, setAccessForm] = useState({
    recordId: '',
    userAddress: ''
  });

  // Mock data for demonstration
  useEffect(() => {
    if (isConnected) {
      // In a real implementation, this would fetch from the contract
      setRecords([
        {
          id: '1',
          dataHash: '0x1234567890abcdef...',
          metadataHash: '0xabcdef1234567890...',
          dataSize: 1024,
          accessCount: 5,
          encryptionLevel: 1,
          isPublic: false,
          isEncrypted: true,
          owner: address || '',
          createdAt: Date.now() - 86400000,
          updatedAt: Date.now() - 3600000,
          expiresAt: Date.now() + 86400000
        }
      ]);
    }
  }, [isConnected, address]);

  const handleUploadData = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, this would call the contract
      // For now, we'll simulate the upload
      const newRecord: DataRecord = {
        id: Date.now().toString(),
        dataHash: uploadForm.dataHash || `0x${Math.random().toString(16).substr(2, 8)}...`,
        metadataHash: uploadForm.metadataHash || `0x${Math.random().toString(16).substr(2, 8)}...`,
        dataSize: parseInt(uploadForm.dataSize) || 0,
        accessCount: 0,
        encryptionLevel: parseInt(uploadForm.encryptionLevel),
        isPublic: false,
        isEncrypted: true,
        owner: address || '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        expiresAt: Date.now() + parseInt(uploadForm.expiresIn) * 1000
      };

      setRecords(prev => [newRecord, ...prev]);
      toast.success('Data record created successfully');
      
      // Reset form
      setUploadForm({
        dataHash: '',
        metadataHash: '',
        dataSize: '',
        encryptionLevel: '1',
        expiresIn: '86400'
      });
    } catch (error) {
      toast.error('Failed to create data record');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrantAccess = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      // In a real implementation, this would call the contract
      toast.success('Access granted successfully');
      setAccessForm({ recordId: '', userAddress: '' });
    } catch (error) {
      toast.error('Failed to grant access');
      console.error(error);
    }
  };

  const handleDeleteRecord = async (recordId: string) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      // In a real implementation, this would call the contract
      setRecords(prev => prev.filter(record => record.id !== recordId));
      toast.success('Data record deleted successfully');
    } catch (error) {
      toast.error('Failed to delete data record');
      console.error(error);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Data Vault</span>
          </CardTitle>
          <CardDescription>
            Connect your wallet to access the data vault
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to manage your encrypted data records.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>FHE Data Vault</span>
          </CardTitle>
          <CardDescription>
            Manage your encrypted data records with fully homomorphic encryption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload Data</TabsTrigger>
              <TabsTrigger value="manage">Manage Records</TabsTrigger>
              <TabsTrigger value="access">Access Control</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataHash">Data Hash</Label>
                  <Input
                    id="dataHash"
                    placeholder="Enter data hash"
                    value={uploadForm.dataHash}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, dataHash: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metadataHash">Metadata Hash</Label>
                  <Input
                    id="metadataHash"
                    placeholder="Enter metadata hash"
                    value={uploadForm.metadataHash}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, metadataHash: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataSize">Data Size (bytes)</Label>
                  <Input
                    id="dataSize"
                    type="number"
                    placeholder="Enter data size"
                    value={uploadForm.dataSize}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, dataSize: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="encryptionLevel">Encryption Level</Label>
                  <Input
                    id="encryptionLevel"
                    type="number"
                    min="1"
                    max="3"
                    placeholder="1-3"
                    value={uploadForm.encryptionLevel}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, encryptionLevel: e.target.value }))}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="expiresIn">Expires In (seconds)</Label>
                  <Input
                    id="expiresIn"
                    type="number"
                    placeholder="86400 (24 hours)"
                    value={uploadForm.expiresIn}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, expiresIn: e.target.value }))}
                  />
                </div>
              </div>
              <Button 
                onClick={handleUploadData} 
                disabled={isLoading}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isLoading ? 'Creating...' : 'Create Data Record'}
              </Button>
            </TabsContent>

            <TabsContent value="manage" className="space-y-4">
              <div className="space-y-4">
                {records.length === 0 ? (
                  <Alert>
                    <Database className="h-4 w-4" />
                    <AlertDescription>
                      No data records found. Upload your first encrypted data record.
                    </AlertDescription>
                  </Alert>
                ) : (
                  records.map((record) => (
                    <Card key={record.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Lock className="h-4 w-4 text-green-500" />
                            <CardTitle className="text-sm">Record #{record.id}</CardTitle>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">
                              {record.encryptionLevel === 1 ? 'Basic' : 
                               record.encryptionLevel === 2 ? 'Standard' : 'Advanced'}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteRecord(record.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Data Hash:</p>
                            <p className="font-mono text-xs">{record.dataHash}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Size:</p>
                            <p>{record.dataSize} bytes</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Access Count:</p>
                            <p>{record.accessCount}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Expires:</p>
                            <p className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(record.expiresAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="access" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recordId">Record ID</Label>
                  <Input
                    id="recordId"
                    placeholder="Enter record ID"
                    value={accessForm.recordId}
                    onChange={(e) => setAccessForm(prev => ({ ...prev, recordId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userAddress">User Address</Label>
                  <Input
                    id="userAddress"
                    placeholder="0x..."
                    value={accessForm.userAddress}
                    onChange={(e) => setAccessForm(prev => ({ ...prev, userAddress: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleGrantAccess} className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  Grant Access
                </Button>
                <Button variant="outline" className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  Revoke Access
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVault;
