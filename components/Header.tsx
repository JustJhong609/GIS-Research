import React from 'react';

const Header = () => {
  return (
    <header className="relative z-10 px-6 py-12 md:px-10 md:py-16 border-b border-border bg-gradient-to-b from-accent/5 to-transparent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="logo-area">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-none tracking-tighter">
            <span className="text-accent">GIS</span> <span className="text-accent2">Repository</span>
          </h1>
          <p className="font-mono text-xs text-muted mt-2 tracking-widest uppercase">
            // QGIS Implementation Manual &amp; Dataset Guide
          </p>
        </div>
        <div className="flex gap-6 md:gap-8 items-center flex-wrap">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-extrabold text-accent leading-none">40</div>
            <div className="font-mono text-[10px] text-muted uppercase tracking-wider">Topics</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-extrabold text-accent leading-none">8</div>
            <div className="font-mono text-[10px] text-muted uppercase tracking-wider">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-extrabold text-accent leading-none">80+</div>
            <div className="font-mono text-[10px] text-muted uppercase tracking-wider">Datasets</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
