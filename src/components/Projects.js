// components/Projects.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Cloud Migration Framework',
      description:
        'Enterprise-scale cloud migration framework that helped transition 100+ applications to AWS.',
      technologies: ['AWS', 'Terraform', 'Python'],
      image: '/project1.jpg',
      longDescription:
        'Developed a comprehensive cloud migration framework that enabled seamless transition of legacy applications to AWS cloud infrastructure. Implemented automated assessment, planning, and migration tools that reduced migration time by 40%.',
    },
    {
      id: 2,
      title: 'Microservices Platform',
      description:
        'Designed and implemented a scalable microservices platform serving millions of requests daily.',
      technologies: ['Kubernetes', 'Docker', 'Spring Boot'],
      image: '/project2.jpg',
      longDescription:
        'Built a robust microservices architecture handling high-volume transactions with 99.99% uptime. Implemented service mesh, distributed tracing, and automated scaling policies.',
    },
    {
      id: 3,
      title: 'Serverless Data Pipeline',
      description:
        'Built real-time data processing pipeline handling 10TB+ data daily.',
      technologies: ['AWS Lambda', 'Kinesis', 'DynamoDB'],
      image: '/project3.jpg',
      longDescription:
        'Architected and deployed a serverless data processing solution that reduced operational costs by 60% while improving data processing speed by 3x.',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const techBadgeVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div id="projects" className="py-16 bg-gray-50">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-gray-900 text-center mb-12"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-container-${project.id}`}
              variants={projectVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                className="relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-white text-gray-900 rounded-md"
                    onClick={() => setSelectedId(project.id)}
                  >
                    View Details
                  </motion.button>
                </motion.div>
              </motion.div>

              <div className="p-6">
                <motion.h3
                  className="text-xl font-medium text-indigo-600 mb-2"
                  layoutId={`project-title-${project.id}`}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.description}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                >
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={techBadgeVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for project details */}
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`project-container-${selectedId}`}
              className="bg-white p-8 rounded-lg max-w-2xl m-4"
              onClick={(e) => e.stopPropagation()}
            >
              {projects.find((p) => p.id === selectedId) && (
                <>
                  <motion.h2
                    layoutId={`project-title-${selectedId}`}
                    className="text-2xl font-bold text-indigo-600 mb-4"
                  >
                    {projects.find((p) => p.id === selectedId).title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-600 mb-4"
                  >
                    {projects.find((p) => p.id === selectedId).longDescription}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
                    onClick={() => setSelectedId(null)}
                  >
                    Close
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
