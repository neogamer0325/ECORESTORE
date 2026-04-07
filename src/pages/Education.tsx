import * as React from "react";
import { motion } from "motion/react";
import { BookOpen, Search, Play, ArrowRight, Leaf, Recycle, Globe, Droplets } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

import { SustainabilityQuiz } from "../components/SustainabilityQuiz";

export default function Education() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = [
    { label: "Segregation", icon: Recycle, count: "12 Articles", color: "bg-eco-green/10 text-eco-green" },
    { label: "Decomposition", icon: Leaf, count: "8 Articles", color: "bg-eco-earth/10 text-eco-earth" },
    { label: "Recycling", icon: Globe, count: "15 Articles", color: "bg-eco-dark/10 text-eco-dark" },
    { label: "Reuse", icon: Droplets, count: "6 Articles", color: "bg-blue-500/10 text-blue-500" },
  ];

  const allArticles = [
    {
      id: "waste-segregation-guide",
      title: "The Art of Waste Segregation",
      desc: "Learn how to properly separate your waste at the source to maximize recycling efficiency.",
      date: "Oct 22, 2026",
      read: "5 min read",
      category: "Segregation",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "decomposition-science",
      title: "Decomposition 101: Nature's Way",
      desc: "Understanding how different materials break down and how to accelerate the process through composting.",
      date: "Oct 18, 2026",
      read: "8 min read",
      category: "Decomposition",
      img: "https://images.unsplash.com/photo-1591375275653-031f6eef617b?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "circular-economy-recycling",
      title: "The Circular Economy: Recycling",
      desc: "How modern recycling facilities turn your old plastic and paper into new, valuable resources.",
      date: "Oct 15, 2026",
      read: "6 min read",
      category: "Recycling",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "creative-reuse-tips",
      title: "Creative Reuse: Upcycling Tips",
      desc: "Transforming everyday items into functional art and household tools to reduce waste.",
      date: "Oct 12, 2026",
      read: "10 min read",
      category: "Reuse",
      img: "https://images.unsplash.com/photo-1605600611284-195205751967?auto=format&fit=crop&q=80&w=400",
    }
  ];

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-24 pb-24">
      {/* Header */}
      <div className="text-center space-y-8 max-w-4xl mx-auto pt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-eco-green/10 border border-eco-green/20 text-eco-green text-[11px] font-bold uppercase tracking-[0.2em]"
        >
          <BookOpen size={14} />
          Knowledge Base
        </motion.div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
          The <span className="italic font-serif text-eco-green">Learning</span> <br />
          Center for <span className="text-eco-earth">Regenerators</span>
        </h1>
        <p className="text-xl text-eco-dark/60 leading-relaxed max-w-2xl mx-auto font-medium">
          Knowledge is the first step towards regeneration. Explore our curated
          resources to become a master of the circular economy.
        </p>
        <div className="relative max-w-2xl mx-auto group">
          <Search size={24} className="absolute left-8 top-1/2 -translate-y-1/2 text-eco-dark/30 group-focus-within:text-eco-green transition-colors" />
          <input
            type="text"
            placeholder="Search for topics (e.g., composting, recycling symbols)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-20 pr-8 py-6 rounded-[2rem] bg-white border-2 border-eco-leaf/10 focus:border-eco-green outline-none transition-all shadow-2xl shadow-eco-green/5 text-lg font-medium"
          />
        </div>
      </div>

      {/* Featured Article */}
      {!selectedCategory && !searchQuery && (
        <section className="relative overflow-hidden rounded-[4rem] bg-eco-dark text-eco-cream min-h-[600px] flex items-center p-10 md:p-20 shadow-2xl group">
          <motion.div 
            initial={{ scale: 1.1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 10 }}
            className="absolute inset-0 opacity-50"
          >
            <img
              src="https://images.unsplash.com/photo-1591193686104-fddbaaf28b7e?auto=format&fit=crop&q=80&w=2000"
              alt="Composting"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-eco-dark via-eco-dark/60 to-transparent" />
          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-eco-leaf/20 border border-eco-leaf/30 text-eco-leaf text-[11px] font-bold uppercase tracking-[0.2em]">
              Featured Guide
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
              The Ultimate Guide to <br />
              <span className="italic font-serif text-eco-leaf">Home Composting</span>
            </h2>
            <p className="text-xl text-eco-cream/70 leading-relaxed font-medium">
              Turn your kitchen scraps into black gold. Learn the science of
              decomposition and how to create a thriving compost pile in your own
              backyard.
            </p>
            <Link to="/education/composting-guide">
              <Button size="lg" className="group h-16 px-10 rounded-3xl">
                Read Full Guide
                <ArrowRight size={24} className="ml-3 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedCategory(selectedCategory === cat.label ? null : cat.label)}
            className={cn(
              "text-left p-8 rounded-3xl bg-white border transition-all duration-300 group",
              selectedCategory === cat.label ? "border-eco-green ring-2 ring-eco-green/20 shadow-lg" : "border-eco-leaf/10 hover:border-eco-green hover:shadow-md"
            )}
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", cat.color)}>
              <cat.icon size={24} />
            </div>
            <h4 className="font-bold text-lg mb-1">{cat.label}</h4>
            <p className="text-xs text-eco-dark/40 font-medium uppercase tracking-wider">{cat.count}</p>
          </button>
        ))}
      </section>

      {/* Recent Articles & Videos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-end">
            <h3 className="text-3xl font-serif">
              {selectedCategory ? `${selectedCategory} Articles` : searchQuery ? "Search Results" : "Recent Articles"}
            </h3>
            {(selectedCategory || searchQuery) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                className="text-eco-green"
              >
                Clear Filters
              </Button>
            )}
          </div>
          <div className="space-y-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link to={`/education/${article.id}`}>
                    <Card className="p-4 flex gap-6 group cursor-pointer hover:bg-eco-leaf/5">
                      <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={article.img}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col justify-center space-y-3">
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-eco-dark/40">
                          <span>{article.date}</span>
                          <span className="w-1 h-1 rounded-full bg-current" />
                          <span>{article.read}</span>
                          <span className="w-1 h-1 rounded-full bg-current" />
                          <span className="text-eco-green">{article.category}</span>
                        </div>
                        <h4 className="text-xl md:text-2xl font-serif leading-tight group-hover:text-eco-green transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-sm text-eco-dark/60 leading-relaxed line-clamp-2">
                          {article.desc}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-eco-leaf/10 flex items-center justify-center text-eco-dark/20 mx-auto">
                  <Search size={32} />
                </div>
                <h4 className="text-xl font-serif">No articles found</h4>
                <p className="text-sm text-eco-dark/40">Try adjusting your search or category filters.</p>
                <Button variant="outline" onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}>
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <h3 className="text-3xl font-serif">Video Guides</h3>
            <Button variant="ghost" size="sm" className="text-eco-green">View All</Button>
          </div>
          <div className="space-y-6">
            {[
              { title: "Composting 101", duration: "4:25", img: "https://images.unsplash.com/photo-1591193686104-fddbaaf28b7e?auto=format&fit=crop&q=80&w=400" },
              { title: "Zero Waste Kitchen", duration: "12:10", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400" },
              { title: "DIY Natural Cleaners", duration: "6:45", img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=400" },
            ].map((video, i) => (
              <div key={i} className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-video">
                <img
                  src={video.img}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                  <h5 className="font-bold text-sm">{video.title}</h5>
                  <span className="text-[10px] font-mono bg-black/50 px-2 py-1 rounded">{video.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <SustainabilityQuiz />
        </div>
      </div>
    </div>
  );
}

