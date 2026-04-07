import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { cn } from "../lib/utils";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const showToast = React.useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={cn(
                "pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl min-w-[300px] max-w-md border",
                toast.type === "success" ? "bg-white border-eco-green/20 text-eco-green" :
                toast.type === "error" ? "bg-white border-red-200 text-red-600" :
                "bg-white border-blue-200 text-blue-600"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                toast.type === "success" ? "bg-eco-green/10" :
                toast.type === "error" ? "bg-red-50" :
                "bg-blue-50"
              )}>
                {toast.type === "success" && <CheckCircle2 size={18} />}
                {toast.type === "error" && <AlertCircle size={18} />}
                {toast.type === "info" && <Info size={18} />}
              </div>
              <p className="text-sm font-medium flex-1">{toast.message}</p>
              <button 
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="p-1 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={16} className="opacity-40" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
