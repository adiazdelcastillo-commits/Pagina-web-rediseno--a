import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf } from 'lucide-react';
import { CHART_DATA } from '../constants';

const SustainabilitySection: React.FC = () => {
  return (
    <section id="impact" className="py-24 bg-slate-950 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-900/10 blur-[120px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 text-emerald-500 mb-4">
              <Leaf className="w-5 h-5" />
              <span className="font-mono text-sm tracking-wider uppercase">ESG Commitment</span>
            </div>
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Decarbonizing the Supply Chain
            </h2>
            <p className="text-slate-400">
              Recycling aluminum requires 95% less energy than primary production. 
              Our facilities run on 100% renewable energy, creating a carbon-negative footprint for your raw materials.
            </p>
          </div>
          <div className="mt-6 md:mt-0 text-right">
            <div className="text-5xl font-display font-bold text-emerald-400">8.9kT</div>
            <div className="text-slate-500 font-mono text-sm">CO2 AVOIDED IN 2024</div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="year" 
                stroke="#475569" 
                tick={{fill: '#94a3b8', fontSize: 12}}
                tickLine={false}
              />
              <YAxis 
                stroke="#475569"
                tick={{fill: '#94a3b8', fontSize: 12}}
                tickLine={false}
                axisLine={false}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                itemStyle={{ color: '#cbd5e1' }}
              />
              <Area 
                type="monotone" 
                dataKey="energy" 
                stackId="1" 
                stroke="#3b82f6" 
                fill="url(#colorEnergy)" 
                name="Energy Savings (MWh)"
              />
              <Area 
                type="monotone" 
                dataKey="co2" 
                stackId="1" 
                stroke="#10b981" 
                fill="url(#colorCo2)" 
                name="CO2 Avoided (Tons)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;