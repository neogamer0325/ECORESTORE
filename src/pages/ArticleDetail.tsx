import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, User, Share2, Bookmark, Leaf } from "lucide-react";
import { Button } from "../components/Button";

export default function ArticleDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto pb-24 space-y-12">
      {/* Back Button */}
      <Link to="/education">
        <Button variant="ghost" size="sm" className="gap-2 -ml-4">
          <ArrowLeft size={16} />
          Back to Learning Center
        </Button>
      </Link>

      {/* Article Header */}
      <header className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eco-green/10 text-eco-green text-[10px] font-bold uppercase tracking-widest">
            Composting
          </div>
          <h1 className="text-4xl md:text-7xl leading-[1.1] tracking-tight">
            The Ultimate Guide to <br />
            <span className="italic text-eco-green text-5xl md:text-8xl">Home Composting</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-8 border-y border-eco-leaf/20">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
              alt="Author"
              className="w-12 h-12 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="font-bold">Sarah Jenkins</div>
              <div className="text-xs text-eco-dark/40">Sustainability Expert</div>
            </div>
          </div>
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-eco-dark/40">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              Oct 22, 2026
            </div>
            <div className="flex items-center gap-2">
              <User size={14} />
              12 min read
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1591193686104-fddbaaf28b7e?auto=format&fit=crop&q=80&w=2000"
          alt="Composting"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Article Content */}
      <article className="prose prose-eco max-w-none space-y-8 text-lg leading-relaxed text-eco-dark/80">
        <p className="text-2xl font-serif italic text-eco-dark leading-snug">
          Composting is more than just a way to reduce waste; it's a fundamental act of regeneration. By turning our kitchen scraps and yard waste into nutrient-rich soil, we complete a vital ecological circle.
        </p>
        
        <h3 className="text-3xl font-serif text-eco-dark pt-8">Why Compost?</h3>
        <p>
          Food waste in landfills is a significant source of methane, a potent greenhouse gas. When we compost, we prevent this methane production and instead create a valuable resource that improves soil health, retains moisture, and reduces the need for chemical fertilizers.
        </p>

        <div className="bg-eco-leaf/10 p-8 rounded-3xl border border-eco-leaf/20 space-y-4">
          <h4 className="font-bold text-xl flex items-center gap-2">
            <Leaf size={20} className="text-eco-green" />
            The Golden Rule of Composting
          </h4>
          <p className="text-sm">
            Maintain a balance of "Greens" (nitrogen-rich materials like food scraps) and "Browns" (carbon-rich materials like dried leaves or cardboard). A ratio of 1:3 is generally ideal for a healthy, odorless compost pile.
          </p>
        </div>

        <h3 className="text-3xl font-serif text-eco-dark pt-8">Getting Started</h3>
        <p>
          You don't need a massive backyard to start composting. From small apartment-friendly worm bins (vermicomposting) to traditional outdoor piles, there's a method for every living situation.
        </p>
        
        <ul className="space-y-4 list-disc pl-6">
          <li><strong>Select your bin:</strong> Choose a container that fits your space and needs.</li>
          <li><strong>Layer your materials:</strong> Start with a base of browns for aeration.</li>
          <li><strong>Add your scraps:</strong> Bury food scraps under a layer of browns to prevent pests.</li>
          <li><strong>Turn and aerate:</strong> Use a pitchfork or tumbler to introduce oxygen every few weeks.</li>
        </ul>

        <p>
          Within a few months, you'll have "black gold"—rich, dark, earthy-smelling compost ready to nourish your plants and regenerate your local ecosystem.
        </p>
      </article>

      {/* Article Footer */}
      <footer className="pt-12 border-t border-eco-leaf/20 flex justify-between items-center">
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 size={16} />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Bookmark size={16} />
            Save
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-eco-dark/60">
          Was this helpful?
          <button className="hover:text-eco-green transition-colors">Yes</button>
          <span className="text-eco-leaf/30">/</span>
          <button className="hover:text-eco-earth transition-colors">No</button>
        </div>
      </footer>
    </div>
  );
}
