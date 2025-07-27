
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';

const ChartPlaceholder = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-96 glassmorphism-card rounded-lg flex flex-col items-center justify-center p-6"
    >
      <BarChart2 className="h-16 w-16 text-primary mb-4" />
      <h3 className="text-xl font-semibold text-foreground">Interactive Chart</h3>
      <p className="text-muted-foreground text-center">
        Stock performance data will be visualized here.
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        (Placeholder: A charting library like Recharts or Chart.js can be integrated.)
      </p>
    </motion.div>
  );
};

export default ChartPlaceholder;
  