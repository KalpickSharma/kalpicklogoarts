import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette, Brush, Code } from 'lucide-react';

const About = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoRef, { once: true });

  return (
    <div className="pt-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <div className="glass rounded-xl p-8 md:p-12">
          <h1 className="neon-text text-4xl md:text-5xl font-bold mb-8 text-center">
            About Our Gallery
          </h1>
          
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80 leading-relaxed"
            >
              Welcome to Kalpicklogoarts digital art and logo design gallery. We specialize in creating stunning digital artworks and professional logo designs that bring your vision to life. Our portfolio showcases a unique blend of artistic creativity and modern design principles, crafted with precision and attention to detail. Whether you're looking for captivating digital art pieces or a distinctive brand identity through logo design, we're here to transform your ideas into visual masterpieces.
            </motion.p>

            {/* Animated Video Section */}
            <motion.div
              ref={videoRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-2xl mx-auto aspect-square rounded-xl overflow-hidden shadow-2xl my-12 video-zoom group"
            >
              <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transform scale-[1.01] group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  style={{ 
                    filter: 'brightness(0.9)',
                    objectFit: 'cover',
                  }}
                >
                  <source src="/videos/Samples.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-white text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2"></h3>
                    <p className="text-white/80"></p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <Palette className="w-12 h-12 mx-auto mb-4 text-accent-cyan" />
                <h3 className="text-xl font-semibold mb-2">Creative Vision</h3>
                <p className="text-white/60">Showcasing innovative digital art that pushes boundaries</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <Brush className="w-12 h-12 mx-auto mb-4 text-accent-pink" />
                <h3 className="text-xl font-semibold mb-2">Artistic Excellence</h3>
                <p className="text-white/60">Curating the finest digital artwork from global artists</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <Code className="w-12 h-12 mx-auto mb-4 text-accent-gold" />
                <h3 className="text-xl font-semibold mb-2">Technical Innovation</h3>
                <p className="text-white/60">Embracing cutting-edge digital techniques</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;