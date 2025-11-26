import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Database, Truck, CheckCircle2, ChevronRight } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';

const SolutionsSection: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">The <span className="text-white">AluCycle</span> Standard</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A vertical integration model that transforms chaos into calibrated commodities.</p>
        </div>

        {/* Process Timeline */}
        <div className="relative mb-32">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-slate-800 via-amber-500/50 to-slate-800 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 group"
              >
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-amber-500/30 hover:bg-slate-800/80 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 h-full flex flex-col items-center text-center md:block md:text-left">
                  <div className="w-14 h-14 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-amber-500 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-colors">
                    <step.icon className="w-6 h-6 text-slate-300 group-hover:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-display">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* B2B Split Features */}
        <div id="solutions" className="grid lg:grid-cols-2 gap-12">
          {/* Tech/Seller Side */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl border-t border-t-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.05)] hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="text-cyan-400" />
              <h3 className="text-2xl font-bold text-white">Logistic Intelligence</h3>
            </div>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="bg-cyan-500/10 p-2 rounded mr-4 mt-1"><Settings className="w-4 h-4 text-cyan-400" /></div>
                <div>
                  <h4 className="text-white font-semibold">Automated Scheduling</h4>
                  <p className="text-slate-400 text-sm mt-1">Our API connects to your production line to forecast scrap overflow and schedule pick-ups automatically.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-cyan-500/10 p-2 rounded mr-4 mt-1"><Truck className="w-4 h-4 text-cyan-400" /></div>
                <div>
                  <h4 className="text-white font-semibold">Smart Containers</h4>
                  <p className="text-slate-400 text-sm mt-1">IoT-enabled bins that report weight and fill-levels in real-time.</p>
                </div>
              </li>
            </ul>
            <div className="mt-8 pt-8 border-t border-slate-800">
               <button className="text-cyan-400 text-sm font-mono hover:text-cyan-300 flex items-center group">
                 EXPLORE INTEGRATION DOCS <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>

          {/* Quality/Buyer Side */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl border-t border-t-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.05)] hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(245,158,11,0.15)] transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle2 className="text-amber-400" />
              <h3 className="text-2xl font-bold text-white">Metallurgical Excellence</h3>
            </div>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="bg-amber-500/10 p-2 rounded mr-4 mt-1"><Settings className="w-4 h-4 text-amber-400" /></div>
                <div>
                  <h4 className="text-white font-semibold">Spectro-Analysis</h4>
                  <p className="text-slate-400 text-sm mt-1">Every ingot is scanned. Detailed chemical composition reports provided via QR code.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-500/10 p-2 rounded mr-4 mt-1"><CheckCircle2 className="w-4 h-4 text-amber-400" /></div>
                <div>
                  <h4 className="text-white font-semibold">Custom Alloys</h4>
                  <p className="text-slate-400 text-sm mt-1">We formulate specific 5xxx and 6xxx series blends to meet your exact tensile requirements.</p>
                </div>
              </li>
            </ul>
             <div className="mt-8 pt-8 border-t border-slate-800">
               <button className="text-amber-400 text-sm font-mono hover:text-amber-300 flex items-center group">
                 REQUEST SPEC SHEET <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;