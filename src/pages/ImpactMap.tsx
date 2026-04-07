import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Search, Navigation, Info, Filter, Recycle, Trash2, Leaf, Truck, Bell, Send, CheckCircle2, Clock, X, ExternalLink, ShieldCheck, Calendar } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { cn } from "../lib/utils";
import { GoogleGenAI } from "@google/genai";
import { useUser } from "../contexts/UserContext";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Location {
  id: string;
  name: string;
  address: string;
  type: string;
  distance: string;
  url: string;
  status: "pending" | "collected" | "in-progress";
  isBin?: boolean;
  binStatus?: "empty" | "full" | "overflowing";
  lastUpdated?: string;
}

export default function ImpactMap() {
  const { user, isAdmin, isDriver, sendNotification } = useUser();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [locations, setLocations] = React.useState<Location[]>([
    { id: "1", name: "Green City Recycling", address: "456 Eco Blvd, Eco City", type: "Mixed Recycling", distance: "0.8 miles", url: "#", status: "pending" },
    { id: "2", name: "Community Compost Hub", address: "123 Garden Lane, Eco City", type: "Compost", distance: "1.2 miles", url: "#", status: "collected" },
    { id: "3", name: "Tech-Waste Solutions", address: "789 Silicon Way, Eco City", type: "E-Waste", distance: "2.5 miles", url: "#", status: "in-progress" },
    { id: "4", name: "Smart Bin #104", address: "Central Park Entrance", type: "Smart Bin", distance: "0.3 miles", url: "#", status: "pending", isBin: true, binStatus: "overflowing" },
    { id: "5", name: "Smart Bin #205", address: "Main St Metro", type: "Smart Bin", distance: "0.5 miles", url: "#", status: "pending", isBin: true, binStatus: "empty" },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | null>(null);
  const [isDriverMode, setIsDriverMode] = React.useState(false);
  const [adminMessage, setAdminMessage] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  const updateLocationStatus = (id: string, status: Location["status"]) => {
    setLocations(prev => prev.map(loc => 
      loc.id === id ? { ...loc, status, lastUpdated: new Date().toLocaleTimeString() } : loc
    ));
    if (status === "collected") {
      sendNotification("Pickup Completed", `Waste collected from ${locations.find(l => l.id === id)?.name}`, "success");
    }
  };

  const handleBroadcast = () => {
    if (!adminMessage.trim()) return;
    sendNotification("Centralized Alert", adminMessage, "info");
    setAdminMessage("");
  };

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Default to a central location if denied
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    }
  }, []);

  const findLocations = async () => {
    if (!searchQuery.trim() && !userLocation) return;
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find recycling centers, compost drop-offs, and eco-friendly waste disposal sites near ${searchQuery || "my current location"}.`,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: userLocation || undefined
            }
          }
        },
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const foundLocations: Location[] = chunks
          .filter((chunk: any) => chunk.maps)
          .map((chunk: any) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: chunk.maps.title,
            address: chunk.maps.uri.split("/").pop()?.replace(/\+/g, " ") || "Address not available",
            type: "Recycling Center",
            distance: "Nearby",
            url: chunk.maps.uri,
            status: "pending" as const,
          }));
        setLocations(foundLocations);
      } else {
        // Fallback mock data if no grounding results
        setLocations([
          { name: "Green City Recycling", address: "456 Eco Blvd, Eco City", type: "Mixed Recycling", distance: "0.8 miles", url: "#" },
          { name: "Community Compost Hub", address: "123 Garden Lane, Eco City", type: "Compost", distance: "1.2 miles", url: "#" },
          { name: "Tech-Waste Solutions", address: "789 Silicon Way, Eco City", type: "E-Waste", distance: "2.5 miles", url: "#" },
        ]);
      }
    } catch (error) {
      console.error("ImpactMap Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div className="text-center space-y-8 max-w-4xl mx-auto pt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-eco-green/10 border border-eco-green/20 text-eco-green text-[11px] font-bold uppercase tracking-[0.2em]"
        >
          <MapPin size={14} />
          Impact Locator
        </motion.div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
          Find Your <span className="italic font-serif text-eco-green">Local</span> <br />
          Regeneration <span className="text-eco-earth">Hub</span>
        </h1>
        <p className="text-xl text-eco-dark/60 leading-relaxed max-w-2xl mx-auto font-medium">
          Locate recycling centers, compost hubs, and sustainable disposal points near you.
        </p>

        {(isAdmin || isDriver) && (
          <div className="flex justify-center gap-4">
            <Button 
              variant={isDriverMode ? "earth" : "outline"}
              onClick={() => setIsDriverMode(!isDriverMode)}
              className="gap-2 rounded-2xl"
            >
              <Truck size={18} />
              {isDriverMode ? "Exit Driver Mode" : "Enter Driver Mode"}
            </Button>
            {isAdmin && (
              <Card variant="glass" className="p-2 flex gap-2 items-center rounded-2xl border-eco-green/20">
                <input 
                  type="text" 
                  placeholder="Broadcast to all..." 
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  className="bg-transparent outline-none px-4 text-sm w-48"
                />
                <Button size="sm" onClick={handleBroadcast} className="rounded-xl h-10 w-10 p-0">
                  <Send size={16} />
                </Button>
              </Card>
            )}
          </div>
        )}

        <div className="relative max-w-2xl mx-auto flex gap-4 group">
          <div className="relative flex-1">
            <Search size={24} className="absolute left-8 top-1/2 -translate-y-1/2 text-eco-dark/30 group-focus-within:text-eco-green transition-colors" />
            <input
              type="text"
              placeholder="Enter city or zip code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && findLocations()}
              className="w-full pl-20 pr-8 py-6 rounded-[2rem] bg-white border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all shadow-2xl shadow-eco-green/5 text-lg font-medium"
            />
          </div>
          <Button onClick={findLocations} disabled={isLoading} className="rounded-[2rem] px-10 h-16 shadow-xl shadow-eco-green/20">
            {isLoading ? "Searching..." : "Find"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Map Placeholder */}
        <Card variant="glass" className="lg:col-span-2 h-[650px] relative overflow-hidden border border-eco-leaf/10 rounded-[3rem] shadow-2xl bg-[#f8faf8]">
          {/* Mock Satellite Map Background - Mild Bright Palette */}
          <div className="absolute inset-0 opacity-100">
            <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
              {/* Soft Mint/Cream Base */}
              <rect width="800" height="600" fill="#f8faf8" />
              
              {/* Mild Green Landmass Layers */}
              <path d="M100 150C200 100 300 200 450 150C600 100 700 250 750 200V600H100V150Z" fill="#e8f5e9" opacity="0.6" />
              <path d="M0 400C150 350 300 500 500 450C700 400 800 550 800 600H0V400Z" fill="#f1f8e9" opacity="0.8" />
              
              {/* Forest Clusters - Softened */}
              <circle cx="200" cy="250" r="80" fill="#c8e6c9" opacity="0.3" />
              <circle cx="600" cy="400" r="120" fill="#dcedc8" opacity="0.3" />
              
              {/* Grid Lines - Subtle Dark */}
              <path d="M0 100H800M0 200H800M0 300H800M0 400H800M0 500H800" stroke="#2d5a27" strokeWidth="0.5" opacity="0.05" />
              <path d="M100 0V600M200 0V600M300 0V600M400 0V600M500 0V600M600 0V600M700 0V600" stroke="#2d5a27" strokeWidth="0.5" opacity="0.05" />
              
              {/* Atmosphere/Clouds - Soft White */}
              <motion.path 
                animate={{ x: [-100, 100] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                d="M50 100Q150 50 250 100T450 100" stroke="#ffffff" strokeWidth="40" opacity="0.4" strokeLinecap="round" 
              />
            </svg>
          </div>

          {/* Scanning Animation - Brighter */}
          <motion.div 
            animate={{ 
              top: ["0%", "100%", "0%"],
              opacity: [0, 0.2, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-eco-green/10 to-transparent z-0"
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative z-10 text-center space-y-6">
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-3xl bg-white/80 flex items-center justify-center text-eco-green mx-auto shadow-2xl shadow-eco-green/10 backdrop-blur-md border border-eco-green/20"
              >
                <MapPin size={48} />
              </motion.div>
              <div className="space-y-2">
                <p className="text-eco-dark/40 font-bold uppercase tracking-[0.2em] text-[10px]">Live Regeneration Feed</p>
                <div className="flex gap-3 justify-center">
                  <div className="w-2 h-2 rounded-full bg-eco-green shadow-lg shadow-eco-green/20 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-eco-earth shadow-lg shadow-eco-earth/20 animate-pulse delay-75" />
                  <div className="w-2 h-2 rounded-full bg-eco-leaf shadow-lg shadow-eco-leaf/20 animate-pulse delay-150" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Mock Map Markers */}
          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="absolute"
              style={{
                top: `${25 + (i * 15) % 50}%`,
                left: `${25 + (i * 20) % 50}%`,
              }}
            >
              <div className="relative flex flex-col items-center group">
                {/* Location Name Label - Brighter */}
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-8 bg-white/90 backdrop-blur-md text-eco-dark text-[10px] px-2 py-1 rounded-md whitespace-nowrap border border-eco-leaf/20 shadow-xl pointer-events-none font-bold"
                >
                  {loc.name}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedLocation(loc)}
                  className={cn(
                    "cursor-pointer p-2 rounded-full transition-all relative",
                    selectedLocation?.id === loc.id ? "bg-eco-green/20 scale-125" : "hover:bg-eco-green/10"
                  )}
                >
                  {loc.isBin ? (
                    <div className="relative">
                      <Trash2 
                        size={32} 
                        className={cn(
                          "drop-shadow-2xl transition-colors",
                          loc.binStatus === "overflowing" ? "text-red-500" : 
                          loc.binStatus === "full" ? "text-eco-earth" : "text-eco-green"
                        )} 
                      />
                      {loc.binStatus === "overflowing" && (
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-red-500 rounded-full blur-md -z-10"
                        />
                      )}
                    </div>
                  ) : (
                    <MapPin 
                      size={40} 
                      className={cn(
                        "drop-shadow-2xl transition-colors",
                        selectedLocation?.id === loc.id ? "text-eco-green" : "text-eco-leaf"
                      )} 
                    />
                  )}
                  {!loc.isBin && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-inner" />}
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Detailed Info Card (Overlay) */}
          <AnimatePresence>
            {selectedLocation && (
              <motion.div
                initial={{ opacity: 0, y: 20, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 20, x: "-50%" }}
                className="absolute bottom-8 left-1/2 z-50 w-full max-w-sm px-4"
              >
                <Card className="p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-eco-green/20 bg-white/95 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-eco-green/20">
                    <motion.div 
                      className="h-full bg-eco-green" 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                    />
                  </div>
                  
                  <button 
                    onClick={() => setSelectedLocation(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-eco-leaf/10 rounded-full transition-colors"
                  >
                    <X size={16} className="text-eco-dark/40" />
                  </button>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                          selectedLocation.isBin ? "bg-eco-earth/10 text-eco-earth" : "bg-eco-green/5 text-eco-green"
                        )}>
                          {selectedLocation.isBin ? `Smart Bin - ${selectedLocation.binStatus}` : selectedLocation.type}
                        </span>
                        <span className="text-[10px] font-bold text-eco-dark/40">{selectedLocation.distance} away</span>
                      </div>
                      <h3 className="text-xl font-serif text-eco-dark">{selectedLocation.name}</h3>
                      <p className="text-xs text-eco-dark/60 flex items-center gap-1">
                        <MapPin size={12} />
                        {selectedLocation.address}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 h-11 rounded-xl gap-2 text-xs"
                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedLocation.address)}`, '_blank')}
                      >
                        <Navigation size={14} />
                        Directions
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-11 w-11 p-0 rounded-xl"
                        onClick={() => setShowDetailsModal(true)}
                      >
                        <Info size={16} />
                      </Button>
                    </div>

                    {isDriverMode && (
                      <div className="pt-4 border-t border-eco-leaf/10 space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Update Status</p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            size="sm" 
                            variant={selectedLocation.status === "collected" ? "earth" : "outline"}
                            className="h-10 rounded-xl text-[10px] font-bold"
                            onClick={() => {
                              updateLocationStatus(selectedLocation.id, "collected");
                              setSelectedLocation(prev => prev ? { ...prev, status: "collected" } : null);
                            }}
                          >
                            <CheckCircle2 size={14} className="mr-1" />
                            Collected
                          </Button>
                          <Button 
                            size="sm" 
                            variant={selectedLocation.status === "in-progress" ? "leaf" : "outline"}
                            className="h-10 rounded-xl text-[10px] font-bold"
                            onClick={() => {
                              updateLocationStatus(selectedLocation.id, "in-progress");
                              setSelectedLocation(prev => prev ? { ...prev, status: "in-progress" } : null);
                            }}
                          >
                            <Clock size={14} className="mr-1" />
                            In Progress
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Sidebar: Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif">Nearby Locations</h3>
            <Button variant="ghost" size="sm" className="text-eco-green gap-2">
              <Filter size={14} />
              Filter
            </Button>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[530px] pr-2 custom-scrollbar">
            {locations.length > 0 ? (
              locations.map((loc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 space-y-4 group hover:border-eco-green/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            loc.isBin ? (loc.binStatus === "overflowing" ? "bg-red-500" : "bg-eco-green") :
                            (loc.status === "collected" ? "bg-eco-green" : loc.status === "in-progress" ? "bg-blue-500" : "bg-eco-earth")
                          )} />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-eco-green">
                            {loc.isBin ? `Smart Bin (${loc.binStatus})` : loc.type}
                          </span>
                        </div>
                        <h4 className="font-bold text-eco-dark group-hover:text-eco-green transition-colors">{loc.name}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-eco-dark/40">{loc.distance}</div>
                        {loc.lastUpdated && <div className="text-[8px] text-eco-dark/20 font-bold">{loc.lastUpdated}</div>}
                      </div>
                    </div>
                    <p className="text-xs text-eco-dark/60 leading-relaxed">
                      {loc.address}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-[10px] h-8 gap-2" onClick={() => window.open(loc.url, '_blank')}>
                        <Navigation size={12} />
                        Directions
                      </Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                        <Info size={12} />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-eco-leaf/10 flex items-center justify-center text-eco-dark/20 mx-auto">
                  <Search size={24} />
                </div>
                <p className="text-sm text-eco-dark/40">Search for a location to see nearby facilities.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Drop-off Points", desc: "Find community compost bins and recycling centers.", icon: Recycle, color: "text-eco-green", bg: "bg-eco-green/10" },
          { title: "Specialized Disposal", desc: "Locate e-waste, battery, and chemical disposal sites.", icon: Trash2, color: "text-eco-earth", bg: "bg-eco-earth/10" },
          { title: "Eco-Shops", desc: "Discover zero-waste stores and local sustainable markets.", icon: Leaf, color: "text-eco-dark", bg: "bg-eco-dark/10" },
        ].map((action, i) => (
          <Card key={i} className="p-8 flex items-center gap-6 group hover:translate-y-[-4px] transition-transform">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", action.bg, action.color)}>
              <action.icon size={32} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">{action.title}</h4>
              <p className="text-xs text-eco-dark/60 leading-relaxed">{action.desc}</p>
            </div>
          </Card>
        ))}
      </section>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedLocation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailsModal(false)}
              className="absolute inset-0 bg-eco-dark/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl"
            >
              <Card className="p-0 overflow-hidden border-eco-green/20 shadow-3xl">
                <div className="h-48 bg-eco-green/10 relative">
                  <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/eco/800/400')] bg-cover bg-center opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  <button 
                    onClick={() => setShowDetailsModal(false)}
                    className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-colors shadow-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-eco-green text-white text-[10px] font-bold uppercase tracking-widest">
                          {selectedLocation.type}
                        </span>
                        <div className={cn(
                          "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                          selectedLocation.status === "collected" ? "bg-eco-green/10 border-eco-green/20 text-eco-green" : "bg-eco-earth/10 border-eco-earth/20 text-eco-earth"
                        )}>
                          {selectedLocation.status === "collected" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          {selectedLocation.status}
                        </div>
                      </div>
                      <h2 className="text-4xl font-serif">{selectedLocation.name}</h2>
                      <p className="text-eco-dark/60 flex items-center gap-2">
                        <MapPin size={16} className="text-eco-green" />
                        {selectedLocation.address}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-eco-dark/40">About this Hub</h4>
                        <p className="text-sm text-eco-dark/70 leading-relaxed">
                          This facility specializes in {selectedLocation.type.toLowerCase()} and serves the local community with sustainable waste management solutions. Part of the EcoRestore network since 2024.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1 p-4 rounded-2xl bg-eco-leaf/5 border border-eco-leaf/10">
                          <ShieldCheck size={20} className="text-eco-green mb-2" />
                          <p className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Verified</p>
                          <p className="text-xs font-bold">Eco-Certified</p>
                        </div>
                        <div className="flex-1 p-4 rounded-2xl bg-eco-leaf/5 border border-eco-leaf/10">
                          <Calendar size={20} className="text-eco-earth mb-2" />
                          <p className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Operating</p>
                          <p className="text-xs font-bold">Mon - Sat</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 rounded-3xl bg-eco-dark text-white space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest opacity-50">Quick Actions</h4>
                        <div className="space-y-2">
                          <Button 
                            className="w-full justify-between bg-white/10 hover:bg-white/20 border-white/10"
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedLocation.address)}`, '_blank')}
                          >
                            Get Directions
                            <Navigation size={16} />
                          </Button>
                          <Button className="w-full justify-between bg-eco-green hover:bg-eco-green-light border-none">
                            Contact Hub
                            <ExternalLink size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
