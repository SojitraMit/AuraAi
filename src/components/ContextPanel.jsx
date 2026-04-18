import React, { useState } from "react";

const ContextPanel = () => {
  const [activeTab1, setActiveTab1] = useState(true);
  return (
    <aside className="w-[280px] h-screen flex-shrink-0 flex flex-col p-6 bg-[#0d0d18]">
      {/* Header */}
      <header className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-1">
          Context
        </h3>
        <div className="h-0.5 w-8 bg-purple-600"></div>
      </header>

      {/* Content */}
      <div className="flex-1 space-y-8 custom-scroll overflow-y-auto">
        {/* Memory Section */}
        <section className="space-y-4">
          <div className={"flex items-center gap-2 text-white"}>
            <span className="material-symbols-outlined text-sm text-purple-600">
              memory
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">
              Active Memory
            </span>
          </div>

          <div className="space-y-3">
            <div
              className={
                activeTab1
                  ? "bg-[#1f1e2a] border-l-2 cursor-default border-purple-600 p-3 rounded-r-lg hover:bg-[#1b1a26] transition-all"
                  : "bg-[#1f1e2a] border-l-2 cursor-pointer border-transparent p-3 rounded-r-lg opacity-50 hover:opacity-100  transition-all"
              }
              onClick={() => setActiveTab1(true)}>
              <p className="text-xs text-white font-medium mb-1 truncate">
                UI Visual Strategy
              </p>
              <p className="text-[10px] text-gray-400 opacity-60 leading-relaxed">
                Focused on "Digital Nebula" aesthetics and glassmorphic depth.
              </p>
            </div>

            <div
              className={
                !activeTab1
                  ? "bg-[#1b1a26] border-l-2 cursor-default border-purple-600 p-3 rounded-r-lg hover:bg-[#1f1e2a] transition-all"
                  : "bg-[#1b1a26] border-l-2 cursor-pointer border-transparent p-3 rounded-r-lg opacity-50 hover:opacity-100  transition-all"
              }
              onClick={() => setActiveTab1(false)}>
              <p className="text-xs text-white font-medium mb-1 truncate">
                Color Palette V2
              </p>
              <p className="text-[10px] text-gray-400 opacity-60 leading-relaxed">
                Obsidian tones with hyper-saturated violet core.
              </p>
            </div>
          </div>
        </section>

        {/* Session Info */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-sm text-purple-600">
              info
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">
              Session Info
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#1b1a26] p-3 rounded-xl border border-white/5">
              <p className="text-[10px] text-gray-400 mb-1">Messages</p>
              <p className="text-sm font-bold text-white">42</p>
            </div>

            <div className="bg-[#1b1a26] p-3 rounded-xl border border-white/5">
              <p className="text-[10px] text-gray-400 mb-1">Tokens</p>
              <p className="text-sm font-bold text-white">1.2k</p>
            </div>
          </div>

          <div className="bg-[#1b1a26] p-3 rounded-xl border border-white/5">
            <p className="text-[10px] text-gray-400 mb-1">Current Intent</p>
            <p className="text-xs text-white leading-relaxed">
              Architectural Design Systems & UI Engineering
            </p>
          </div>
        </section>

        {/* Files */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-sm text-purple-600">
              description
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">
              Shared Files
            </span>
          </div>

          <div className="bg-[#1b1a26]/50 border border-dashed border-white/10 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-gray-400/30 text-3xl mb-2">
              upload_file
            </span>
            <p className="text-[10px] text-gray-400 opacity-50">
              No files uploaded to this session yet.
            </p>
          </div>
        </section>
      </div>

      {/* Bottom */}
      <div className="mt-8 pt-4 border-t border-white/5">
        <div className="bg-gradient-to-br from-purple-600/10 to-purple-900/10 rounded-xl p-4 border border-purple-600/20">
          <p className="text-[11px] font-bold text-white mb-2">Pro Feature</p>
          <p className="text-[10px] text-gray-400 mb-3">
            Enable context-aware real-time search across your workspace.
          </p>

          <button className="w-full py-2 bg-purple-600 text-[11px] font-bold text-white rounded-lg hover:opacity-90 transition">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ContextPanel;
