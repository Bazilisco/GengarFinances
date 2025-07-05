import { motion } from "framer-motion";

interface GengarMascotProps {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function GengarMascot({
  size = "md",
  animate = true,
}: GengarMascotProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} relative`}
      animate={
        animate
          ? {
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }
          : {}
      }
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gengar body */}
        <path
          d="M100 180C150 180 180 140 180 100C180 60 150 20 100 20C50 20 20 60 20 100C20 140 50 180 100 180Z"
          fill="url(#gengarGradient)"
          className="animate-ghost-glow"
        />

        {/* Spikes on back */}
        <path
          d="M60 40L70 25L80 40M90 35L100 20L110 35M120 40L130 25L140 40"
          stroke="url(#spikeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes */}
        <circle
          cx="75"
          cy="80"
          r="15"
          fill="#FF6B6B"
          className="animate-pulse"
        />
        <circle
          cx="125"
          cy="80"
          r="15"
          fill="#FF6B6B"
          className="animate-pulse"
        />
        <circle cx="75" cy="80" r="8" fill="#FFFFFF" />
        <circle cx="125" cy="80" r="8" fill="#FFFFFF" />

        {/* Mouth */}
        <path
          d="M85 120Q100 135Q115 120"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Teeth */}
        <polygon points="90,120 95,130 85,130" fill="#FFFFFF" />
        <polygon points="110,120 115,130 105,130" fill="#FFFFFF" />

        {/* Arms */}
        <ellipse
          cx="45"
          cy="120"
          rx="20"
          ry="35"
          fill="url(#gengarGradient)"
          transform="rotate(-30 45 120)"
        />
        <ellipse
          cx="155"
          cy="120"
          rx="20"
          ry="35"
          fill="url(#gengarGradient)"
          transform="rotate(30 155 120)"
        />

        {/* Hands */}
        <circle cx="30" cy="140" r="12" fill="url(#gengarGradient)" />
        <circle cx="170" cy="140" r="12" fill="url(#gengarGradient)" />

        <defs>
          <linearGradient
            id="gengarGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#9654FF" />
            <stop offset="50%" stopColor="#7C2AFF" />
            <stop offset="100%" stopColor="#5D0FFF" />
          </linearGradient>
          <linearGradient
            id="spikeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#B589FF" />
            <stop offset="100%" stopColor="#9654FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating ghost aura */}
      <motion.div
        className="absolute inset-0 rounded-full bg-ghost/10 blur-xl"
        animate={
          animate
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
