import * as React from "react";
import { motion } from "motion/react";
import { BarChart3, TrendingUp, Calendar, MapPin, Package, Recycle, Leaf, Trash2, ArrowUpRight, Trophy, User, Medal, CheckCircle2, Bell } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { cn } from "../lib/utils";
import { WasteIdentifier } from "../components/WasteIdentifier";
import { useUser } from "../contexts/UserContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const MOCK_LOGS = [
  { id: "1", timestamp: { toDate: () => new Date() }, type: "Recycling", weight: 2.5, status: "completed", pointsAwarded: 25 },
  { id: "2", timestamp: { toDate: () => new Date(Date.now() - 86400000) }, type: "Compost", weight: 1.8, status: "completed", pointsAwarded: 18 },
  { id: "3", timestamp: { toDate: () => new Date(Date.now() - 172800000) }, type: "Landfill", weight: 0.5, status: "pending", pointsAwarded: 5 },
];

const MOCK_NOTIFS = [
  { id: "1", title: "Pickup Scheduled", message: "Your recycling pickup is scheduled for tomorrow.", timestamp: new Date() },
];

export default function Dashboard() {
  const { profile, points, challenges, completeChallenge, user } = useUser();
  const [logs, setLogs] = React.useState<any[]>(MOCK_LOGS);
  const [notifications, setNotifications] = React.useState<any[]>(MOCK_NOTIFS);

  const score = Math.min(100, Math.floor((points / 2000) * 100));
  const scoreData = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  React.useEffect(() => {
    // In a real app, we'd fetch from an API here
    // For now, we just use the mock data initialized above
  }, [user]);

  const data = [
    { name: "Mon", value: 12 },
    { name: "Tue", value: 18 },
    { name: "Wed", value: 15 },
    { name: "Thu", value: 25 },
    { name: "Fri", value: 22 },
    { name: "Sat", value: 30 },
    { name: "Sun", value: 28 },
  ];

  const leaderboard = [
    { name: "Sarah J.", points: 1240, rank: 1, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" },
    { name: "David C.", points: 1150, rank: 2, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" },
    { name: "Elena R.", points: 980, rank: 3, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" },
    { name: profile?.name || "You", points: points, rank: 4, avatar: user?.photoURL || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" },
    { name: "Michael B.", points: 720, rank: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
  ];

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl">Welcome back, <span className="italic text-eco-green">Alex</span></h1>
          <p className="text-eco-dark/60 font-medium">Your regenerative impact is growing every day. You have <span className="text-eco-green font-bold">{points}</span> points.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar size={16} />
            Last 7 Days
          </Button>
          <Button size="sm" className="gap-2">
            <TrendingUp size={16} />
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card variant="glass" className="flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-eco-green/5 -z-10" />
          <div className="h-32 w-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={55}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#2D5A27" />
                  <Cell fill="#E5E7EB" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-serif font-bold text-eco-green">{score}</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-eco-dark/40">Score</span>
            </div>
          </div>
          <div className="text-center mt-4 space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-eco-dark/60">Sustainability</div>
            <div className="text-[10px] text-eco-green font-medium">Top 15% of users</div>
          </div>
        </Card>

        {[
          { label: "Waste Diverted", value: "142.5", unit: "kg", icon: Recycle, color: "text-eco-green", bg: "bg-eco-green/10", trend: "+12%" },
          { label: "CO2 Offset", value: "84.2", unit: "kg", icon: Leaf, color: "text-eco-earth", bg: "bg-eco-earth/10", trend: "+8%" },
          { label: "Pickups Completed", value: "12", unit: "times", icon: Package, color: "text-eco-dark", bg: "bg-eco-dark/10", trend: "+2" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="flex items-center gap-6 p-8 group hover:translate-y-[-4px] transition-transform relative overflow-hidden h-full">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon size={32} />
              </div>
              <div>
                <div className="text-sm font-bold uppercase tracking-widest text-eco-dark/40 mb-1 flex items-center gap-2">
                  {stat.label}
                  <span className="text-[10px] text-eco-green bg-eco-green/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <ArrowUpRight size={10} />
                    {stat.trend}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-bold tracking-tight">{stat.value}</span>
                  <span className="text-sm font-medium text-eco-dark/60">{stat.unit}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <Card className="lg:col-span-2 p-8 space-y-8 border border-eco-leaf/20">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif">Diversion Trend</h3>
              <p className="text-xs text-eco-dark/40 font-medium uppercase tracking-widest">Daily waste diverted (kg)</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-eco-green">
                <div className="w-2 h-2 rounded-full bg-eco-green" />
                Current Week
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2D5A27" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2D5A27"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Daily Challenges */}
        <Card className="p-8 space-y-6 border border-eco-leaf/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-eco-green/10 flex items-center justify-center text-eco-green">
              <Trophy size={20} />
            </div>
            <h3 className="text-xl font-serif">Daily Challenges</h3>
          </div>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div 
                key={challenge.id} 
                onClick={() => !challenge.completed && completeChallenge(challenge.id)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl bg-eco-leaf/5 border border-eco-leaf/10 group transition-all",
                  !challenge.completed && "hover:border-eco-green/30 cursor-pointer"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    challenge.completed ? "bg-eco-green border-eco-green text-white" : "border-eco-leaf/40 group-hover:border-eco-green"
                  )}>
                    {challenge.completed && <CheckCircle2 size={14} />}
                  </div>
                  <span className={cn("text-sm font-medium", challenge.completed && "text-eco-dark/40 line-through")}>
                    {challenge.task}
                  </span>
                </div>
                <span className="text-xs font-bold text-eco-green">+{challenge.points} pts</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full text-xs py-2">View All Challenges</Button>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Waste Identifier */}
        <WasteIdentifier />

        {/* Recent Activity Table */}
        <Card className="lg:col-span-2 p-0 overflow-hidden border border-eco-leaf/20">
          <div className="p-6 border-b border-eco-leaf/20 flex justify-between items-center bg-eco-leaf/5">
            <h3 className="text-xl font-serif">Recent Activity</h3>
            <div className="flex items-center gap-4">
              {notifications.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  <Bell size={12} />
                  {notifications.length} New
                </div>
              )}
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-eco-leaf/5 text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Weight</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-leaf/10">
                {logs.length > 0 ? logs.map((log, i) => (
                  <tr key={log.id} className="hover:bg-eco-leaf/5 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 text-sm font-medium">
                      {log.timestamp?.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          log.type === "Recycling" ? "bg-eco-green" :
                          log.type === "Compost" ? "bg-eco-leaf" : "bg-eco-earth"
                        )} />
                        <span className="text-sm">{log.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-eco-dark/60">{log.weight} kg</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                        log.status === "completed" ? "bg-eco-green/10 text-eco-green" : "bg-eco-earth/10 text-eco-earth"
                      )}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-eco-green">+{log.pointsAwarded} pts</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-eco-dark/40">
                      No recent activity found. Start auditing your waste!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="p-8 space-y-8 border border-eco-leaf/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-eco-earth/10 flex items-center justify-center text-eco-earth">
              <Trophy size={20} />
            </div>
            <h3 className="text-xl font-serif">Leaderboard</h3>
          </div>
          <div className="space-y-6">
            {leaderboard.map((user, i) => (
              <div key={i} className={cn(
                "flex items-center justify-between p-3 rounded-xl transition-all",
                user.name.includes("(You)") ? "bg-eco-green/10 border border-eco-green/20" : "hover:bg-eco-leaf/5"
              )}>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    {user.rank <= 3 && (
                      <div className={cn(
                        "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border-2 border-white",
                        user.rank === 1 ? "bg-yellow-400 text-yellow-900" : 
                        user.rank === 2 ? "bg-slate-300 text-slate-700" : 
                        "bg-orange-400 text-orange-900"
                      )}>
                        <Medal size={10} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{user.name}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Rank #{user.rank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-eco-green">{user.points}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Points</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full">View Global Rankings</Button>
        </Card>
      </div>
    </div>
  );
}

