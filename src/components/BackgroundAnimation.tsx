import { motion } from "framer-motion";

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-bg-gradient" />
      
      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Large Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-particle-glow rounded-full"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-particle-glow rounded-full"
        animate={{
          x: [0, -20, 0],
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-particle-glow rounded-full"
        animate={{
          x: [0, 10, 0],
          y: [0, -25, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          delay: 4,
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;