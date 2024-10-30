import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // code
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={childVariants} className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Have a question or want to work together?
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <motion.div
            variants={formVariants}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Thank you!
                </h3>
                <p className="text-gray-600">
                  Your message has been sent successfully.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div variants={childVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
                    placeholder="Your Name"
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
                    placeholder="your@email.com"
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 resize-none"
                    placeholder="Your message here..."
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-3 px-6 ${
                    isSending
                      ? 'bg-indigo-400'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white rounded-lg transition duration-200 shadow-lg flex items-center justify-center`}
                >
                  {isSending ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </div>

        <motion.div variants={childVariants} className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Or connect with me on social media
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 transition duration-200"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 transition duration-200"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:your.email@example.com"
              className="text-gray-600 hover:text-indigo-600 transition duration-200"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
