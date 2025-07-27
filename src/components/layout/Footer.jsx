
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="border-t border-border/40 py-8"
    >
      <div className="container text-center text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-2">
            <LineChart className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold gradient-text">Bluestock</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Bluestock. All rights reserved.</p>
          <p>Your trusted partner in stock analysis.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
  