import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Array of image paths
const images = [
  // Project files
  '/images/toshare/Project (20230414022734).jpg',
  '/images/toshare/Project (20231009012128).png',
  '/images/toshare/Project (20230119072612).png',
  '/images/toshare/Project (20230122042214).jpg',
  '/images/toshare/Project (20230226011234).jpg',
  '/images/toshare/Project (20230927101600).png',
  '/images/toshare/Project (20240220010731).png',
  '/images/toshare/Project (20240222123422).png',
  '/images/toshare/Project (20240608103833).png',
  '/images/toshare/Project (20241228124133).png',
  '/images/toshare/Project (20230204115342).png',
  '/images/toshare/Project (20240104121927).png',
  '/images/toshare/Project (20240105013929).png',
  '/images/toshare/Project (20240326122028).png',
  '/images/toshare/Project (20241026045110).png',
  '/images/toshare/Project (20241029073455).png',
  '/images/toshare/Project (20230130060446).png',
  '/images/toshare/Project (20230407110809).png',
  '/images/toshare/Project (20231120010617).png',
  '/images/toshare/Project (20241031015930).png',
  '/images/toshare/Project (20241219032223).png',
  '/images/toshare/Project (20230129020428).png',
  '/images/toshare/Project (20230715013853).png',
  '/images/toshare/Project (20230819030618).png',
  '/images/toshare/Project (20240304042928).png',
  '/images/toshare/Project (20240411125055).png',
  '/images/toshare/Project (20240609040020).png',
  '/images/toshare/Project (20250204122354).png',
  '/images/toshare/Project (20241102042400).jpg',
  '/images/toshare/Project (20241101063431).jpg',
  '/images/toshare/Project (20241101015556).jpg',
  '/images/toshare/Project (20241101124222).jpg',
  '/images/toshare/Project (20241028012832).jpg',
  '/images/toshare/Project (20240714123628).jpg',
  '/images/toshare/Project (20240710101300).jpg',
  // IMG files
  '/images/toshare/IMG_20240829_203432_207.jpg',
  '/images/toshare/IMG_20240828_004316_744.jpg',
  '/images/toshare/IMG_20240824_013104_459.jpg',
  '/images/toshare/IMG_20240716_181951_238.jpg',
  '/images/toshare/IMG_20240714_004944_313.jpg',
  '/images/toshare/IMG_20240616_205411_998.jpg',
  '/images/toshare/IMG_20240609_160407_396.jpg',
  '/images/toshare/IMG_20240609_004336_554.jpg',
  '/images/toshare/IMG_20240411_005917_850.jpg',
  '/images/toshare/IMG_20240318_012938_546.jpg',
  '/images/toshare/IMG_20240229_004609_747.jpg',
  '/images/toshare/IMG_20240215_151058_376.jpg',
  '/images/toshare/IMG_20240212_181316_898.jpg',
  '/images/toshare/IMG_20240114_005916_667.jpg',
  '/images/toshare/IMG_20240113_175630_060.jpg',
  '/images/toshare/IMG_20240106_221340_991.jpg',
  '/images/toshare/IMG_20240106_115538_647.jpg',
  '/images/toshare/IMG_20240106_005354_011.jpg',
  '/images/toshare/IMG_20240105_171637_820.jpg',
  '/images/toshare/IMG_20240105_012301_547.jpg',
  '/images/toshare/IMG_20240104_205524_557.jpg',
  '/images/toshare/IMG_20240102_123447_778.jpg',
  '/images/toshare/IMG_20240101_093645_421.jpg',
  '/images/toshare/IMG_20231230_162930_752.jpg',
  '/images/toshare/IMG_20231228_123859_442.jpg',
  '/images/toshare/IMG_20231224_201001_018.jpg',
  '/images/toshare/IMG_20231217_025049_195.jpg',
  '/images/toshare/IMG_20231209_211503_997.jpg',
  '/images/toshare/IMG_20231209_124550_205.jpg',
  '/images/toshare/IMG_20231208_001909_251.jpg',
  '/images/toshare/IMG_20231202_174046_080.jpg',
  '/images/toshare/IMG_20231120_013029_678.jpg',
  '/images/toshare/IMG_20231120_011613_359.jpg',
  '/images/toshare/IMG_20231118_010144_360.jpg',
  '/images/toshare/IMG_20231022_192426_100.webp',
  '/images/toshare/IMG_20231020_233200_981.webp',
  '/images/toshare/IMG_20231003_230918_413.jpg',
  '/images/toshare/IMG_20230822_002102_008.jpg',
  '/images/toshare/IMG_20230818_174431_592.jpg',
  '/images/toshare/IMG_20230817_172217_675.jpg',
  '/images/toshare/IMG_20230815_115508_587.jpg',
  '/images/toshare/IMG_20230814_000111_499.jpg',
  '/images/toshare/IMG_20230809_135348_502.jpg',
  '/images/toshare/IMG_20230605_000748_972.jpg',
  '/images/toshare/IMG_20230604_231154_508.jpg',
  '/images/toshare/IMG_20230604_132038_476.jpg',
  '/images/toshare/IMG_20230122_163941_738.jpg',
  '/images/toshare/IMG_20230118_220931_564.jpg',
  '/images/toshare/IMG_20221203_002544_372.jpg',
  '/images/toshare/IMG_20221111_112620_701.jpg',
  '/images/toshare/IMG_20221108_004001_402.jpg',
  '/images/toshare/IMG_20221029_232212_168.jpg',
  '/images/toshare/IMG_20221028_175333_454.jpg',
  '/images/toshare/IMG_20221019_153012_944.jpg',
  '/images/toshare/IMG_20241226_123631_342.webp'
];

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const imagesPerPage = 16;

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const paginatedImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  // Get current image index in the full images array
  const currentImageIndex = selectedImage ? images.indexOf(selectedImage) : -1;

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(images[currentImageIndex - 1]);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setSelectedImage(images[currentImageIndex + 1]);
    }
  };

  // Slideshow functionality
  useEffect(() => {
    let slideshowTimer: NodeJS.Timeout;
    if (isSlideshow && selectedImage) {
      slideshowTimer = setTimeout(() => {
        if (currentImageIndex < images.length - 1) {
          setSelectedImage(images[currentImageIndex + 1]);
        } else {
          setSelectedImage(images[0]); // Loop back to first image
        }
      }, 700); // Changed to 700ms (0.7 seconds)
    }
    return () => clearTimeout(slideshowTimer);
  }, [isSlideshow, selectedImage, currentImageIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        switch (e.key) {
          case 'ArrowLeft':
            handlePrevImage();
            break;
          case 'ArrowRight':
            handleNextImage();
            break;
          case 'Escape':
            setSelectedImage(null);
            setIsSlideshow(false);
            break;
          case ' ': // Spacebar
            e.preventDefault();
            setIsSlideshow(prev => !prev);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  const getVisiblePageNumbers = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(0, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 0) {
      if (range[0] > 1) {
        range.unshift(-1);
      }
      range.unshift(0);
    }

    if (range[range.length - 1] < totalPages - 1) {
      if (range[range.length - 1] < totalPages - 2) {
        range.push(-1);
      }
      range.push(totalPages - 1);
    }

    return range;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 animate-gradient-x"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
          >
            Kalpicklogoarts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-center max-w-2xl mb-8 text-white/90"
          >
            Where Digital Art Meets Innovation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <a
              href="#gallery"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              View Gallery
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-transparent backdrop-blur-sm border-2 border-white/50 hover:border-white hover:bg-white/10 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full p-1">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-2 h-2 bg-white rounded-full mx-auto"
            />
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto px-4 py-8"
        >
          <h1 className="neon-text text-5xl md:text-6xl font-bold text-center mb-8">
            Featured Artworks
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="neon-instruction text-center mb-12"
          >
            Click to view full with slide show
          </motion.p>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedImages.map((image, index) => (
              <motion.div
                key={currentPage * imagesPerPage + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="absolute inset-0 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-110">
                    <img
                      src={image}
                      alt={`Gallery Image ${currentPage * imagesPerPage + index + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12 mb-16">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex flex-wrap justify-center gap-2">
                {getVisiblePageNumbers().map((pageNum, index) => (
                  pageNum === -1 ? (
                    <span key={`dots-${index}`} className="text-white/50 px-2">...</span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-full ${
                        currentPage === pageNum
                          ? 'bg-white/30 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white/80'
                      } transition-colors`}
                    >
                      {pageNum + 1}
                    </button>
                  )
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center mt-20 pt-12 border-t border-white/10"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-gradient p-1 mb-6 transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src="/videos/FB_IMG_1605888651622.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-2xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
            >
              Kalpick Sharma
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/60 text-center"
            >
              Digital Artist & Logo Designer
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg"
          >
            <div className="absolute top-4 right-4 z-50 flex gap-4">
              <button
                onClick={() => setIsSlideshow(prev => !prev)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                {isSlideshow ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setIsSlideshow(false);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
                className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-[80vh] h-[80vh] max-w-[90vw] max-h-[90vh]"
              >
                <img
                  src={selectedImage}
                  alt="Selected artwork"
                  className="w-full h-full object-contain rounded-lg"
                />
              </motion.div>

              <button
                onClick={handleNextImage}
                disabled={currentImageIndex === images.length - 1}
                className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white/60">
              {currentImageIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;