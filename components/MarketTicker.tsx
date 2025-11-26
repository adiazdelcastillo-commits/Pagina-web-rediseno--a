import React from 'react';
import { motion } from 'framer-motion';
import { MARKET_TICKER_DATA } from '../constants';

const MarketTicker: React.FC = () => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 overflow-hidden py-2 flex items-center relative z-50">
      <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
      <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
      
      <div className="flex whitespace-nowrap">
        <motion.div 
          className="flex space-x-12 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {[...MARKET_TICKER_DATA, ...MARKET_TICKER_DATA, ...MARKET_TICKER_DATA].map((item, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm font-mono">
              <span className="text-slate-400 font-bold">{item.symbol}</span>
              <span className="text-slate-200">{item.price}</span>
              <div className={`flex items-center ${item.color}`}>
                <item.icon className="w-3 h-3 mr-1" />
                <span>{item.change}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarketTicker;