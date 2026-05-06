'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import TopicCard from '@/components/TopicCard';
import TopicModal from '@/components/TopicModal';
import { topics } from '@/data/topics';
import { GISTopicFull } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeFilter, setActiveFilter] = useState(searchParams.get('cat') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedTopic, setSelectedTopic] = useState<GISTopicFull | null>(null);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeFilter !== 'all') params.set('cat', activeFilter);
    if (searchQuery) params.set('q', searchQuery);
    
    const queryString = params.toString();
    router.replace(queryString ? `?${queryString}` : '/', { scroll: false });
  }, [activeFilter, searchQuery, router]);

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      const matchesFilter = activeFilter === 'all' || topic.cat === activeFilter;
      const matchesSearch = !searchQuery || 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        topic.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 md:px-10">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <SearchBar onSearch={setSearchQuery} initialValue={searchQuery} />
            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="font-mono text-[11px] text-muted tracking-widest uppercase">
              <span className="text-accent font-bold">{filteredTopics.length}</span> topics identified
            </div>
          </div>
        </div>

        {filteredTopics.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onClick={() => setSelectedTopic(topic)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-bold text-text mb-2">No matching topics found</h3>
            <p className="text-sm text-muted max-w-xs">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-6 font-mono text-xs text-accent hover:underline"
            >
              Reset all filters
            </button>
          </motion.div>
        )}
      </main>

      <footer className="py-12 px-6 border-t border-border mt-12 bg-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">GIS</div>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">Research Repository © 2026</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="font-mono text-[10px] text-muted hover:text-accent transition-colors uppercase tracking-widest">Documentation</a>
            <a href="#" className="font-mono text-[10px] text-muted hover:text-accent transition-colors uppercase tracking-widest">Data Sources</a>
            <a href="#" className="font-mono text-[10px] text-muted hover:text-accent transition-colors uppercase tracking-widest">GitHub</a>
          </div>
        </div>
      </footer>

      <TopicModal
        topic={selectedTopic}
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <HomeContent />
    </Suspense>
  );
}
