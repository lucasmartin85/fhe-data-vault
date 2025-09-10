import React from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import { DataVault } from '@/components/DataVault';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Database, Users, Zap, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FHE Data Vault</h1>
                <p className="text-sm text-muted-foreground">Secure Privacy-Preserving Data Storage</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Lock className="h-3 w-3" />
                <span>FHE Encrypted</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Globe className="h-3 w-3" />
                <span>Decentralized</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Secure Your Data with
            <span className="text-primary"> Fully Homomorphic Encryption</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Store, manage, and compute on your sensitive data while maintaining complete privacy. 
            Your data remains encrypted even during processing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">End-to-End Encryption</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your data is encrypted using FHE technology, ensuring it remains private even during computation.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                  <Database className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Decentralized Storage</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Store your data on a decentralized network with no single point of failure or control.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                  <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">Privacy-Preserving Computation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Perform computations on encrypted data without ever decrypting it, maintaining complete privacy.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Connection */}
        <div className="mb-8">
          <WalletConnect />
        </div>

        {/* Data Vault */}
        <div className="mb-8">
          <DataVault />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-muted-foreground">Data Records</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">567</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">256-bit</p>
                  <p className="text-sm text-muted-foreground">Encryption</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 FHE Data Vault. Built with privacy-first principles.</p>
            <p className="text-sm mt-2">
              Powered by Fully Homomorphic Encryption and Web3 technology
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;