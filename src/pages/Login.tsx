import * as React from "react";
import { motion } from "motion/react";
import { LogIn, Shield, Truck, User, ArrowRight, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useUser } from "../contexts/UserContext";
import { cn } from "../lib/utils";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<"user" | "admin" | "driver">("user");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, selectedRole);
    navigate(selectedRole === "admin" ? "/admin" : selectedRole === "driver" ? "/map" : "/dashboard");
  };

  const roles = [
    { id: "user", label: "Regenerator", icon: User, desc: "Track your impact and earn points" },
    { id: "driver", label: "Collection Driver", icon: Truck, desc: "Manage pickups and update map" },
    { id: "admin", label: "Administrator", icon: Shield, desc: "Centralized control and analytics" },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-eco-green/10 border border-eco-green/20 text-eco-green text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            <Lock size={14} />
            Secure Access
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter leading-[0.9]">
            Welcome to <br />
            <span className="text-eco-green italic">EcoRestore</span>
          </h1>
          <p className="text-xl text-eco-dark/60 max-w-md mx-auto lg:mx-0">
            Join India's largest community-driven waste regeneration platform.
          </p>
          
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <Card className="p-6 bg-white/50 border-eco-leaf/10">
              <div className="text-2xl font-bold text-eco-green mb-1">10k+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Active Users</div>
            </Card>
            <Card className="p-6 bg-white/50 border-eco-leaf/10">
              <div className="text-2xl font-bold text-eco-earth mb-1">500+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Truck Drivers</div>
            </Card>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card variant="glass" className="p-8 md:p-12 border-eco-leaf/10 shadow-2xl rounded-[3rem]">
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-eco-dark/40 ml-2">
                  Select Your Role
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id as any)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group",
                        selectedRole === role.id 
                          ? "border-eco-green bg-eco-green/5 ring-4 ring-eco-green/10" 
                          : "border-eco-leaf/10 hover:border-eco-green/30 bg-white"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                        selectedRole === role.id ? "bg-eco-green text-white" : "bg-eco-leaf/10 text-eco-green"
                      )}>
                        <role.icon size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-eco-dark">{role.label}</div>
                        <div className="text-[10px] text-eco-dark/40 font-medium">{role.desc}</div>
                      </div>
                      {selectedRole === role.id && (
                        <motion.div layoutId="check" className="ml-auto text-eco-green">
                          <ArrowRight size={20} />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-eco-dark/40 ml-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-eco-dark/30" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-16 rounded-2xl text-lg gap-2 shadow-xl shadow-eco-green/20">
                  Continue to Dashboard
                  <ArrowRight size={20} />
                </Button>
              </div>

              <p className="text-center text-[10px] text-eco-dark/30 font-medium">
                By continuing, you agree to EcoRestore's <br />
                <a href="#" className="underline hover:text-eco-green">Terms of Service</a> and <a href="#" className="underline hover:text-eco-green">Privacy Policy</a>.
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
