import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Home, BarChart2, Truck, BookOpen, User, Leaf, MapPin, ClipboardList, Shield, Users, LogIn, LogOut, Bell } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import { EcoCoach } from "./EcoCoach";
import { useUser } from "../contexts/UserContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isAdmin, isStaff, isDriver, loading, logout, notifications, markNotificationRead } = useUser();
  const [isNotifOpen, setIsNotifOpen] = React.useState(false);

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/dashboard", icon: BarChart2, label: "Dashboard" },
    { path: "/pickup", icon: Truck, label: "Pickup" },
    { path: "/map", icon: MapPin, label: "Map" },
    { path: "/audit", icon: ClipboardList, label: "Audit" },
    { path: "/community", icon: Users, label: "Community" },
    { path: "/education", icon: BookOpen, label: "Learn" },
    ...(isStaff ? [{ path: "/admin", icon: Shield, label: "Admin" }] : []),
  ];

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-eco-green/20 selection:text-eco-green">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-eco-cream/80 backdrop-blur-xl border-b border-eco-leaf/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-12 h-12 rounded-2xl bg-eco-green flex items-center justify-center text-white shadow-lg shadow-eco-green/20"
            >
              <Truck size={28} />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-eco-green tracking-tight leading-none">
                EcoRestore
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-eco-dark/40 mt-1">
                Regenerating India
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative py-2 group",
                  location.pathname === item.path
                    ? "text-eco-green"
                    : "text-eco-dark/50 hover:text-eco-green"
                )}
              >
                {item.label}
                <motion.div 
                  initial={false}
                  animate={{ 
                    width: location.pathname === item.path ? "100%" : "0%",
                    opacity: location.pathname === item.path ? 1 : 0
                  }}
                  className="absolute bottom-0 left-0 h-0.5 bg-eco-green rounded-full"
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-eco-leaf/10 text-eco-dark/60 transition-colors relative"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isNotifOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-eco-leaf/10 overflow-hidden z-[60]"
                      >
                        <div className="p-6 border-b border-eco-leaf/10 flex justify-between items-center">
                          <h3 className="font-serif font-bold">Notifications</h3>
                          <span className="text-[10px] font-bold text-eco-green bg-eco-green/10 px-2 py-0.5 rounded-full">
                            {unreadCount} New
                          </span>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length > 0 ? notifications.map((n) => (
                            <div 
                              key={n.id} 
                              onClick={() => markNotificationRead(n.id)}
                              className={cn(
                                "p-4 border-b border-eco-leaf/5 hover:bg-eco-leaf/5 transition-colors cursor-pointer",
                                !n.read && "bg-eco-green/5"
                              )}
                            >
                              <div className="font-bold text-xs mb-1">{n.title}</div>
                              <div className="text-[10px] text-eco-dark/60 line-clamp-2">{n.message}</div>
                              <div className="text-[8px] text-eco-dark/30 mt-2 font-bold uppercase tracking-widest">
                                {new Date(n.timestamp).toLocaleTimeString()}
                              </div>
                            </div>
                          )) : (
                            <div className="p-12 text-center text-eco-dark/30 text-xs">
                              No notifications yet
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/profile" className="hidden md:flex items-center gap-4 group px-2 py-1 rounded-2xl hover:bg-eco-leaf/10 transition-colors">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md transition-transform group-hover:scale-105 bg-eco-leaf/10">
                    <img 
                      src={profile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-xs font-bold text-eco-dark leading-tight">{profile?.name || user.displayName}</div>
                    <div className="text-[9px] text-eco-dark/40 font-bold uppercase tracking-[0.15em] mt-0.5">
                      {isAdmin ? "Administrator" : isDriver ? "Collection Driver" : "Regenerator"}
                    </div>
                  </div>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden md:flex text-eco-dark/30 hover:text-red-500 hover:bg-red-50">
                  <LogOut size={20} />
                </Button>
              </div>
            ) : (
              <Button size="md" onClick={handleLogin} className="gap-2 shadow-lg shadow-eco-green/20">
                <LogIn size={18} />
                Sign In
              </Button>
            )}
            <button className="xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-eco-leaf/10 transition-colors">
              <div className="w-6 h-0.5 bg-eco-dark/60 rounded-full" />
              <div className="w-4 h-0.5 bg-eco-dark/60 rounded-full self-end" />
              <div className="w-6 h-0.5 bg-eco-dark/60 rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 py-8"
        >
          {children}
        </motion.div>
      </main>

      <EcoCoach />

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-eco-leaf/20 px-4 py-3 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              location.pathname === item.path
                ? "text-eco-green"
                : "text-eco-dark/40"
            )}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium uppercase tracking-wider">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <footer className="bg-eco-dark text-eco-cream/60 py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Truck size={24} className="text-eco-leaf" />
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                EcoRestore
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering India to regenerate our planet through smart,
              sustainable waste management and circular economy solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-serif text-lg mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/pickup" className="hover:text-white transition-colors">Schedule Pickup</Link></li>
                <li><Link to="/map" className="hover:text-white transition-colors">Impact Map</Link></li>
                <li><Link to="/audit" className="hover:text-white transition-colors">Waste Audit</Link></li>
                <li><Link to="/education" className="hover:text-white transition-colors">Learning Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-serif text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Impact Report</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-white font-serif text-lg mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Join our community for weekly sustainability tips.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/10 rounded-full px-4 py-2 text-sm flex-1 outline-none focus:ring-2 ring-eco-leaf/50 transition-all"
              />
              <button className="bg-eco-leaf text-eco-dark px-4 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col md:row justify-between items-center gap-4 text-xs">
          <p>© 2026 EcoRestore. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
