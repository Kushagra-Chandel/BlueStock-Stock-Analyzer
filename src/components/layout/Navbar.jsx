
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { cn } from '@/lib/utils';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <LineChart className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">Bluestock</span>
        </Link>
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <Home className="inline-block h-5 w-5 mr-1" /> Home
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <Search className="inline-block h-5 w-5 mr-1" /> Search
          </NavLink>
          <ModeToggle />
          <Button asChild>
            <Link to="/search">Get Started</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
  