
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChartBig, Search, TrendingUp } from 'lucide-react';
import StockCard from '@/components/StockCard';
import { useToast } from '@/components/ui/use-toast';

const dummyStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 170.34, change: 1.50, changePercent: 0.89, volume: 75000000 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 330.12, change: -0.50, changePercent: -0.15, volume: 25000000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: 20.10, changePercent: 0.74, volume: 1500000 },
];

const HomePage = () => {
  const { toast } = useToast();

  const handleAddToWatchlist = (symbol) => {
    toast({
      title: "Added to Watchlist!",
      description: `${symbol} has been added to your watchlist. (UI Only)`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background"
        >
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 120 }}
              className="inline-block p-4 bg-primary/20 rounded-full mb-6"
            >
              <BarChartBig className="h-12 w-12 text-primary" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Analyze Stocks <span className="gradient-text">Smarter</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Bluestock empowers you with cutting-edge tools and insights to navigate the stock market with confidence.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" asChild className="group">
                <Link to="/search">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            <div className="mt-16">
              <img 
                className="mx-auto rounded-lg shadow-2xl w-full max-w-4xl h-auto object-cover"
                alt="Abstract financial chart visualization"
               src="https://images.unsplash.com/photo-1500401519266-0b71b29a05e0" />
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose <span className="gradient-text">Bluestock</span>?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Search className="h-10 w-10 text-primary mb-4" />, title: "Powerful Search", description: "Instantly find any stock with our comprehensive search." },
                { icon: <TrendingUp className="h-10 w-10 text-primary mb-4" />, title: "Detailed Analytics", description: "Dive deep into stock performance with rich data and metrics." },
                { icon: <BarChartBig className="h-10 w-10 text-primary mb-4" />, title: "Interactive Charts", description: "Visualize trends and patterns with dynamic, easy-to-use charts." },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glassmorphism-card p-8 rounded-xl text-center"
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Stocks Section */}
        <section className="py-16 md:py-24 bg-secondary/10">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Stocks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyStocks.map((stock, index) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StockCard {...stock} onAddToWatchlist={() => handleAddToWatchlist(stock.symbol)} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link to="/search">Explore More Stocks</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default HomePage;
  