import * as React from "react";

interface Challenge {
  id: number;
  task: string;
  points: number;
  completed: boolean;
}

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  points: number;
  badges: string[];
  role: "user" | "admin" | "volunteer" | "driver";
  avatar: string;
  createdAt: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

interface UserContextType {
  user: { uid: string; email: string; displayName: string } | null;
  profile: UserProfile | null;
  loading: boolean;
  points: number;
  addPoints: (amount: number) => void;
  challenges: Challenge[];
  completeChallenge: (id: number) => void;
  badges: string[];
  addBadge: (badge: string) => void;
  notifications: Notification[];
  sendNotification: (title: string, message: string, type?: "info" | "success" | "warning") => void;
  markNotificationRead: (id: string) => void;
  isAdmin: boolean;
  isStaff: boolean;
  isDriver: boolean;
  login: (email: string, role?: string) => void;
  logout: () => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

const MOCK_USER: UserProfile = {
  uid: "mock-user-123",
  name: "Arjun Sharma",
  email: "arjun@example.com",
  points: 1250,
  badges: ["Eco Starter", "Recycle Master", "Compost Pro"],
  role: "user",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
  createdAt: new Date().toISOString(),
};

import { useToast } from "./ToastContext";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const [user, setUser] = React.useState<{ uid: string; email: string; displayName: string } | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "Welcome to EcoRestore!",
      message: "Start your journey by scheduling your first waste pickup.",
      timestamp: new Date().toISOString(),
      read: false,
      type: "info"
    }
  ]);
  const [challenges, setChallenges] = React.useState<Challenge[]>([
    { id: 1, task: "Compost kitchen scraps", points: 15, completed: false },
    { id: 2, task: "Use a reusable water bottle", points: 10, completed: false },
    { id: 3, task: "Identify 3 items with AI", points: 25, completed: false },
  ]);

  React.useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem("eco_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setProfile({ ...MOCK_USER, email: parsed.email, name: parsed.displayName });
    }
    setLoading(false);
  }, []);

  const login = (email: string, role: string = "user") => {
    const name = email.includes("admin") ? "Admin Sahib" : email.includes("driver") ? "Rajesh Driver" : "Arjun Sharma";
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
    const newUser = { uid: "mock-user-123", email, displayName: name };
    setUser(newUser);
    setProfile({ ...MOCK_USER, email, name, role: role as any, avatar });
    localStorage.setItem("eco_user", JSON.stringify({ ...newUser, role }));
    showToast(`Welcome back, ${name}!`, "success");
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("eco_user");
    showToast("Logged out successfully", "info");
  };

  const addPoints = (amount: number) => {
    if (!profile) return;
    setProfile(prev => prev ? { ...prev, points: prev.points + amount } : null);
    showToast(`Earned ${amount} points!`, "success");
  };

  const sendNotification = (title: string, message: string, type: "info" | "success" | "warning" = "info") => {
    const newNotif: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(title, type === "warning" ? "error" : type);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const completeChallenge = (id: number) => {
    const challenge = challenges.find(c => c.id === id);
    if (challenge && !challenge.completed) {
      setChallenges(prev => prev.map(c => c.id === id ? { ...c, completed: true } : c));
      addPoints(challenge.points);
      showToast(`Challenge completed: ${challenge.task}`, "success");
    }
  };

  const addBadge = (badge: string) => {
    if (!profile || profile.badges.includes(badge)) return;
    setProfile(prev => prev ? { ...prev, badges: [...prev.badges, badge] } : null);
    showToast(`New Badge Unlocked: ${badge}!`, "success");
  };

  const isAdmin = profile?.role === "admin";
  const isStaff = ["admin", "volunteer", "driver"].includes(profile?.role || "");
  const isDriver = profile?.role === "driver";

  return (
    <UserContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      points: profile?.points || 0, 
      addPoints, 
      challenges, 
      completeChallenge, 
      badges: profile?.badges || [], 
      addBadge,
      notifications,
      sendNotification,
      markNotificationRead,
      isAdmin,
      isStaff,
      isDriver,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
