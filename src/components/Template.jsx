import React from "react";

const Template = () => {
  return (
    <div>
      <section className="fixed h-screen aura-gradient  hidden md:flex w-[45%] flex-col justify-between p-12 bg-[#0d0d18]">
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7c3aed,transparent_70%)] opacity-10"></div>

        {/* Branding */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-600">
            <span className="material-symbols-outlined text-white">
              auto_awesome
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold">AuraAI</p>
            <p className="text-xs text-gray-400">Intelligence v2.4</p>
          </div>
        </div>

        {/* Text */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold mb-6">
            Your personal AI{" "}
            <span className="text-purple-400">always learning.</span>
          </h1>
          <p className="text-gray-400">
            Experience the next evolution of cognitive assistance. Securely sync
            your workflows and let Aura handle the complexity of your daily
            operations.
          </p>
          <div class="flex flex-wrap gap-4 mt-8">
            <div class="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span class="material-symbols-outlined text-primary text-sm">
                verified
              </span>
              <span class="text-xs font-medium text-white/70">
                SOC2 Compliant
              </span>
            </div>
            <div class="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span class="material-symbols-outlined text-primary text-sm">
                bolt
              </span>
              <span class="text-xs font-medium text-white/70">
                Sub-100ms Latency
              </span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          Trusted by 2,000+ innovators worldwide
        </div>
      </section>
    </div>
  );
};

export default Template;
