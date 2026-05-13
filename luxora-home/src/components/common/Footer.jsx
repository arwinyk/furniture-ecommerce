import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full mt-32 border-t border-luxora-linen/20 bg-bg-dark grid grid-cols-1 md:grid-cols-5 gap-8 px-6 md:px-16 py-24 text-luxora-linen font-body">
      <div className="md:col-span-2">
        <div className="font-display text-3xl text-accent mb-8">LUXORA HOME</div>
        <p className="text-luxora-linen/70 max-w-sm mb-8">
          Crafting environments of sophisticated ease. Elevating the everyday through tactile materiality and timeless silhouettes.
        </p>
        <div className="text-luxora-linen/50 font-body text-xs uppercase tracking-[0.12em]">
          © 2026 LUXORA HOME. ALL RIGHTS RESERVED.
        </div>
      </div>
      
      <div>
        <h4 className="font-body text-xs text-accent uppercase mb-4 tracking-widest">Explore</h4>
        <ul className="space-y-3">
          <li><a href="#" className="text-luxora-linen/70 hover:text-accent transition-colors duration-300">Collections</a></li>
          <li><a href="#" className="text-luxora-linen/70 hover:text-accent transition-colors duration-300">Lookbook</a></li>
          <li><a href="#" className="text-luxora-linen/70 hover:text-accent transition-colors duration-300">Journal</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-body text-xs text-accent uppercase mb-4 tracking-widest">Assistance</h4>
        <ul className="space-y-3">
          <li><a href="#" className="text-luxora-linen/70 hover:text-accent transition-colors duration-300">Support</a></li>
          <li><a href="#" className="text-luxora-linen/70 hover:text-accent transition-colors duration-300">Shipping &amp; Returns</a></li>
          <li><a href="#" className="text-luxora-linen/70 hover:text-accent transition-colors duration-300">Material Care</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-body text-xs text-accent uppercase mb-4 tracking-widest">Stay Connected</h4>
        <ul className="space-y-3 mb-8">
          <li><a href="#" className="text-luxora-linen/70 hover:text-accent transition-colors duration-300">Company</a></li>
          <li><a href="#" className="text-luxora-linen/70 hover:text-accent transition-colors duration-300">Showrooms</a></li>
        </ul>
        <form className="flex flex-col gap-2 relative">
          <label className="sr-only" htmlFor="newsletter">Newsletter</label>
          <div className="relative focus-within:ring-1 focus-within:ring-accent rounded-xl transition-all">
            <input 
              type="email" 
              id="newsletter" 
              placeholder="Enter your email" 
              className="w-full bg-luxora-noir border border-luxora-linen/20 rounded-xl px-4 py-3 text-luxora-linen placeholder:text-luxora-linen/30 focus:outline-none focus:border-accent font-body"
            />
            <button type="submit" aria-label="Subscribe" className="absolute right-2 top-1/2 -translate-y-1/2 text-accent hover:text-luxora-linen transition-colors">
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
