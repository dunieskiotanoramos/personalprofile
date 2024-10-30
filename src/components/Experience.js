import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Arrow Navigation Component
const ArrowButton = ({ direction, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`absolute top-1/2 transform -translate-y-1/2 ${
      direction === 'left' ? '-left-16' : '-right-16'
    } bg-white p-4 rounded-full shadow-lg hover:shadow-xl z-10`}
    onClick={onClick}
    aria-label={`Navigate ${direction}`}
  >
    <svg
      className="w-6 h-6 text-gray-800"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
      />
    </svg>
  </motion.button>
);

// Progress Dots Component

const Experience = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayDelay = 5000;

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company',
      duration: '2021 - Present',
      description: [
        'Led development of core features resulting in 40% increase in user engagement',
        'Managed a team of 5 developers and implemented agile methodologies',
        'Architected and deployed microservices infrastructure',
      ],
      skills: ['React', 'Node.js', 'AWS', 'Docker'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      duration: '2019 - 2021',
      description: [
        'Developed responsive web applications for diverse clients',
        'Optimized application performance, reducing load time by 60%',
        'Collaborated with UX team to implement modern design patterns',
      ],
      skills: ['JavaScript', 'Python', 'PostgreSQL', 'Redis'],
    },
    {
      title: 'Frontend Developer',
      company: 'Startup Inc.',
      duration: '2017 - 2019',
      description: [
        'Built interactive user interfaces using modern frameworks',
        'Implemented responsive designs and animations',
        'Integrated third-party APIs and services',
      ],
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Vue.js'],
    },
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = experiences.length - 1;
    if (newIndex >= experiences.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;

    const timer = setInterval(() => {
      paginate(1);
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoplay]);

  const touchStart = {
    x: 0,
    y: 0,
  };

  return (
    <section id="experience" className="py-2 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            My journey in software development
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Resume
          </motion.a>
        </motion.div>

        <div
          className="relative h-[400px]"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              onTouchStart={(e) => {
                touchStart.x = e.touches[0].clientX;
                touchStart.y = e.touches[0].clientY;
              }}
              onTouchEnd={(e) => {
                const diffX = touchStart.x - e.changedTouches[0].clientX;
                const diffY = touchStart.y - e.changedTouches[0].clientY;

                if (Math.abs(diffX) > Math.abs(diffY)) {
                  if (Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                      paginate(1);
                    } else {
                      paginate(-1);
                    }
                  }
                }
              }}
              className="absolute w-full"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 mx-4 md:mx-auto max-w-10xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {experiences[currentIndex].title}
                    </h3>
                    <p className="text-lg text-indigo-600 mb-2">
                      {experiences[currentIndex].company}
                    </p>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {experiences[currentIndex].duration}
                  </p>
                </div>

                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="list-none mb-6 space-y-2 text-gray-600" // Changed to list-none
                >
                  {experiences[currentIndex].description.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="text-base flex items-start" // Added flex and items-start
                    >
                      <span className="mr-2">•</span>{' '}
                      {/* Added bullet point as a separate element */}
                      <span>{item}</span> {/* Wrapped text in span */}
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="flex flex-wrap gap-2">
                  {experiences[currentIndex].skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <ArrowButton direction="left" onClick={() => paginate(-1)} />
          <ArrowButton direction="right" onClick={() => paginate(1)} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
