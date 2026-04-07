import * as React from "react";
import { motion } from "motion/react";
import { ArrowRight, Recycle, Leaf, Globe, ShieldCheck } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-eco-dark text-eco-cream py-24 px-8 md:px-16">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000"
            alt="Nature background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-eco-leaf/20 border border-eco-leaf/30 text-eco-leaf text-xs font-bold uppercase tracking-widest"
          >
            <Leaf size={14} />
            Regenerating the Planet
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif leading-[0.9] tracking-tight"
          >
            Waste is just a <br />
            <span className="italic text-eco-leaf">resource</span> in the <br />
            wrong place.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-eco-cream/80 max-w-2xl leading-relaxed font-light"
          >
            EcoRestore is your partner in the circular economy. We help you
            manage waste responsibly, track your impact, and contribute to a
            regenerative future for our planet.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/pickup">
              <Button size="lg" className="group">
                Schedule Pickup
                <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/education">
              <Button variant="outline" size="lg" className="border-eco-cream text-eco-cream hover:bg-eco-cream hover:text-eco-dark">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: "Waste Diverted", value: "12.4k", unit: "Tons", icon: Recycle },
          { label: "Trees Saved", value: "45.2k", unit: "Trees", icon: Leaf },
          { label: "CO2 Reduced", value: "8.1k", unit: "Metric Tons", icon: Globe },
          { label: "Communities", value: "150+", unit: "Cities", icon: ShieldCheck },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="text-center space-y-2 group hover:bg-eco-green hover:text-white transition-all duration-500">
              <div className="w-12 h-12 rounded-full bg-eco-leaf/20 flex items-center justify-center mx-auto text-eco-green group-hover:bg-white/20 group-hover:text-white transition-colors">
                <stat.icon size={24} />
              </div>
              <div className="text-4xl font-serif font-bold tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-60">
                {stat.label}
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl leading-tight">
              A smarter way to <br />
              <span className="italic text-eco-green">restore</span> our world.
            </h2>
            <p className="text-eco-dark/70 leading-relaxed">
              We provide end-to-end solutions for individuals and businesses to
              minimize their environmental footprint. From smart pickup
              scheduling to real-time impact tracking.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Smart Pickup Scheduling",
                desc: "AI-optimized routes for efficient waste collection and lower emissions.",
              },
              {
                title: "Impact Dashboard",
                desc: "Visualize your contribution to the circular economy with detailed metrics.",
              },
              {
                title: "Educational Resources",
                desc: "Learn how to compost, recycle, and reduce waste effectively at home.",
              },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-green mt-1">
                  <div className="w-2 h-2 rounded-full bg-current" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{feature.title}</h4>
                  <p className="text-sm text-eco-dark/60">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000"
              alt="Sustainable living"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20, x: -20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl max-w-xs space-y-4 border border-eco-leaf/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-eco-green flex items-center justify-center text-white">
                <ShieldCheck size={20} />
              </div>
              <span className="font-bold">Verified Impact</span>
            </div>
            <p className="text-xs text-eco-dark/60 leading-relaxed">
              Every gram of waste we collect is tracked and verified to ensure it
              reaches the right regenerative facility.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl">Voices of <span className="italic text-eco-green">Change</span></h2>
          <p className="text-eco-dark/60 max-w-lg mx-auto">Hear from the people and businesses already making an impact with EcoRestore.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "EcoRestore changed how we think about waste. It's not just a chore anymore; it's a contribution to the planet.",
              author: "Sarah Jenkins",
              role: "Homeowner",
              img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
            },
            {
              quote: "The dashboard metrics are incredible. We've reduced our business waste by 40% in just six months.",
              author: "David Chen",
              role: "Cafe Owner",
              img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
            },
            {
              quote: "The educational guides are so easy to follow. My kids actually enjoy sorting the recycling now!",
              author: "Elena Rodriguez",
              role: "Teacher",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
            }
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="space-y-6 flex flex-col justify-between h-full">
                <p className="text-lg italic text-eco-dark/80 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.author} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-bold">{t.author}</div>
                    <div className="text-xs text-eco-dark/40 uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-eco-leaf/10 rounded-3xl p-12 md:p-24 text-center space-y-8 border border-eco-leaf/20"
      >
        <h2 className="text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
          Ready to join the <br />
          <span className="italic text-eco-green">regenerative movement?</span>
        </h2>
        <p className="text-lg text-eco-dark/60 max-w-xl mx-auto">
          Start your journey towards zero waste today. Join thousands of others
          making a real difference.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/pickup">
            <Button size="lg" className="px-12">Get Started Now</Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
