'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { GISTopicFull } from '@/types';

interface TopicCardProps {
  topic: GISTopicFull;
  onClick: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const diffColors = {
  Beginner: 'bg-accent3/10 text-accent3 border-accent3/30',
  Intermediate: 'bg-accent2/10 text-accent2 border-accent2/30',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/30'
};

const TopicCard = ({ topic, onClick }: TopicCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative bg-card border border-border rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-[0_8px_32px_rgba(0,212,255,0.12)] overflow-hidden"
    >
      {/* Animated top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className="absolute top-0 left-0 right-0 h-[3px] bg-accent origin-left"
        transition={{ duration: 0.25 }}
      />

      <div className="flex items-start justify-between mb-3">
        <div 
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
          style={{ backgroundColor: topic.color }}
        >
          {topic.icon}
        </div>
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className={`px-2 py-0.5 rounded text-[10px] font-mono border ${diffColors[topic.difficulty]}`}
        >
          {topic.difficulty}
        </motion.span>
      </div>

      <h3 className="text-sm font-bold text-text leading-tight mb-2 group-hover:text-accent transition-colors">
        {topic.title}
      </h3>
      
      <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-2">
        {topic.desc}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {topic.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="font-mono text-[9px] px-2 py-0.5 rounded bg-tag-bg text-accent tracking-wider uppercase">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
        <div className="flex items-center gap-1.5 text-muted">
          <Clock className="w-3 h-3" />
          <span className="font-mono text-[10px]">{topic.estimatedTime}</span>
        </div>
        <button className="font-mono text-[10px] text-accent border border-accent/30 rounded-md px-3 py-1 hover:bg-accent/10 transition-colors">
          VIEW GUIDE →
        </button>
      </div>
    </motion.div>
  );
};

export default TopicCard;
