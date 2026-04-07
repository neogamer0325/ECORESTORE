import * as React from "react";
import { motion } from "motion/react";
import { User, Settings, Bell, Shield, LogOut, Award, MapPin, Mail, Phone, Edit2, ChevronRight, BarChart3, TrendingUp, Zap, Users } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { cn } from "../lib/utils";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const scoreData = [
  { subject: "Waste", A: 120, fullMark: 150 },
  { subject: "Energy", A: 98, fullMark: 150 },
  { subject: "Water", A: 86, fullMark: 150 },
  { subject: "Transport", A: 99, fullMark: 150 },
  { subject: "Diet", A: 85, fullMark: 150 },
];

import { useUser } from "../contexts/UserContext";

export default function Profile() {
  const { profile, points, badges, user, isAdmin, logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-20 h-20 rounded-full bg-eco-leaf/10 flex items-center justify-center text-eco-dark/20">
          <User size={40} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif">Please Sign In</h2>
          <p className="text-eco-dark/60">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-24 space-y-12">
      {/* Profile Header */}
      <div className="relative h-64 md:h-80 rounded-[3rem] overflow-hidden shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000"
          alt="Cover"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute -bottom-16 left-8 md:left-16 flex items-end gap-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
              alt="Profile"
              className="w-40 h-40 md:w-48 md:h-48 rounded-[2.5rem] border-8 border-white object-cover shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileActive={{ scale: 0.9 }}
              className="absolute bottom-4 right-4 p-3 rounded-2xl bg-eco-green text-white shadow-xl hover:bg-eco-dark transition-colors"
            >
              <Edit2 size={20} />
            </motion.button>
          </motion.div>
          <div className="pb-20 text-white space-y-2">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{profile?.name || user.displayName}</h1>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white/20 backdrop-blur-md border border-white/30",
                isAdmin ? "text-purple-300" : "text-eco-leaf"
              )}>
                {profile?.role || "Regenerator"}
              </span>
            </div>
            <div className="flex items-center gap-4 text-white/70 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {user.email}
              </div>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Info & Stats */}
        <div className="space-y-10">
          <Card variant="glass" className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif">Impact Overview</h3>
              <TrendingUp size={24} className="text-eco-green" />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-eco-green/5 border border-eco-green/10">
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-eco-green" />
                  <span className="text-sm font-bold text-eco-dark/60">Total Points</span>
                </div>
                <span className="text-2xl font-serif font-bold text-eco-green">{points}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-eco-earth/5 border border-eco-earth/10">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-eco-earth" />
                  <span className="text-sm font-bold text-eco-dark/60">Global Rank</span>
                </div>
                <span className="text-2xl font-serif font-bold text-eco-earth">#142</span>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={scoreData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#9CA3AF", fontWeight: 600 }} />
                  <Radar
                    name="Alex"
                    dataKey="A"
                    stroke="#2D5A27"
                    fill="#2D5A27"
                    fillOpacity={0.5}
                    strokeWidth={3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card variant="brutal" className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-serif">Unlocked Badges</h3>
              <Award size={24} className="text-eco-green" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="aspect-square rounded-2xl bg-eco-leaf/10 flex items-center justify-center group cursor-help relative border border-eco-leaf/20"
                >
                  <Award size={28} className="text-eco-green group-hover:text-eco-dark transition-colors" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-eco-dark text-white text-[10px] font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap shadow-xl z-10">
                    {badge}
                  </div>
                </motion.div>
              ))}
              <div className="aspect-square rounded-2xl border-2 border-dashed border-eco-leaf/30 flex items-center justify-center text-eco-leaf/40 font-bold text-sm">
                +{12 - badges.length > 0 ? 12 - badges.length : 0}
              </div>
            </div>
            <p className="text-xs text-eco-dark/40 text-center font-medium italic">"The greatest threat to our planet is the belief that someone else will save it."</p>
          </Card>
        </div>

        {/* Right Column: Settings & Preferences */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-0 overflow-hidden">
            <div className="p-8 border-b border-eco-leaf/20 bg-eco-leaf/5">
              <h3 className="text-2xl font-serif">Account Settings</h3>
            </div>
            <div className="divide-y divide-eco-leaf/10">
              {[
                { icon: Bell, label: "Notifications", desc: "Manage your pickup alerts and impact updates", color: "text-blue-500" },
                { icon: Shield, label: "Privacy & Security", desc: "Control your data and account security", color: "text-purple-500" },
                { icon: Settings, label: "Preferences", desc: "Customize your dashboard and app experience", color: "text-eco-green" },
              ].map((item, i) => (
                <button key={i} className="w-full p-8 flex items-center justify-between hover:bg-eco-leaf/5 transition-colors text-left group">
                  <div className="flex items-center gap-6">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm border border-eco-leaf/10 group-hover:scale-110 transition-transform", item.color)}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <div className="font-bold">{item.label}</div>
                      <div className="text-sm text-eco-dark/40">{item.desc}</div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-eco-dark/20 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-8 border-red-100 bg-red-50/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="font-bold text-red-600">Danger Zone</h4>
                <p className="text-sm text-red-600/60">Once you delete your account, there is no going back. Please be certain.</p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-600 hover:text-white gap-2" onClick={handleLogout}>
                <LogOut size={18} />
                Sign Out
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
