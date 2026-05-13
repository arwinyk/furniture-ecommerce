import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { luxoraMotion } from '../../animations/variants';
import Button from '../../components/ui/Button';

const HomePage = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80')" }}
        >
          <div className="absolute inset-0 bg-bg-primary/30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/90 via-bg-primary/50 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={luxoraMotion.variants.stagger}
            className="md:col-span-7 flex flex-col justify-center"
          >
            <motion.span 
              variants={luxoraMotion.variants.fadeUp}
              className="font-body text-xs text-accent uppercase mb-8 tracking-[0.12em]"
            >
              NEW COLLECTION — SS 2026
            </motion.span>
            
            <motion.h1 
              variants={luxoraMotion.variants.fadeUp}
              className="text-hero text-text-primary mb-8 italic leading-tight"
            >
              Where Every <br/>
              Room Tells <br/>
              Your Story
            </motion.h1>
            
            <motion.p 
              variants={luxoraMotion.variants.fadeUp}
              className="font-body text-lg text-text-secondary max-w-md mb-12"
            >
              Handcrafted furniture designed with intention. Experience the tactile warmth of heritage craftsmanship meeting modern minimalist living.
            </motion.p>
            
            <motion.div 
              variants={luxoraMotion.variants.fadeUp}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Button to="/shop" variant="primary">
                Explore Collection
              </Button>
              <Button to="/design" variant="ghost">
                Design Your Space
              </Button>
            </motion.div>

            {/* Micro Stats */}
            <motion.div 
              variants={luxoraMotion.variants.fadeUp}
              className="flex gap-8 border-t border-border-soft pt-8 max-w-lg"
            >
              <div>
                <div className="font-display text-2xl text-text-primary mb-1">25+</div>
                <div className="font-body text-xs text-text-secondary uppercase tracking-[0.12em]">Years Artisanal</div>
              </div>
              <div>
                <div className="font-display text-2xl text-text-primary mb-1">100%</div>
                <div className="font-body text-xs text-text-secondary uppercase tracking-[0.12em]">Sustainably Sourced</div>
              </div>
              <div>
                <div className="font-display text-2xl text-text-primary mb-1">Lifetime</div>
                <div className="font-body text-xs text-text-secondary uppercase tracking-[0.12em]">Craft Guarantee</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Strip */}
      <section className="bg-text-primary py-4 border-y border-bg-dark overflow-hidden">
        <div className="whitespace-nowrap font-body text-xs text-accent uppercase tracking-[0.2em] px-6 text-center">
          Handcrafted Quality &nbsp;&nbsp;&middot;&nbsp;&nbsp; Free White-Glove Delivery &nbsp;&nbsp;&middot;&nbsp;&nbsp; Sustainable Materials &nbsp;&nbsp;&middot;&nbsp;&nbsp; Heritage Craftsmanship
        </div>
      </section>

      {/* Category Grid Placeholder */}
      <section className="py-32 px-6 md:px-16">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl text-text-primary mb-4">Curated Spaces</h2>
          <p className="font-body text-text-secondary">Explore collections tailored for every facet of your life.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[auto] gap-8 auto-rows-[300px]">
          {/* Sofas */}
          <motion.div 
            whileHover="hover"
            initial="rest"
            variants={luxoraMotion.variants.imageHover}
            className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden shadow-warm cursor-pointer block"
          >
            <Link to="/shop?category=sofas" className="absolute inset-0 z-20"></Link>
            <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80" alt="Sofas" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-bg-dark/20 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
              <span className="font-display text-2xl text-luxora-ivory">Sofas &amp; Sectionals</span>
            </div>
          </motion.div>

          {/* Decor */}
          <motion.div 
            whileHover="hover"
            initial="rest"
            variants={luxoraMotion.variants.imageHover}
            className="relative rounded-xl overflow-hidden shadow-warm cursor-pointer block"
          >
            <Link to="/shop?category=decor" className="absolute inset-0 z-20"></Link>
            <img src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80" alt="Decor" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-bg-dark/20 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
              <span className="font-display text-2xl text-luxora-ivory">Decor</span>
            </div>
          </motion.div>

          {/* Beds */}
          <motion.div 
            whileHover="hover"
            initial="rest"
            variants={luxoraMotion.variants.imageHover}
            className="md:row-span-2 relative rounded-xl overflow-hidden shadow-warm cursor-pointer block"
          >
            <Link to="/shop?category=beds" className="absolute inset-0 z-20"></Link>
            <img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80" alt="Beds" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-bg-dark/20 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
              <span className="font-display text-2xl text-luxora-ivory">Beds</span>
            </div>
          </motion.div>

          {/* Dining */}
          <motion.div 
            whileHover="hover"
            initial="rest"
            variants={luxoraMotion.variants.imageHover}
            className="relative rounded-xl overflow-hidden shadow-warm cursor-pointer block"
          >
            <Link to="/shop?category=dining" className="absolute inset-0 z-20"></Link>
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80" alt="Dining" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-bg-dark/20 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
              <span className="font-display text-2xl text-luxora-ivory">Dining</span>
            </div>
          </motion.div>

          {/* Office */}
          <motion.div 
            whileHover="hover"
            initial="rest"
            variants={luxoraMotion.variants.imageHover}
            className="md:col-span-2 relative rounded-xl overflow-hidden shadow-warm cursor-pointer block"
          >
            <Link to="/shop?category=office" className="absolute inset-0 z-20"></Link>
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80" alt="Office" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-bg-dark/20 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
              <span className="font-display text-2xl text-luxora-ivory">Office</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Editorial */}
      <section className="py-32 overflow-hidden bg-luxora-cream">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-6 md:px-0 md:pl-16">
            <div className="md:col-span-7 relative h-[600px] rounded-xl overflow-hidden shadow-warm">
              <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80" alt="Editorial" className="w-full h-full object-cover" />
            </div>
            <div className="md:col-span-4 md:col-start-9 py-12 md:pr-16">
              <span className="font-body text-xs text-accent uppercase mb-4 tracking-widest block">Editorial</span>
              <h3 className="font-display text-4xl text-text-primary mb-6">Scandinavian Calm, Perfected.</h3>
              <p className="font-body text-lg text-text-secondary mb-8">
                Discover the art of creating spaces that breathe. Our latest collection embraces the principles of Nordic design—prioritizing natural light, organic materials, and uncompromised craftsmanship to craft a sanctuary of quiet luxury.
              </p>
              <Link to="/journal" className="inline-flex items-center text-accent font-body text-xs uppercase tracking-widest hover:text-text-primary transition-colors">
                Read the Journal <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Teaser */}
      <section className="bg-bg-dark text-luxora-linen py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl italic mb-8 text-luxora-champagne">
              Design Your Space with AI
          </h2>
          <p className="font-body text-lg text-luxora-linen/70 mb-12">
              Upload a photo of your room and let our artisanal intelligence curate a personalized layout utilizing our exclusive collections. Experience your future home before it arrives.
          </p>
          <Button to="/ai-design" variant="primary">
              Start Virtual Design
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
