import React from 'react';

interface ArtisanHighlightProps {
  name?: string;
}

const ArtisanHighlight: React.FC<ArtisanHighlightProps> = ({ name }) => {
  return (
    <div className="flex items-center gap-4 bg-[#2c2420] p-5 rounded-3xl shadow-xl">
      <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/10 relative overflow-hidden border border-[#c5a059]/20 flex items-center justify-center">
         <span className="text-[#c5a059] font-black text-xl">
            {name ? name[0] : 'M'}
         </span>
      </div>
      <div>
        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#c5a059] mb-1">Traditional Artisan</span>
        <span className="block text-xl font-black text-white text-serif group-hover:text-[#c5a059] transition-colors">
           {name || 'Local Mithila Women'}
        </span>
      </div>
    </div>
  );
};

export default ArtisanHighlight;
