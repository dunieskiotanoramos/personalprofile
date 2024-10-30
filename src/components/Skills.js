// components/Skills.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skills = [
    {
      category: "Frontend",
      items: [
        { name: "React", level: 90, icon: "🔵" },
        { name: "JavaScript", level: 85, icon: "💛" },
        { name: "TypeScript", level: 80, icon: "🔷" },
        { name: "HTML/CSS", level: 90, icon: "🎨" },
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", level: 85, icon: "💚" },
        { name: "Python", level: 80, icon: "🐍" },
        { name: "Java", level: 75, icon: "☕" },
        { name: "SQL", level: 85, icon: "📊" },
      ]
    },
    {
      category: "Tools & Others",
      items: [
        { name: "Git", level: 90, icon: "📚" },
        { name: "Docker", level: 80, icon: "🐋" },
        { name: "AWS", level: 75, icon: "☁️" },
        { name: "GraphQL", level: 70, icon: "📱" },
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const categoryVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const skillItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-900 mb-16"
        >
          Professional Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <motion.div
              key={category.category}
              variants={categoryVariants}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <motion.h3
                className="text-2xl font-semibold text-indigo-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                {category.category}
              </motion.h3>

              <motion.div className="space-y-4">
                {category.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={skillItemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <motion.div
                      className="flex items-center justify-between mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="font-medium text-gray-700">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </motion.div>

                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-indigo-600 rounded-full"
                        variants={progressVariants}
                        custom={skill.level}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                          duration: 0.3,
                          type: "spring",
                          stiffness: 300
                        }}
                      />
                    </div>

                    <motion.div
                      initial={false}
                      animate={selectedSkill === skill.name ? "open" : "closed"}
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        closed: { opacity: 0, height: 0 }
                      }}
                      className="overflow-hidden"
                    >
                      {selectedSkill === skill.name && (
                        <p className="text-sm text-gray-600 mt-2">
                          Additional details about {skill.name}
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating skill indicators */}
        <motion.div
          className="fixed bottom-4 right-4 flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {["Beginner", "Intermediate", "Expert"].map((level, index) => (
            <motion.div
              key={level}
              className="px-3 py-1 bg-white rounded-full shadow-md text-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {level}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;

