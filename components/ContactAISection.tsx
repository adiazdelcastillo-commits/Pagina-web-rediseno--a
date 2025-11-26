import React, { useState, useEffect } from 'react';
import { Send, Terminal, Cpu } from 'lucide-react';

const ContactAISection: React.FC = () => {
  const [terminalText, setTerminalText] = useState<string[]>([]);
  
  // Simulated AI sequence
  useEffect(() => {
    const sequence = [
      { text: "> INITIALIZING ALU_CYCLE_CORE v4.2...", delay: 500 },
      { text: "> CONNECTING TO LME MARKET DATA STREAM...", delay: 1500 },
      { text: "> ANALYZING GLOBAL SCRAP TRENDS...", delay: 2500 },
      { text: "> STATUS: DEMAND SURGE DETECTED IN AUTOMOTIVE SECTOR.", delay: 3500 },
      { text: "> RECOMMENDATION: LIQUIDATE 6063 INVENTORY. PRICES +1.2%.", delay: 5000 },
      { text: "> WAITING FOR USER INPUT...", delay: 6000 },
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach(({ text, delay }) => {
      const timeout = setTimeout(() => {
        setTerminalText(prev => [...prev, text]);
      }, delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Partner with Us</h2>
            <p className="text-slate-400 mb-8">Speak to our sales team or request a demo of our logistics platform.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">First Name</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Last Name</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Company</label>
                <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">I am interested in...</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors">
                  <option>Selling Industrial Scrap</option>
                  <option>Buying Aluminum Ingots</option>
                  <option>Logistics Partnership</option>
                </select>
              </div>
              <button type="button" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 rounded shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center">
                <Send className="w-4 h-4 mr-2" /> INITIATE CONTACT
              </button>
            </form>
          </div>

          {/* AI Terminal */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-4 -right-4 bg-slate-800 text-xs text-slate-400 px-2 py-1 rounded font-mono border border-slate-600">
              LIVE SYSTEM
            </div>
            <div className="h-full bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex flex-col shadow-2xl">
              {/* Terminal Header */}
              <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs font-mono text-slate-400 flex items-center">
                  <Cpu className="w-3 h-3 mr-2" /> AluCycle_Intelligence.exe
                </span>
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm h-[400px] overflow-y-auto flex flex-col bg-slate-950/50">
                {terminalText.map((line, i) => (
                  <div key={i} className="mb-2 text-emerald-500/90 animate-pulse-fast">
                    {line}
                  </div>
                ))}
                <div className="flex items-center text-emerald-500">
                  <span className="mr-2">{'>'}</span>
                  <span className="w-2 h-4 bg-emerald-500 animate-pulse"></span>
                </div>
              </div>

              {/* Decorative Graph Line */}
              <div className="h-24 border-t border-slate-800 bg-slate-900/50 p-4 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-around">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-1 bg-emerald-500" style={{ height: `${Math.random() * 100}%` }}></div>
                    ))}
                 </div>
                 <div className="relative z-10 text-xs font-mono text-slate-500 text-center mt-4">
                    SYSTEM RUNNING OPTIMAL
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactAISection;