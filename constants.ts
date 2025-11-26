import { Activity, TrendingUp, TrendingDown, ShieldCheck, Truck, Zap, Award, Recycle } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Technology', href: '#process' },
  { name: 'Trading', href: '#solutions' },
  { name: 'Sustainability', href: '#impact' },
  { name: 'Investors', href: '#' },
];

export const MARKET_TICKER_DATA = [
  { symbol: 'LME ALUM', price: '2,245.50', change: '+1.2%', icon: TrendingUp, color: 'text-green-400' },
  { symbol: 'LME COPPER', price: '8,540.00', change: '-0.4%', icon: TrendingDown, color: 'text-red-400' },
  { symbol: 'LME ZINC', price: '2,510.00', change: '+0.8%', icon: TrendingUp, color: 'text-green-400' },
  { symbol: 'USD/EUR', price: '0.92', change: '+0.01%', icon: Activity, color: 'text-blue-400' },
  { symbol: 'SCRAP AL 6063', price: '1,850.00', change: '+2.1%', icon: TrendingUp, color: 'text-amber-400' },
];

export const STATS = [
  { label: 'Monthly Processing', value: '12,500 Tons', icon: Truck },
  { label: 'Purity Standard', value: '99.8% Al', icon: ShieldCheck },
  { label: 'Energy Saved', value: '95%', icon: Zap },
  { label: 'Industry Exp.', value: '40 Years', icon: Award },
];

export const PROCESS_STEPS = [
  {
    title: 'AI Valuation',
    desc: 'Real-time spectroscopic analysis & market indexing.',
    icon: Activity
  },
  {
    title: 'Smart Logistics',
    desc: 'Autonomous fleet tracking & JIT collection.',
    icon: Truck
  },
  {
    title: 'Green Refining',
    desc: 'Plasma smelting with near-zero emissions.',
    icon: Recycle
  },
  {
    title: 'Certified Alloy',
    desc: 'Delivered with blockchain-verified CO2 tags.',
    icon: ShieldCheck
  }
];

export const CHART_DATA = [
  { year: '2019', co2: 1200, energy: 2400 },
  { year: '2020', co2: 1900, energy: 3100 },
  { year: '2021', co2: 3400, energy: 5800 },
  { year: '2022', co2: 5100, energy: 7200 },
  { year: '2023', co2: 6800, energy: 9100 },
  { year: '2024', co2: 8900, energy: 11500 },
];