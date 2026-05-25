import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-8 max-w-6xl font-sans text-white">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-blue-400" />
          Global Settings
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Configure global platform variables.
        </p>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <p className="text-gray-400 text-center py-12">
          Global settings configurations will appear here in future updates.
        </p>
      </div>
    </div>
  );
}
