import * as React from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, ArrowRight, Mail, Lock, User, ShieldCheck } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useUser } from "../contexts/UserContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="p-8 md:p-12 space-y-8">
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-10 h-10 rounded-xl bg-eco-green flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                <Leaf size={24} />
              </div>
              <span className="text-2xl font-serif font-bold text-eco-green tracking-tight">
                EcoRestore
              </span>
            </Link>
            <h1 className="text-3xl font-serif">Join the movement</h1>
            <p className="text-eco-dark/60 text-sm">Start your journey towards zero waste today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-eco-dark/40">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-eco-dark/40" />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-eco-dark/40">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-eco-dark/40" />
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-eco-dark/40">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-eco-dark/40" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-eco-leaf/5 text-[10px] text-eco-dark/60 leading-relaxed">
              <ShieldCheck size={16} className="text-eco-green flex-shrink-0 mt-0.5" />
              <p>By creating an account, you agree to our terms of service and privacy policy. We'll send you occasional updates about your impact and local challenges.</p>
            </div>
            <Button type="submit" className="w-full py-4 group">
              Create Account
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <div className="text-center text-sm text-eco-dark/60">
            Already have an account?{" "}
            <Link to="/login" className="text-eco-green font-bold hover:underline">
              Sign in here
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
