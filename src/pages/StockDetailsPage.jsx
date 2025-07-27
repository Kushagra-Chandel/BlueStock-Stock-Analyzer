
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChartPlaceholder from '@/components/ChartPlaceholder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, Info, BarChart2, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Dummy data function (replace with API call)
const fetchStockDetails = async (symbol) => {
  console.log(`Fetching details for ${symbol}... (dummy data)`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const dummyData = {
    AAPL: {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 170.34,
      change: 1.50,
      changePercent: 0.89,
      volume: 75200000,
      marketCap: '2.75T',
      peRatio: 28.5,
      dividendYield: '0.55%',
      description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services.',
      sector: 'Technology',
      industry: 'Consumer Electronics',
      ceo: 'Timothy D. Cook',
      website: 'https://www.apple.com',
      open: 169.80,
      high: 171.20,
      low: 169.50,
      prevClose: 168.84,
      yearHigh: 199.62,
      yearLow: 150.23,
    },
    MSFT: {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 330.12,
      change: -0.50,
      changePercent: -0.15,
      volume: 25100000,
      marketCap: '2.45T',
      peRatio: 35.2,
      dividendYield: '0.85%',
      description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
      sector: 'Technology',
      industry: 'Software - Infrastructure',
      ceo: 'Satya Nadella',
      website: 'https://www.microsoft.com',
      open: 330.00,
      high: 331.50,
      low: 328.90,
      prevClose: 330.62,
      yearHigh: 366.78,
      yearLow: 275.32,
    },
    // Add more dummy stock details as needed
  };
  return dummyData[symbol.toUpperCase()] || dummyData['AAPL']; // Default to AAPL if not found
};


const StockDetailsPage = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadStockData = async () => {
      setLoading(true);
      try {
        const data = await fetchStockDetails(symbol);
        setStock(data);
      } catch (error) {
        console.error("Failed to fetch stock details:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load stock details. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
    loadStockData();
  }, [symbol, toast]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-primary">Loading stock details...</div>;
  }

  if (!stock) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">Stock Not Found</h2>
        <Button asChild>
          <Link to="/search"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Search</Link>
        </Button>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Button variant="outline" asChild className="mb-6">
          <Link to="/search"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Search</Link>
        </Button>

        {/* Header Section */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">{stock.symbol}</h1>
              <p className="text-xl text-muted-foreground">{stock.name}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-4xl font-bold">${stock.price.toFixed(2)}</p>
              <p className={`flex items-center justify-end text-lg font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? <TrendingUp className="h-5 w-5 mr-1" /> : <TrendingDown className="h-5 w-5 mr-1" />}
                {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        </header>
        
        <Separator className="my-8" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Chart and Key Stats */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <ChartPlaceholder />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="glassmorphism-card">
                <CardHeader>
                  <CardTitle className="flex items-center"><BarChart2 className="h-6 w-6 mr-2 text-primary" /> Key Statistics</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 text-sm">
                  <div><strong className="block text-muted-foreground">Open:</strong> ${stock.open?.toFixed(2) || 'N/A'}</div>
                  <div><strong className="block text-muted-foreground">High:</strong> ${stock.high?.toFixed(2) || 'N/A'}</div>
                  <div><strong className="block text-muted-foreground">Low:</strong> ${stock.low?.toFixed(2) || 'N/A'}</div>
                  <div><strong className="block text-muted-foreground">Prev. Close:</strong> ${stock.prevClose?.toFixed(2) || 'N/A'}</div>
                  <div><strong className="block text-muted-foreground">Volume:</strong> {stock.volume?.toLocaleString() || 'N/A'}</div>
                  <div><strong className="block text-muted-foreground">Market Cap:</strong> {stock.marketCap || 'N/A'}</div>
                  <div><strong className="block text-muted-foreground">P/E Ratio:</strong> {stock.peRatio?.toFixed(2) || 'N/A'}</div>
                  <div><strong className="block text-muted-foreground">Dividend Yield:</strong> {stock.dividendYield || 'N/A'}</div>
                  <div><strong className="block text-muted-foreground">52 Wk High:</strong> ${stock.yearHigh?.toFixed(2) || 'N/A'}</div>
                  <div><strong className="block text-muted-foreground">52 Wk Low:</strong> ${stock.yearLow?.toFixed(2) || 'N/A'}</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Company Info & Watchlist */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="glassmorphism-card">
                <CardHeader>
                  <CardTitle className="flex items-center"><Info className="h-6 w-6 mr-2 text-primary" /> About {stock.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{stock.description}</p>
                  <Separator className="my-4"/>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-foreground">Sector:</strong> {stock.sector}</p>
                    <p><strong className="text-foreground">Industry:</strong> {stock.industry}</p>
                    <p><strong className="text-foreground">CEO:</strong> {stock.ceo}</p>
                    {stock.website && (
                      <p><strong className="text-foreground">Website:</strong> <a href={stock.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{stock.website}</a></p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="glassmorphism-card">
                <CardHeader>
                   <CardTitle className="flex items-center"><Eye className="h-6 w-6 mr-2 text-primary" /> Watchlist Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    onClick={() => toast({ title: "Added to Watchlist!", description: `${stock.symbol} added. (UI Only)`})}
                  >
                    Add to Watchlist
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">Track this stock's performance by adding it to your watchlist.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StockDetailsPage;
  