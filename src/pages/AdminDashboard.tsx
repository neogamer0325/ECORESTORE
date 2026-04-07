import * as React from "react";
import { motion } from "motion/react";
import { Users, MapPin, ClipboardList, Settings, Plus, Trash2, Edit2, CheckCircle2, AlertCircle, TrendingUp, Package, Recycle, Bell, Send } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { cn } from "../lib/utils";
import { useUser } from "../contexts/UserContext";

const MOCK_BINS = [
  { id: "1", location: "Central Park North", status: "empty", lastUpdated: { toDate: () => new Date() } },
  { id: "2", location: "Main St & 5th Ave", status: "half-full", lastUpdated: { toDate: () => new Date() } },
  { id: "3", location: "Eco Hub West", status: "full", lastUpdated: { toDate: () => new Date() } },
];

const MOCK_LOGS = [
  { id: "1", userId: "user_1", type: "Recycling", weight: 2.5, status: "completed", timestamp: { toDate: () => new Date() } },
  { id: "2", userId: "user_2", type: "Compost", weight: 1.8, status: "completed", timestamp: { toDate: () => new Date() } },
];

const MOCK_USERS = [
  { id: "1", name: "Arjun Sharma", email: "arjun@example.com", role: "admin", points: 1250 },
  { id: "2", name: "Sarah Jenkins", email: "sarah@example.com", role: "user", points: 840 },
];

export default function AdminDashboard() {
  const { isAdmin, isStaff, sendNotification } = useUser();
  const [bins, setBins] = React.useState<any[]>(MOCK_BINS);
  const [logs, setLogs] = React.useState<any[]>(MOCK_LOGS);
  const [users, setUsers] = React.useState<any[]>(MOCK_USERS);
  const [activeTab, setActiveTab] = React.useState<"bins" | "logs" | "users" | "notifications">("bins");
  const [isAddingBin, setIsAddingBin] = React.useState(false);
  const [newBin, setNewBin] = React.useState({ location: "", status: "empty", lat: 0, lng: 0 });
  const [notifForm, setNotifForm] = React.useState({ title: "", message: "", type: "info" as const });

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifForm.title || !notifForm.message) return;
    sendNotification(notifForm.title, notifForm.message, notifForm.type);
    setNotifForm({ title: "", message: "", type: "info" });
  };

  React.useEffect(() => {
    // Mock data initialized above
  }, [isStaff]);

  if (!isStaff) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <AlertCircle size={48} className="text-red-500" />
        <h2 className="text-2xl font-serif">Access Denied</h2>
        <p className="text-eco-dark/60">You do not have permission to view this page.</p>
      </div>
    );
  }

  const updateBinStatus = (id: string, status: string) => {
    setBins(prev => prev.map(b => b.id === id ? { ...b, status, lastUpdated: { toDate: () => new Date() } } : b));
  };

  const handleAddBin = (e: React.FormEvent) => {
    e.preventDefault();
    const bin = {
      id: Math.random().toString(36).substr(2, 9),
      ...newBin,
      lastUpdated: { toDate: () => new Date() }
    };
    setBins([...bins, bin]);
    setIsAddingBin(false);
    setNewBin({ location: "", status: "empty", lat: 0, lng: 0 });
  };

  const handleUpdateRole = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl">Admin <span className="italic text-eco-green">Command</span></h1>
          <p className="text-eco-dark/60 font-medium">Manage the EcoRestore infrastructure and community.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: users.length, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Active Bins", value: bins.length, icon: MapPin, color: "text-eco-green", bg: "bg-eco-green/10" },
          { label: "Waste Logs", value: logs.length, icon: ClipboardList, color: "text-eco-earth", bg: "bg-eco-earth/10" },
          { label: "NGO Partners", value: 4, icon: Package, color: "text-eco-dark", bg: "bg-eco-dark/10" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-eco-leaf/20 pb-px">
        {["bins", "logs", "users", "notifications"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all relative",
              activeTab === tab ? "text-eco-green" : "text-eco-dark/40 hover:text-eco-dark"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-eco-green rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-8">
        {activeTab === "bins" && (
          <Card className="p-0 overflow-hidden border border-eco-leaf/20">
            <div className="p-6 border-b border-eco-leaf/20 flex justify-between items-center bg-eco-leaf/5">
              <h3 className="text-xl font-serif">Smart Bin Management</h3>
              <Button size="sm" className="gap-2" onClick={() => setIsAddingBin(true)}>
                <Plus size={16} /> Add New Bin
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-eco-leaf/5 text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Last Updated</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-eco-leaf/10">
                  {bins.map((bin) => (
                    <tr key={bin.id} className="hover:bg-eco-leaf/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{bin.location}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                          bin.status === "empty" ? "bg-eco-green/10 text-eco-green" :
                          bin.status === "half-full" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                        )}>
                          {bin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-eco-dark/60">
                        {bin.lastUpdated?.toDate().toLocaleString() || "Never"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => updateBinStatus(bin.id, "empty")}>Reset</Button>
                          <Button variant="ghost" size="sm"><Edit2 size={14} /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "logs" && (
          <Card className="p-0 overflow-hidden border border-eco-leaf/20">
            <div className="p-6 border-b border-eco-leaf/20 bg-eco-leaf/5">
              <h3 className="text-xl font-serif">Waste Submission Logs</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-eco-leaf/5 text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">
                    <th className="px-6 py-4">User ID</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Weight</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-eco-leaf/10">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-eco-leaf/5 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono">{log.userId}</td>
                      <td className="px-6 py-4 text-sm">{log.type}</td>
                      <td className="px-6 py-4 text-sm">{log.weight} kg</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-eco-green/10 text-eco-green">
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-eco-dark/60">
                        {log.timestamp?.toDate().toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "users" && (
          <Card className="p-0 overflow-hidden border border-eco-leaf/20">
            <div className="p-6 border-b border-eco-leaf/20 bg-eco-leaf/5">
              <h3 className="text-xl font-serif">Community Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-eco-leaf/5 text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Points</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-eco-leaf/10">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-eco-leaf/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold">{u.name}</td>
                      <td className="px-6 py-4 text-sm text-eco-dark/60">{u.email}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={u.role || "user"} 
                          onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                          className="text-[10px] font-bold uppercase tracking-wider bg-eco-leaf/5 border border-eco-leaf/10 rounded-lg px-2 py-1 outline-none focus:border-eco-green"
                        >
                          <option value="user">User</option>
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                          <option value="volunteer">Volunteer</option>
                          <option value="area_head">Area Head</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-eco-green">{u.points}</td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm">Manage</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "notifications" && (
          <Card className="p-8 border border-eco-leaf/20 bg-eco-leaf/5">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-eco-green/10 text-eco-green flex items-center justify-center mx-auto mb-4">
                  <Bell size={32} />
                </div>
                <h3 className="text-2xl font-serif">Centralized <span className="italic text-eco-green">Broadcast</span></h3>
                <p className="text-sm text-eco-dark/60">Send important updates and alerts to all EcoRestore users instantly.</p>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40 ml-2">Notification Title</label>
                    <input
                      type="text"
                      required
                      value={notifForm.title}
                      onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all font-medium"
                      placeholder="e.g. Scheduled Maintenance"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40 ml-2">Message Content</label>
                    <textarea
                      required
                      rows={4}
                      value={notifForm.message}
                      onChange={(e) => setNotifForm({ ...notifForm, message: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all font-medium resize-none"
                      placeholder="Describe the update in detail..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40 ml-2">Priority Level</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["info", "success", "warning"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setNotifForm({ ...notifForm, type })}
                          className={cn(
                            "py-3 rounded-xl border-2 font-bold text-[10px] uppercase tracking-widest transition-all",
                            notifForm.type === type 
                              ? "border-eco-green bg-eco-green/5 text-eco-green" 
                              : "border-eco-leaf/10 bg-white text-eco-dark/40 hover:border-eco-green/30"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full h-16 rounded-2xl text-lg gap-2 shadow-xl shadow-eco-green/20">
                  <Send size={20} />
                  Broadcast Notification
                </Button>
              </form>
            </div>
          </Card>
        )}
      </div>

      {/* Add Bin Modal */}
      {isAddingBin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 space-y-6">
              <h3 className="text-2xl font-serif">Add New <span className="italic text-eco-green">Smart Bin</span></h3>
              <form onSubmit={handleAddBin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Location Name</label>
                  <input
                    type="text"
                    required
                    value={newBin.location}
                    onChange={(e) => setNewBin({ ...newBin, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-eco-leaf/5 border border-eco-leaf/10 focus:border-eco-green outline-none"
                    placeholder="e.g. Central Park North"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={newBin.lat}
                      onChange={(e) => setNewBin({ ...newBin, lat: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-eco-leaf/5 border border-eco-leaf/10 focus:border-eco-green outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={newBin.lng}
                      onChange={(e) => setNewBin({ ...newBin, lng: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-eco-leaf/5 border border-eco-leaf/10 focus:border-eco-green outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setIsAddingBin(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1">Create Bin</Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
