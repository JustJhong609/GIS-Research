'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { X, Clock, AlertTriangle, ChevronDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GISTopicFull } from '@/types';

interface TopicModalProps {
  topic: GISTopicFull | null;
  isOpen: boolean;
  onClose: () => void;
}

const diffColors = {
  Beginner: 'bg-accent3/10 text-accent3 border-accent3/30',
  Intermediate: 'bg-accent2/10 text-accent2 border-accent2/30',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/30'
};

const TopicModal = ({ topic, isOpen, onClose }: TopicModalProps) => {
  if (!topic) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              />
            </Dialog.Overlay>
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 pointer-events-none">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.95 }}
                  className="w-full max-w-3xl max-h-[90vh] bg-surface border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xl pointer-events-auto relative"
                >
                  <Dialog.Close className="absolute top-4 right-4 w-8 h-8 rounded-full bg-border/50 flex items-center justify-center text-text hover:bg-accent hover:text-bg transition-colors z-20">
                    <X className="w-4 h-4" />
                  </Dialog.Close>

                <div className="p-6 md:p-8 border-b border-border bg-gradient-to-r from-accent/5 to-transparent">
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ backgroundColor: topic.color }}
                    >
                      {topic.icon}
                    </div>
                    <div>
                      <Dialog.Title className="text-xl md:text-2xl font-extrabold text-text leading-tight">
                        {topic.title}
                      </Dialog.Title>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${diffColors[topic.difficulty]}`}>
                          {topic.difficulty}
                        </span>
                        <div className="flex items-center gap-1.5 text-muted">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-mono text-[10px]">{topic.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dialog.Description className="text-sm text-muted leading-relaxed">
                    {topic.desc}
                  </Dialog.Description>
                </div>

                <Tabs.Root defaultValue="steps" className="flex-1 flex flex-col overflow-hidden">
                  <Tabs.List className="flex border-b border-border bg-card/50 px-6 shrink-0">
                    {['steps', 'datasets', 'plugins', 'errors'].map((tab) => (
                      <Tabs.Trigger
                        key={tab}
                        value={tab}
                        className="px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-muted border-b-2 border-transparent data-[state=active]:text-accent data-[state=active]:border-accent transition-all outline-none"
                      >
                        {tab === 'steps' ? '📋 Steps' : tab === 'datasets' ? '🗄 Datasets' : tab === 'plugins' ? '🔌 Plugins' : '⚠️ Common Errors'}
                      </Tabs.Trigger>
                    ))}
                  </Tabs.List>

                  <div className="flex-1 overflow-y-auto relative bg-surface/50">
                    <Tabs.Content value="steps" className="outline-none min-h-full">
                      <div className="p-6 md:p-8">
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">Implementation Steps</span>
                            <div className="h-px flex-1 bg-border" />
                          </div>
                          <div className="space-y-4">
                            {topic.steps.map((step, idx) => (
                              <div key={idx} className="flex gap-4 items-start group">
                                <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-[10px] font-mono text-accent shrink-0 mt-0.5 group-hover:bg-accent group-hover:text-bg transition-colors">
                                  {idx + 1}
                                </div>
                                <p className="text-sm text-text leading-relaxed pt-0.5">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="datasets" className="outline-none min-h-full">
                      <div className="p-6 md:p-8">
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">Data Sources</span>
                            <div className="h-px flex-1 bg-border" />
                          </div>
                          <div className="grid gap-3">
                            {topic.datasets.map((ds, idx) => (
                              <a
                                key={idx}
                                href={ds.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col gap-1 p-4 bg-card/50 border border-border rounded-xl hover:border-accent/50 hover:bg-accent/5 transition-all group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-text group-hover:text-accent transition-colors">{ds.name}</span>
                                  <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" />
                                </div>
                                <span className="text-[10px] font-mono text-muted break-all group-hover:text-accent/70">{ds.url}</span>
                                {ds.description && <p className="text-[11px] text-muted mt-1 italic">{ds.description}</p>}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="plugins" className="outline-none min-h-full">
                      <div className="p-6 md:p-8">
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">Required Plugins</span>
                            <div className="h-px flex-1 bg-border" />
                          </div>
                          <Accordion.Root type="single" collapsible className="space-y-3">
                            {topic.plugins.map((plugin, idx) => (
                              <Accordion.Item key={idx} value={`plugin-${idx}`} className="border border-border rounded-xl bg-card/30 overflow-hidden">
                                <Accordion.Header>
                                  <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-sm font-bold text-left hover:bg-accent/5 transition-colors group">
                                    <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 rounded-full bg-accent" />
                                      {plugin.name}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-muted group-data-[state=open]:rotate-180 transition-transform" />
                                  </Accordion.Trigger>
                                </Accordion.Header>
                                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                  <div className="p-4 pt-0 border-t border-border/50 bg-black/20">
                                    {plugin.menuPath && (
                                      <div className="mb-3 p-2 rounded bg-accent/5 border border-accent/20">
                                        <p className="text-[10px] font-mono text-accent uppercase tracking-wider mb-1">Menu Path</p>
                                        <p className="text-[11px] text-text">{plugin.menuPath}</p>
                                      </div>
                                    )}
                                    <div className="space-y-2">
                                      <p className="text-[10px] font-mono text-muted uppercase tracking-wider">Installation Steps</p>
                                      <ul className="space-y-1.5">
                                        {plugin.installSteps.map((s, i) => (
                                          <li key={i} className="text-[11px] text-muted flex gap-2">
                                            <span className="text-accent">•</span>
                                            {s}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </Accordion.Content>
                              </Accordion.Item>
                            ))}
                          </Accordion.Root>
                        </div>
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="errors" className="outline-none min-h-full">
                      <div className="p-6 md:p-8">
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">Common Errors & Fixes</span>
                            <div className="h-px flex-1 bg-border" />
                          </div>
                          <div className="space-y-4">
                            {topic.commonErrors.map((err, idx) => (
                              <div key={idx} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-3">
                                <div className="flex items-center gap-2 text-red-400">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span className="text-sm font-bold">{err.error}</span>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-[9px] font-mono uppercase text-red-400/70 tracking-wider">Cause</p>
                                    <p className="text-[11px] text-muted">{err.cause}</p>
                                  </div>
                                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
                                    <p className="text-[9px] font-mono uppercase text-green-400 tracking-wider">Fix</p>
                                    <p className="text-[11px] text-text">{err.fix}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Tabs.Content>
                  </div>
                </Tabs.Root>
              </motion.div>
            </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default TopicModal;
