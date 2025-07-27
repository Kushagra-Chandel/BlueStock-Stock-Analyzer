
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const StockCard = ({ symbol, name, price, change, changePercent, volume, onAddToWatchlist }) => {
  const isPositive = change >= 0;
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div variants={cardVariants} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
      <Card className="glassmorphism-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold text-primary">{symbol}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground truncate max-w-[150px]">{name}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onAddToWatchlist} className="text-primary hover:bg-primary/10">
              <PlusCircle className="h-4 w-4 mr-1" /> Watchlist
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-3xl font-bold">
            ${price.toFixed(2)}
          </div>
          <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : (change === 0 ? <Minus className="h-4 w-4 mr-1 text-muted-foreground" /> : <TrendingDown className="h-4 w-4 mr-1" />)}
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </div>
          <Separator />
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Volume:</span> {volume.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StockCard;
  