import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, Calendar, User, ArrowRight, X, Sparkles } from 'lucide-react';
import { siteData, BlogPost } from '../data/siteData';

interface BlogPageProps {
  onSelectPackage: (slug: string) => void;
  onOpenEnquiry: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onSelectPackage,
  onOpenEnquiry,
}) => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F2E9] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3A6B]/10 text-[#1B3A6B] text-xs font-black uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#D9622B]" />
            <span>EXPEDITION NOTES &amp; FIELD GUIDES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1B3A6B] font-heading tracking-tight leading-tight">
            Dispatches from the Wild
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Written by our route captains, trek leaders, and travelers on the ground. Straightforward guides with zero fluff.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteData.blogs.map((blog: BlogPost) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm card-hover-lift flex flex-col justify-between"
            >
              <div>
                {/* Article Image */}
                <div
                  onClick={() => setActiveArticle(blog)}
                  className="relative h-56 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#1B3A6B] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-stone-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D9622B]" /> {blog.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#1B3A6B]" /> {blog.date}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveArticle(blog)}
                    className="font-heading font-black text-xl text-[#1B3A6B] hover:text-[#D9622B] transition-colors cursor-pointer leading-snug"
                  >
                    {blog.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D9622B]" /> By {blog.author}
                  </span>

                  <button
                    onClick={() => setActiveArticle(blog)}
                    className="text-xs font-black text-[#D9622B] hover:text-[#C35320] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reader Modal */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveArticle(null)}
                className="fixed inset-0 bg-[#0F1E36]/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <button
                    onClick={() => setActiveArticle(null)}
                    aria-label="Close article modal"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-5 left-6 right-6 text-white space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D9622B] text-white text-[10px] font-black uppercase tracking-wider">
                      {activeArticle.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-heading leading-tight">
                      {activeArticle.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto text-stone-700 text-sm leading-relaxed">
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-stone-100 font-semibold">
                    <span>Written by {activeArticle.author}</span>
                    <span>{activeArticle.date} · {activeArticle.readTime}</span>
                  </div>

                  <p className="text-base font-medium text-stone-900 leading-relaxed">
                    {activeArticle.excerpt}
                  </p>

                  <p>
                    When preparing for expeditions with Tripto Travels, the fundamental rule is traveling light with purpose. Rather than overpacking bulk equipment, focus on high-performance moisture-wicking synthetics, reliable waterproof outer shells, and broken-in trekking footwear.
                  </p>

                  <p>
                    Our Trip Captains conduct gear inspections prior to departure and carry comprehensive wilderness medicine kits, pulse oximeters, and emergency oxygen backup. Whether crossing high passes or exploring hidden coastal caves, traveling with a synchronized group makes every horizon unforgettable.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#F7F2E9] border border-orange-200/80 flex items-center justify-between gap-4 mt-6">
                    <div>
                      <div className="font-extrabold text-sm text-[#1B3A6B]">
                        Ready to experience this trail yourself?
                      </div>
                      <div className="text-xs text-stone-500">
                        Join our upcoming small-batch departures.
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveArticle(null);
                        onOpenEnquiry();
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#D9622B] text-white font-black text-xs uppercase tracking-wider shrink-0 shadow-md"
                    >
                      ENQUIRE NOW
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
