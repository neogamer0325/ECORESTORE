import * as React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Truck, MapPin, Calendar, Clock, Package, Recycle, Trash2, ShieldCheck, Camera, Leaf } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { cn } from "../lib/utils";

export default function Pickup() {
  const [step, setStep] = React.useState(1);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleConfirm = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="w-24 h-24 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-green mx-auto">
            <ShieldCheck size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-serif">Pickup Scheduled!</h2>
            <p className="text-eco-dark/60 leading-relaxed">
              Your pickup has been confirmed for <span className="font-bold text-eco-dark">Oct 28, 2026</span>. 
              We've sent a confirmation email with all the details.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link to="/dashboard">
              <Button className="w-full py-4">Go to Dashboard</Button>
            </Link>
            <Button variant="ghost" onClick={() => setIsSuccess(false)}>
              Schedule another pickup
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-eco-green flex items-center justify-center text-white mx-auto shadow-lg">
          <Truck size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl">Schedule a <span className="italic text-eco-green">Pickup</span></h1>
        <p className="text-eco-dark/60 max-w-lg mx-auto">
          Tell us what you have, and we'll handle the rest. Our regenerative
          partners will ensure every resource is restored.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative h-1 bg-eco-leaf/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "33.33%" }}
          animate={{ width: `${(step / 3) * 100}%` }}
          className="absolute top-0 left-0 h-full bg-eco-green"
        />
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
      >
        {step === 1 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-serif">What are we collecting?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: "compost", label: "Compost", icon: Leaf, desc: "Food scraps, yard waste" },
                { id: "recycling", label: "Recycling", icon: Recycle, desc: "Paper, plastic, glass" },
                { id: "ewaste", label: "E-Waste", icon: Package, desc: "Electronics, batteries" },
                { id: "hazardous", label: "Hazardous", icon: ShieldCheck, desc: "Paint, chemicals, bulbs" },
                { id: "general", label: "General", icon: Trash2, desc: "Non-recyclable waste" },
                { id: "other", label: "Other", icon: Package, desc: "Furniture, large items" },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={cn(
                    "text-left p-6 rounded-2xl border-2 transition-all duration-300 group",
                    selectedTypes.includes(type.id)
                      ? "border-eco-green bg-eco-green/5 shadow-md"
                      : "border-eco-leaf/10 bg-white hover:border-eco-leaf/30"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                    selectedTypes.includes(type.id) ? "bg-eco-green text-white" : "bg-eco-leaf/10 text-eco-green"
                  )}>
                    <type.icon size={24} />
                  </div>
                  <h4 className="font-bold text-lg mb-1">{type.label}</h4>
                  <p className="text-xs text-eco-dark/60 leading-relaxed">{type.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                size="lg"
                disabled={selectedTypes.length === 0}
                onClick={() => setStep(2)}
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-serif">When and where?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-eco-dark/40">Pickup Address</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-eco-dark/40" />
                    <input
                      type="text"
                      placeholder="123 Green Way, Eco City"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-eco-dark/40">Pickup Date</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-eco-dark/40" />
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-eco-dark/40">Preferred Time</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-eco-dark/40" />
                    <select className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all appearance-none">
                      <option>Morning (8 AM - 12 PM)</option>
                      <option>Afternoon (12 PM - 4 PM)</option>
                      <option>Evening (4 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-eco-dark/40">Special Instructions</label>
                  <textarea
                    placeholder="Leave at the gate, call upon arrival, etc."
                    className="w-full p-4 rounded-xl border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all h-[210px] resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button size="lg" onClick={() => setStep(3)}>
                Next Step
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-serif">Confirm and submit</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="space-y-6">
                <h4 className="font-bold text-lg border-b border-eco-leaf/10 pb-4">Pickup Summary</h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-eco-dark/40">Items</span>
                    <span className="font-medium">{selectedTypes.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-eco-dark/40">Location</span>
                    <span className="font-medium">123 Green Way, Eco City</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-eco-dark/40">Date</span>
                    <span className="font-medium">Oct 28, 2026</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-eco-dark/40">Time</span>
                    <span className="font-medium">Morning (8 AM - 12 PM)</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-eco-leaf/10 flex justify-between items-center">
                  <span className="font-bold">Estimated Impact</span>
                  <span className="text-eco-green font-bold">+25 pts</span>
                </div>
              </Card>
              <div className="space-y-6">
                <div className="p-8 rounded-2xl border-2 border-dashed border-eco-leaf/30 flex flex-col items-center justify-center text-center space-y-4 group hover:border-eco-green transition-colors cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-eco-leaf/10 flex items-center justify-center text-eco-green group-hover:bg-eco-green group-hover:text-white transition-all">
                    <Camera size={32} />
                  </div>
                  <div>
                    <h5 className="font-bold">Add a Photo</h5>
                    <p className="text-xs text-eco-dark/40">Help our team identify your items faster.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-eco-leaf/5 text-xs text-eco-dark/60 leading-relaxed">
                  <ShieldCheck size={16} className="text-eco-green flex-shrink-0 mt-0.5" />
                  <p>By scheduling this pickup, you agree to our terms of service and confirm that the items listed are safe for collection.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button size="lg" className="px-12" onClick={handleConfirm}>
                Confirm Pickup
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

