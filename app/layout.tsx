import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import CartBadge from '@/components/CartBadge';

export const metadata: Metadata = {
  title: 'MithilaDharohar | Authentic Bihar Heritage',
  description: 'Preserving the soul of Mithila through authentic handmade achars, Madhubani art, and traditional handlooms.',
  keywords: 'MithilaDharohar, Mithila, Madhubani Art, Homemade Pickles, Bihari Achar, Handloom',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-primary/20 selection:text-primary bg-secondary">
        {/* Minimal Editorial Header */}
        <header className="header-float">
          <nav className="container-editorial">
            <div className="flex justify-between items-center h-24 md:h-32">
              {/* Navigation (Left) */}
              <div className="hidden lg:flex items-center space-x-16 flex-1">
                <Link href="/products" className="group relative py-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-main group-hover:text-primary transition-colors">The Boutique</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/products?category=food" className="group relative py-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-main group-hover:text-primary transition-colors">Authentic Food</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>

              {/* Central Identity */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex flex-col items-center group">
                  <span className="text-[28px] md:text-[38px] font-serif font-bold text-primary tracking-[-0.05em] leading-[0.9] transition-all group-hover:tracking-normal">
                    Mithila
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.6em] text-text-main group-hover:text-heritage-gold transition-colors uppercase pl-1">
                    Dharohar
                  </span>
                </Link>
              </div>

              {/* Navigation (Right) */}
              <div className="hidden lg:flex items-center justify-end space-x-12 flex-1">
                <Link href="/about" className="text-[10px] font-bold text-text-main hover:text-primary transition-all uppercase tracking-[0.3em]">Our Story</Link>
                <div className="flex items-center space-x-8">
                   <Link href="/account" className="text-text-main hover:text-primary transition-all" aria-label="Account">
                     <svg className="w-5 h-5 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                     </svg>
                   </Link>
                   <CartBadge />
                </div>
              </div>

              {/* Mobile Toggle */}
              <div className="lg:hidden flex items-center gap-6">
                 <CartBadge />
                <button className="text-text-main" aria-label="Menu">
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        {/* Editorial Journal Footer */}
        <footer className="bg-heritage-dark text-heritage-bone pt-32 pb-20 overflow-hidden">
          <div className="container-editorial">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-x-24 mb-32 items-start">
              {/* Brand Pillar */}
              <div className="md:col-span-5">
                <Link href="/" className="flex flex-col mb-10">
                  <span className="text-[32px] font-serif font-bold text-heritage-bone leading-none mb-2">Mithila</span>
                  <span className="text-[10px] font-bold tracking-[0.5em] text-primary uppercase">Legacy & Soul</span>
                </Link>
                <p className="text-[15px] text-heritage-bone/50 leading-relaxed mb-12 max-w-sm">
                  We are a bridge between ancient Bihari wisdom and the modern home. Hand-mixed, sun-dried, and heart-delivered by our community of 500+ women artisans.
                </p>
                <div className="flex gap-10">
                  {['IG', 'FB', 'YT'].map(social => (
                    <span key={social} className="text-[10px] font-bold tracking-widest text-heritage-bone/40 hover:text-heritage-bone transition-colors cursor-pointer border-b border-white/10 pb-1">{social}</span>
                  ))}
                </div>
              </div>

              {/* Navigation Links (Asymmetric) */}
              <div className="md:col-span-2 md:col-start-7">
                <h4 className="text-[11px] font-bold text-primary tracking-[0.3em] uppercase mb-10">Boutique</h4>
                <ul className="space-y-6 text-[12px] text-heritage-bone/60 font-medium uppercase tracking-widest">
                  <li><Link href="/products?category=food" className="hover:text-heritage-bone transition-colors">Heritage Food</Link></li>
                  <li><Link href="/products?category=craft" className="hover:text-heritage-bone transition-colors">Ancient Art</Link></li>
                  <li><Link href="/products?category=clothing" className="hover:text-heritage-bone transition-colors">Textiles</Link></li>
                  <li><Link href="/products" className="hover:text-heritage-bone transition-colors">Collection</Link></li>
                </ul>
              </div>

              {/* Concierge */}
              <div className="md:col-span-2">
                <h4 className="text-[11px] font-bold text-primary tracking-[0.3em] uppercase mb-10">Concierge</h4>
                <ul className="space-y-6 text-[12px] text-heritage-bone/60 font-medium uppercase tracking-widest">
                  <li><Link href="/shipping-policy" className="hover:text-heritage-bone transition-colors">Shipping</Link></li>
                  <li><Link href="/return-policy" className="hover:text-heritage-bone transition-colors">Returns</Link></li>
                  <li><Link href="/contact" className="hover:text-heritage-bone transition-colors">Contact</Link></li>
                  <li><Link href="/about" className="hover:text-heritage-bone transition-colors">Our Legacy</Link></li>
                </ul>
              </div>

              {/* Journal Subscription */}
              <div className="md:col-span-3 lg:col-start-10">
                <h4 className="text-[11px] font-bold text-primary tracking-[0.3em] uppercase mb-10">The Journal</h4>
                <form className="group">
                  <input 
                    type="email" 
                    placeholder="YOUR EMAIL" 
                    className="bg-transparent border-b border-white/10 text-heritage-bone py-4 w-full text-[11px] font-bold tracking-widest placeholder:text-white/20 focus:border-primary transition-colors outline-none"
                  />
                  <button className="mt-8 text-primary text-[11px] font-bold tracking-[0.3em] uppercase hover:text-heritage-bone transition-colors flex items-center gap-3 group">
                    Subscribe 
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Copyright & Badges */}
            <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold gap-10">
              <p>© 2024 MithilaDharohar Private Ltd.</p>
              <div className="flex flex-wrap justify-center gap-12 font-medium opacity-60">
                <span>G.I. Heritage</span>
                <span>Women Artisan Owned</span>
                <span>Crafted in Bihar</span>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}

