"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, FileText, Zap, Star } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade-in animation on load
    if (heroRef. current) {
      heroRef.current.style.opacity = '1';
      heroRef. current.style.transform = 'translateY(0)';
    }
  }, []);

  return (
    <div className="relative bg-gray-950 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-purple-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 bg-[linear-linear(rgba(255,255,255,0.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]"></div>
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-cyan-500 rounded-full animate-ping [animation-delay:0.5s]"></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-pink-500 rounded-full animate-ping [animation-delay:1s]"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-green-500 rounded-full animate-ping [animation-delay:1.5s]"></div>
      </div>

      <div
        ref={heroRef}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 opacity-0 translate-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 text-sm text-gray-400 mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span>AI-Powered Portfolio Builder</span>
          <span className="px-2 py-0.5 bg-linear-to-r from-purple-600 to-cyan-600 rounded-full text-xs text-white font-medium">
            New
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-white">Build Your </span>
          <span className="bg-linear-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Professional Portfolio
          </span>
          <br />
          <span className="text-white">in Minutes</span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Create stunning, modern portfolios with AI assistance.  
          Just fill in your details and let our AI craft the perfect 
          showcase for your skills and experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/builder"
            className="group flex items-center gap-2 px-8 py-4 bg-linear-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/30 border border-gray-700/50 rounded-full text-gray-400 text-sm">
            <Zap className="w-4 h-4 text-yellow-500" />
            AI-Generated Content
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/30 border border-gray-700/50 rounded-full text-gray-400 text-sm">
            <FileText className="w-4 h-4 text-cyan-500" />
            One-Click Publish
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/30 border border-gray-700/50 rounded-full text-gray-400 text-sm">
            <Star className="w-4 h-4 text-purple-500" />
            Beautiful Template
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform:  translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Hero;