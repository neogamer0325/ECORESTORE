import * as React from "react";
import { motion } from "motion/react";
import { ClipboardList, Plus, Trash2, Recycle, Leaf, ArrowRight, Save, History, PieChart as PieChartIcon } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { cn } from "../lib/utils";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#2D5A27", "#8B9D83", "#4A3728", "#E5E7EB"];

export default function WasteAudit() {
  const { addPoints, user } = useUser();
  const { showToast } = useToast();
  const [items, setItems] = React.useState<{ type: string; weight: number }[]>([]);
  const [currentType, setCurrentType] = React.useState("Recycling");
  const [currentWeight, setCurrentWeight] = React.useState("");
  const [isSaved, setIsSaved] = React.useState(false);

  const addItem = () => {
    if (!currentWeight || isNaN(Number(currentWeight))) {
      showToast("Please enter a valid weight", "error");
      return;
    }
    setItems([...items, { type: currentType, weight: Number(currentWeight) }]);
    setCurrentWeight("");
    showToast(`Added ${currentWeight}kg of ${currentType}`, "info");
  };

  const removeItem = (index: number) => {
    const item = items[index];
    setItems(items.filter((_, i) => i !== index));
    showToast(`Removed ${item.type}`, "info");
  };

  const saveAudit = () => {
    if (items.length === 0 || !user) return;
    
    const totalPoints = items.length * 10;
    addPoints(totalPoints);
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    setItems([]);
    showToast("Audit saved and points awarded!", "success");
  };

  const chartData = [
    { name: "Recycling", value: items.filter(i => i.type === "Recycling").reduce((acc, curr) => acc + curr.weight, 0) },
    { name: "Compost", value: items.filter(i => i.type === "Compost").reduce((acc, curr) => acc + curr.weight, 0) },
    { name: "Landfill", value: items.filter(i => i.type === "Landfill").reduce((acc, curr) => acc + curr.weight, 0) },
    { name: "Other", value: items.filter(i => i.type === "Other").reduce((acc, curr) => acc + curr.weight, 0) },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl">Waste <span className="italic text-eco-green">Audit</span></h1>
          <p className="text-eco-dark/60 font-medium">Track and analyze your household waste to optimize your impact.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <History size={16} />
            History
          </Button>
          <Button size="sm" className="gap-2" onClick={saveAudit} disabled={items.length === 0}>
            <Save size={16} />
            {isSaved ? "Saved!" : "Save Audit"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <Card className="p-8 space-y-8 border border-eco-leaf/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-eco-green/10 flex items-center justify-center text-eco-green">
              <Plus size={20} />
            </div>
            <h3 className="text-xl font-serif">Log Waste</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Waste Type</label>
              <div className="grid grid-cols-2 gap-2">
                {["Recycling", "Compost", "Landfill", "Other"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setCurrentType(type)}
                    className={cn(
                      "py-3 rounded-xl border-2 text-xs font-bold transition-all",
                      currentType === type ? "border-eco-green bg-eco-green/5 text-eco-green" : "border-eco-leaf/10 hover:border-eco-green/30"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                placeholder="0.0"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-eco-leaf/5 border border-eco-leaf/10 focus:border-eco-green outline-none transition-all"
              />
            </div>

            <Button onClick={addItem} className="w-full gap-2">
              <Plus size={18} />
              Add to Audit
            </Button>
          </div>
        </Card>

        {/* List Section */}
        <Card className="lg:col-span-2 p-0 overflow-hidden border border-eco-leaf/20 flex flex-col">
          <div className="p-6 border-b border-eco-leaf/20 flex justify-between items-center bg-eco-leaf/5">
            <h3 className="text-xl font-serif">Current Audit Items</h3>
            <div className="text-xs font-bold text-eco-dark/40 uppercase tracking-widest">
              Total: {items.reduce((acc, curr) => acc + curr.weight, 0).toFixed(1)} kg
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto min-h-[300px] p-6">
            {items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-eco-leaf/10 group hover:border-eco-green/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        item.type === "Recycling" ? "bg-eco-green/10 text-eco-green" :
                        item.type === "Compost" ? "bg-eco-leaf/10 text-eco-leaf" :
                        item.type === "Landfill" ? "bg-eco-earth/10 text-eco-earth" : "bg-eco-dark/10 text-eco-dark"
                      )}>
                        {item.type === "Recycling" ? <Recycle size={16} /> :
                         item.type === "Compost" ? <Leaf size={16} /> : <Trash2 size={16} />}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{item.type}</div>
                        <div className="text-[10px] text-eco-dark/40">{item.weight} kg</div>
                      </div>
                    </div>
                    <button onClick={() => removeItem(i)} className="p-2 text-eco-dark/20 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-eco-leaf/10 flex items-center justify-center text-eco-dark/20">
                  <ClipboardList size={32} />
                </div>
                <p className="text-sm text-eco-dark/40 max-w-xs">
                  Your audit is empty. Start adding items to see your waste breakdown.
                </p>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-8 border-t border-eco-leaf/20 bg-eco-leaf/5 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="middle" align="right" layout="vertical" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-1">
                  <h4 className="font-serif text-lg">Impact Summary</h4>
                  <p className="text-xs text-eco-dark/60 leading-relaxed">
                    Based on your current audit, you are diverting <span className="font-bold text-eco-green">
                      {((items.filter(i => i.type !== "Landfill").reduce((acc, curr) => acc + curr.weight, 0) / items.reduce((acc, curr) => acc + curr.weight, 0)) * 100).toFixed(0)}%
                    </span> of your waste.
                  </p>
                </div>
                <Button variant="outline" className="w-fit gap-2">
                  View Detailed Analysis
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
