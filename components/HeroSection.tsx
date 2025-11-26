import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Factory, Coins } from 'lucide-react';
import { STATS } from '../constants';

const TiltWrapper = ({ children, className, initial, animate, transition }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 200, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StatCounter = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 60 });
  const [displayValue, setDisplayValue] = useState("0");
  const [suffix, setSuffix] = useState("");

  useEffect(() => {
    // Parse the number and suffix from the string (e.g., "12,500 Tons")
    const match = value.match(/([\d,.]+)(.*)/);
    if (match) {
      const numericPart = match[1];
      const textPart = match[2];
      const targetValue = parseFloat(numericPart.replace(/,/g, ''));
      const isFloat = numericPart.includes('.');
      const decimalPlaces = isFloat ? numericPart.split('.')[1].length : 0;

      setSuffix(textPart);

      if (isInView) {
        motionValue.set(targetValue);
      }

      return springValue.on("change", (latest) => {
        if (isFloat) {
          setDisplayValue(latest.toFixed(decimalPlaces));
        } else {
          setDisplayValue(Math.floor(latest).toLocaleString());
        }
      });
    } else {
      // Fallback for non-numeric values
      setDisplayValue(value);
    }
  }, [value, isInView, motionValue, springValue]);

  return (
    <div ref={ref} className="flex items-center space-x-4 group cursor-default">
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 group-hover:border-amber-500/50 transition-colors duration-300">
        <Icon className="w-6 h-6 text-amber-500" />
      </div>
      <div>
        <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">{label}</p>
        <p className="text-white font-display font-bold text-xl tabular-nums">
          {displayValue}{suffix}
        </p>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;

        // Mouse interaction (Repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          // Gentle push away
          const pushStrength = 0.1;
          
          this.vx -= Math.cos(angle) * force * pushStrength;
          this.vy -= Math.sin(angle) * force * pushStrength;
        }

        // Speed limit damping
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1.0) {
            this.vx *= 0.98;
            this.vy *= 0.98;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)'; // slate-400 with opacity
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Calculate density based on area
      const numberOfParticles = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Draw connections between nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            // Fade out line based on distance
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.15 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      resizeCanvas();
      init();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" 
          alt="Industrial Crane Sunset" 
          className="w-full h-full object-cover"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-600/10 blur-[100px]"></div>
      </div>

      {/* Animated Hex Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Particle Network Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-xs font-mono text-amber-400 tracking-wider">INFRASTRUCTURE 4.0 ONLINE</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Scrap is <span className="text-gradient-tech">Capital</span>.<br/>
              Aluminum is <span className="text-gradient-gold">Power</span>.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              We bridge the gap between industrial waste and premium alloy production using 
              AI-driven valuation and sustainable smelting technologies.
            </p>
          </motion.div>
        </div>

        {/* Dual CTA Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Sellers Card */}
          <TiltWrapper 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group glass-panel p-8 rounded-2xl relative overflow-hidden cursor-pointer hover:bg-slate-800/50 transition-colors duration-300 border-l-4 border-l-blue-500"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Coins size={120} />
            </div>
            <h3 className="text-blue-400 font-mono text-sm mb-2 relative z-10">FOR GENERATORS</h3>
            <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Sell Scrap</h2>
            <p className="text-slate-400 mb-6 relative z-10">Instant AI valuation for your industrial offcuts. Highest market rates guaranteed.</p>
            <motion.button 
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-white font-semibold group-hover:text-blue-400 transition-colors duration-300 relative z-10"
            >
              Get Quote <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          </TiltWrapper>

          {/* Buyers Card */}
          <TiltWrapper 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group glass-panel p-8 rounded-2xl relative overflow-hidden cursor-pointer hover:bg-slate-800/50 transition-colors duration-300 border-l-4 border-l-emerald-500"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Factory size={120} />
            </div>
            <h3 className="text-emerald-400 font-mono text-sm mb-2 relative z-10">FOR FOUNDRIES</h3>
            <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Buy Alloys</h2>
            <p className="text-slate-400 mb-6 relative z-10">High-purity 6063/3003 aluminum ingots. Traceable ESG credentials for your supply chain.</p>
            <motion.button 
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-white font-semibold group-hover:text-emerald-400 transition-colors duration-300 relative z-10"
            >
              View Inventory <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          </TiltWrapper>
        </div>
      </div>

      {/* Floating Stats Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="hidden md:block absolute bottom-0 w-full bg-slate-950/90 border-t border-slate-800 backdrop-blur-xl z-20"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-around items-center">
            {STATS.map((stat, idx) => (
              <StatCounter 
                key={idx} 
                label={stat.label} 
                value={stat.value} 
                icon={stat.icon} 
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;