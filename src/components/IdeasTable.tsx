'use client'
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badges } from "@/components/ui/badges";
import { Search, Filter } from "lucide-react";
import { Badge } from "@/components/Badge";
import { motion } from 'framer-motion';


const IdeasPlatform = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid');

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch('/api/airtable');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.details || data.error || 'Failed to fetch ideas');
        }
        
        setIdeas(data);
        setLoading(false);
      } catch (err) {
        console.error('Error details:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const categories = React.useMemo(() => {
    const allCategories = ideas.flatMap(idea => idea.category);
    const uniqueCategories = Array.from(new Set(allCategories));
    
    return [
      { id: 'all', name: 'All', count: ideas.length },
      ...uniqueCategories.map(category => ({
        id: category,
        name: category,
        count: ideas.filter(idea => idea.category.includes(category)).length
      }))
    ];
  }, [ideas]);

  const filteredIdeas = ideas.filter(idea => 
    (activeCategory === 'All' || idea.category.includes(activeCategory)) &&
    (idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     idea.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="space-y-4">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-green-400 animate-pulse">Loading ideas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-red-500/10 border-red-500/20 p-6">
          <p className="text-red-400">Error: {error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative z-10">
        <div className="pt-24 pb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Discover & Build
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-12">
              Explore innovative ideas from our community and bring them to life
            </p>
            
            {/* Search Section */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search ideas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-green-500 focus:outline-none pl-12"
                />
                <Search className="absolute left-4 top-4 text-gray-400" />
                
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Sidebar */}
            <div className="lg:w-64 flex-shrink-0 pt-16">
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10 sticky top-24">
                <div className="p-4">
                  <h3 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.name)}
                        className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeCategory === category.name
                            ? 'bg-green-500/20 text-green-400 shadow-inner'
                            : 'text-gray-400 hover:bg-white/5 hover:text-green-400'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm px-2 py-1 rounded-full bg-black/20">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Ideas Grid/List */}
            <div className="flex-1">
              <div className="flex justify-end mb-6 gap-2">
                <button
                  onClick={() => setView('grid')}
                  className={`px-4 py-2 rounded-xl transition-colors ${
                    view === 'grid' ? 'bg-green-500/20 text-green-400' : 'text-gray-400'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-xl transition-colors ${
                    view === 'list' ? 'bg-green-500/20 text-green-400' : 'text-gray-400'
                  }`}
                >
                  List
                </button>
              </div>

              {view === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredIdeas.map((idea, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-black/40 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-200 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold text-white">{idea.title}</h3>
                          <Badges variant="outline" className="bg-green-500/10 text-green-400">
                            ${idea.prize}
                          </Badges>
                        </div>
                        <p className="text-neutral-300 mb-4 line-clamp-2">{idea.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {idea.category.map((cat, idx) => (
                            <Badges
                              key={idx}
                              variant="secondary"
                              className="bg-black/40 text-neutral-300"
                            >
                              {cat}
                            </Badges>
                          ))}
                        </div>
                        <div className="flex justify-end items-center">
                          <Badges variant="outline" className="bg-green-500/10 text-green-400">
                            {idea.difficulty}
                          </Badges>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="bg-black/40 backdrop-blur-sm border border-white/10">
                  <div className="divide-y divide-white/10">
                    {filteredIdeas.map((idea, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-6 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-white">{idea.title}</h3>
                          <Badges variant="outline" className="bg-green-500/10 text-green-400">
                            ${idea.prize}
                          </Badges>
                        </div>
                        <p className="text-neutral-300 mb-4">{idea.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-2">
                            {idea.category.map((cat, idx) => (
                              <Badges
                                key={idx}
                                variant="secondary"
                                className="bg-black/40 text-neutral-300"
                              >
                                {cat}
                              </Badges>
                            ))}
                          </div>
                          <Badges variant="outline" className="bg-green-500/10 text-green-400">
                            {idea.difficulty}
                          </Badges>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>

        <footer className="border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  text="Submit your idea" 
                  href="https://airtable.com/appTd1vV948UZjHYw/shraeV6riyOBo0Az9" 
                />
              </motion.div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IdeasPlatform;