import * as React from "react";
import { motion } from "motion/react";
import { Users, Heart, Globe, Calendar, MapPin, Plus, ArrowRight, ExternalLink, MessageSquare, ShieldCheck, Recycle, TrendingUp } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { cn } from "../lib/utils";
import { useUser } from "../contexts/UserContext";

const MOCK_NGOS = [
  { id: "1", name: "Green Bharat Foundation", mission: "Promoting sustainable living through community action across India.", website: "https://example.org", location: "New Delhi" },
  { id: "2", name: "Swachh Recycle", mission: "Making recycling accessible to every household in Mumbai.", website: "https://example.org", location: "Mumbai" },
  { id: "3", name: "Eco-Mitra Collective", mission: "Turning urban waste into nutrient-rich soil for local farmers.", website: "https://example.org", location: "Bangalore" },
];

const MOCK_DRIVES = [
  { id: "1", title: "Yamuna Bank Cleanup", description: "Join us for a morning of cleaning up the Yamuna river banks.", location: "Delhi", date: { toDate: () => new Date() }, participants: [1, 2, 3, 4, 5] },
  { id: "2", title: "Urban Forest Plantation", description: "Help us plant 500 native saplings in Sanjay Gandhi National Park.", location: "Mumbai", date: { toDate: () => new Date(Date.now() + 86400000 * 7) }, participants: [1, 2, 3] },
];

export default function NGOCollaboration() {
  const { isStaff, user } = useUser();
  const [ngos, setNgos] = React.useState<any[]>(MOCK_NGOS);
  const [drives, setDrives] = React.useState<any[]>(MOCK_DRIVES);

  React.useEffect(() => {
    // Mock data initialized above
  }, []);

  const joinDrive = (driveId: string) => {
    if (!user) return;
    // Logic to add user to participants list
    alert("Joining drive functionality coming soon!");
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-12 pt-12">
        <div className="space-y-8 max-w-3xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-eco-green/10 border border-eco-green/20 text-eco-green text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            <Users size={14} />
            Community Hub
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
            Collective <span className="italic font-serif text-eco-green">Impact</span> <br />
            for a <span className="text-eco-earth">Better World</span>
          </h1>
          <p className="text-xl text-eco-dark/60 font-medium leading-relaxed max-w-2xl">
            Collaborating with local NGOs and community clubs to organize awareness programs and regenerative drives.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button size="lg" className="h-16 px-10 rounded-3xl shadow-xl shadow-eco-green/20">
              Explore Drives
              <ArrowRight size={24} className="ml-3" />
            </Button>
            {isStaff && (
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-3xl gap-3">
                <Plus size={24} /> Organize Drive
              </Button>
            )}
          </div>
        </div>
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          {/* Decorative Orbiting Rings with Images & Icons */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-30px] border border-dashed border-eco-green/10 rounded-full"
          >
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden"
            >
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full bg-eco-cream" />
            </motion.div>
          </motion.div>

          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-60px] border border-dashed border-eco-leaf/10 rounded-full"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 right-1/4 translate-y-1/2 w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden"
            >
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Luna" alt="User" className="w-full h-full bg-eco-cream" />
            </motion.div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-0 -translate-x-1/2 w-8 h-8 rounded-full bg-eco-green flex items-center justify-center text-white shadow-lg"
            >
              <Heart size={14} fill="currentColor" />
            </motion.div>
          </motion.div>

          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-90px] border border-dashed border-eco-earth/5 rounded-full"
          >
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden"
            >
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden" alt="User" className="w-full h-full bg-eco-cream" />
            </motion.div>
          </motion.div>
          
          {/* Main Image Container - Optimized for a cleaner look */}
          <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md border border-white/30 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/50 shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800" 
                alt="Community Collaboration" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Soft Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-eco-green/10 to-transparent pointer-events-none" />
          </div>

          {/* Floating Stat Badge */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-xl p-5 rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-eco-leaf/10 z-20"
          >
            <div className="text-4xl font-serif font-bold text-eco-green tracking-tight">12+</div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-eco-dark/30 mt-1">Active Partners</div>
          </motion.div>
        </div>
      </div>

      {/* NGO Partners */}
      <div className="space-y-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-eco-green/10 flex items-center justify-center text-eco-green shadow-lg shadow-eco-green/5">
              <Heart size={24} />
            </div>
            <h2 className="text-3xl font-serif">NGO Partners</h2>
          </div>
          <Button variant="ghost" className="text-eco-green font-bold">View All Partners</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ngos.length > 0 ? ngos.map((ngo, i) => (
            <motion.div
              key={ngo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="glass" className="p-8 space-y-6 group hover:translate-y-[-8px] transition-all duration-500 rounded-[2rem] border-eco-leaf/10">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-eco-leaf/10 flex items-center justify-center text-eco-green group-hover:bg-eco-green group-hover:text-white transition-colors duration-500">
                    <Globe size={28} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <motion.a 
                      whileHover={{ scale: 1.1 }}
                      href={ngo.website} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2.5 rounded-xl bg-white shadow-sm border border-eco-leaf/10 text-eco-dark/20 hover:text-eco-green transition-colors"
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                    <span className="text-[9px] font-bold text-eco-dark/30 uppercase tracking-tighter">{ngo.location}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold group-hover:text-eco-green transition-colors">{ngo.name}</h3>
                  <p className="text-xs text-eco-dark/60 leading-relaxed font-medium line-clamp-3">{ngo.mission}</p>
                </div>
                <div className="pt-4 border-t border-eco-leaf/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-eco-green" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-eco-dark/40">Verified</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase font-bold tracking-widest text-eco-green">Partner Info</Button>
                </div>
              </Card>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center text-eco-dark/40 border-2 border-dashed border-eco-leaf/20 rounded-[3rem]">
              No NGO partners found.
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Awareness Drives */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-eco-green/10 flex items-center justify-center text-eco-green">
            <Calendar size={20} />
          </div>
          <h2 className="text-2xl font-serif">Awareness Drives</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {drives.length > 0 ? drives.map((drive) => (
            <Card key={drive.id} className="p-0 overflow-hidden border border-eco-leaf/20 flex flex-col md:row group">
              <div className="w-full md:w-48 h-48 md:h-auto bg-eco-leaf/10 relative overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400`} 
                  alt={drive.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-eco-green">
                  {drive.date?.toDate().toLocaleDateString()}
                </div>
              </div>
              <div className="flex-1 p-8 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{drive.title}</h3>
                  <p className="text-sm text-eco-dark/60 line-clamp-2">{drive.description}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-eco-dark/40">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {drive.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    {drive.participants?.length || 0} Joined
                  </div>
                </div>
                <Button onClick={() => joinDrive(drive.id)} className="w-full md:w-fit gap-2">
                  Join Drive
                  <ArrowRight size={16} />
                </Button>
              </div>
            </Card>
          )) : (
            <div className="col-span-full py-12 text-center text-eco-dark/40 border-2 border-dashed border-eco-leaf/20 rounded-3xl">
              No upcoming drives. Stay tuned!
            </div>
          )}
        </div>
      </div>

      {/* Community Engagement */}
      <Card className="p-12 bg-eco-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-eco-green/20 blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif leading-tight">Organize your own <span className="italic text-eco-leaf">Awareness Drive</span></h2>
            <p className="text-eco-cream/60 leading-relaxed">
              Are you part of a local club or NGO? Partner with EcoRestore to track your impact and engage with a wider community of regenerators.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-eco-leaf text-eco-dark hover:bg-white transition-colors">Apply as Partner</Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Contact Support</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Awareness", icon: MessageSquare },
              { label: "Action", icon: Recycle },
              { label: "Impact", icon: TrendingUp },
              { label: "Community", icon: Users },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-3 text-center">
                <item.icon size={24} className="text-eco-leaf" />
                <div className="text-xs font-bold uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
