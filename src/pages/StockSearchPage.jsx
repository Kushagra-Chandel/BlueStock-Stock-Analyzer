
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import StockCard from '@/components/StockCard';
import { Search, Filter, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const allStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 170.34, change: 1.50, changePercent: 0.89, volume: 75000000, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 330.12, change: -0.50, changePercent: -0.15, volume: 25000000, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: 20.10, changePercent: 0.74, volume: 1500000, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 120.50, change: 2.30, changePercent: 1.95, volume: 60000000, sector: 'Consumer Discretionary' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 180.00, change: -5.20, changePercent: -2.81, volume: 90000000, sector: 'Consumer Discretionary' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 150.75, change: 0.80, changePercent: 0.53, volume: 12000000, sector: 'Financials' },
  { symbol: 'V', name: 'Visa Inc.', price: 230.25, change: 1.10, changePercent: 0.48, volume: 8000000, sector: 'Financials' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 450.00, change: 10.50, changePercent: 2.39, volume: 50000000, sector: 'Technology' },
];

const StockSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState(allStocks);
  const [selectedSector, setSelectedSector] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    let stocks = allStocks;
    if (searchTerm) {
      stocks = stocks.filter(stock =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedSector) {
      stocks = stocks.filter(stock => stock.sector === selectedSector);
    }
    setFilteredStocks(stocks);
  }, [searchTerm, selectedSector]);

  const handleSearch = (e) => {
    e.preventDefault();
    toast({ title: "Search Initiated", description: `Searching for "${searchTerm}"...` });
  };

  const handleAddToWatchlist = (symbol) => {
    toast({
      title: "Added to Watchlist!",
      description: `${symbol} has been added to your watchlist. (UI Only)`,
    });
  };
  
  const uniqueSectors = [...new Set(allStocks.map(stock => stock.sector))];

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Discover Your Next Investment</h1>
        <p className="text-lg text-muted-foreground">Search for stocks by symbol or company name. Apply filters to narrow down your results.</p>
      </motion.div>

      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 mb-8 p-6 glassmorphism-card rounded-xl"
      >
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by symbol or company name (e.g., AAPL or Apple)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-base"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="relative">
           <select 
            value={selectedSector} 
            onChange={(e) => setSelectedSector(e.target.value)}
            className="h-12 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Sectors</option>
            {uniqueSectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        </div>
        <Button type="submit" size="lg" className="h-12">
          <Search className="mr-2 h-5 w-5" /> Search
        </Button>
        {(searchTerm || selectedSector) && (
          <Button 
            variant="ghost" 
            size="lg" 
            className="h-12" 
            onClick={() => { setSearchTerm(''); setSelectedSector(''); }}
          >
            <XCircle className="mr-2 h-5 w-5" /> Clear
          </Button>
        )}
      </motion.form>

      {filteredStocks.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.1 }}
        >
          {filteredStocks.map((stock) => (
            <StockCard key={stock.symbol} {...stock} onAddToWatchlist={() => handleAddToWatchlist(stock.symbol)} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center py-10"
        >
          <XCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">No stocks found matching your criteria.</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
        </motion.div>
      )}
    </div>
  );
};

export default StockSearchPage;
  