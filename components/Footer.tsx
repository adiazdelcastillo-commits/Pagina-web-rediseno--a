import React from 'react';
import { Hexagon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 text-slate-400 text-sm">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 text-white mb-4">
              <Hexagon className="text-amber-500 w-8 h-8 fill-amber-500/20" />
              <span className="font-display text-2xl font-bold tracking-tight">AluCycle</span>
            </div>
            <p className="max-w-sm text-slate-500 mb-6">
              Pioneering the circular economy of aluminum through data, technology, and sustainable innovation.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center hover:bg-slate-800 cursor-pointer transition-colors">ISO</div>
              <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center hover:bg-slate-800 cursor-pointer transition-colors">ASI</div>
              <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center hover:bg-slate-800 cursor-pointer transition-colors">LME</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition-colors">For Generators</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">For Smelters</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">LME Pricing</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Logistics API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 AluCycle Tech. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;