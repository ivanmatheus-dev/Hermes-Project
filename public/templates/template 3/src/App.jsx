import { HeroSection } from './components/sections/HeroSection';
import { MetricsSection } from './components/sections/MetricsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { GallerySection } from './components/sections/GallerySection';
import { TeamSection } from './components/sections/TeamSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { StickyWhatsApp } from './components/layout/StickyWhatsApp';

function App() {
  return (
    <div className="site-shell">
      <main>
        <HeroSection />
        <MetricsSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}

export default App;
