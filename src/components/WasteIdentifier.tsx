import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Sparkles, AlertCircle, CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { Button } from "./Button";
import { Card } from "./Card";
import { cn } from "../lib/utils";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export function WasteIdentifier() {
  const [image, setImage] = React.useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<{
    category: "Compost" | "Recycle" | "Trash" | "Hazardous";
    confidence: number;
    reason: string;
    tips: string[];
  } | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const ai = getAI();
      if (!ai) {
        throw new Error("AI features are currently unavailable. Please check your configuration.");
      }
      const base64Data = image.split(",")[1];
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: "Identify this item and determine if it is Compost, Recycle, Trash, or Hazardous waste. Provide the category, a confidence score (0-1), a brief reason, and 2-3 disposal tips. Format the response as JSON." },
              { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text);
      setResult(data);
    } catch (err) {
      console.error("AI Analysis Error:", err);
      setError("Failed to analyze image. Please try again with a clearer photo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const categoryColors = {
    Compost: "text-eco-green bg-eco-green/10 border-eco-green/20",
    Recycle: "text-blue-600 bg-blue-50 border-blue-100",
    Trash: "text-eco-dark bg-eco-dark/5 border-eco-dark/10",
    Hazardous: "text-eco-earth bg-eco-earth/10 border-eco-earth/20",
  };

  return (
    <Card className="p-8 space-y-6 border border-eco-leaf/20 overflow-hidden relative">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-eco-green/10 flex items-center justify-center text-eco-green">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-xl font-serif">AI Waste Identifier</h3>
          <p className="text-xs text-eco-dark/40 font-medium uppercase tracking-widest">Powered by Gemini</p>
        </div>
      </div>

      {!image ? (
        <div className="relative group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="aspect-video rounded-2xl border-2 border-dashed border-eco-leaf/30 flex flex-col items-center justify-center text-center p-8 transition-all group-hover:border-eco-green group-hover:bg-eco-leaf/5">
            <div className="w-16 h-16 rounded-full bg-eco-leaf/10 flex items-center justify-center text-eco-green mb-4 group-hover:scale-110 transition-transform">
              <Camera size={32} />
            </div>
            <h4 className="font-bold">Snap or Upload a Photo</h4>
            <p className="text-xs text-eco-dark/40 max-w-[200px]">We'll tell you exactly how to dispose of it responsibly.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-eco-leaf/10">
            <img src={image} alt="To identify" className="w-full h-full object-cover" />
            <button
              onClick={() => setImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <XCircle size={20} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!result && !isAnalyzing && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Button onClick={analyzeImage} className="w-full py-4 gap-2">
                  Identify Item
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            )}

            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                <Loader2 size={32} className="text-eco-green animate-spin" />
                <p className="text-sm font-medium text-eco-dark/60">Analyzing with AI...</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-red-50 text-red-600 flex items-center gap-3 text-sm"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className={cn(
                  "p-6 rounded-2xl border-2 flex items-center justify-between",
                  categoryColors[result.category]
                )}>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Category</div>
                    <div className="text-2xl font-serif font-bold">{result.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Confidence</div>
                    <div className="text-xl font-bold">{(result.confidence * 100).toFixed(0)}%</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm">Why?</h4>
                    <p className="text-sm text-eco-dark/70 leading-relaxed">{result.reason}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm">Disposal Tips</h4>
                    <ul className="space-y-2">
                      {result.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-eco-dark/60">
                          <CheckCircle2 size={16} className="text-eco-green mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button variant="outline" onClick={() => setImage(null)} className="w-full">
                  Scan Another Item
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </Card>
  );
}
