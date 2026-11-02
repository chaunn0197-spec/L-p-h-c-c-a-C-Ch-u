import confetti from "canvas-confetti";

/**
 * Spectacular multi-stage fireworks display for passport stamp certification.
 * Shoots rockets from left, right, and center with varied colors and golden stars.
 */
export const triggerStampCelebration = () => {
  const duration = 2800;
  const animationEnd = Date.now() + duration;

  // Initial grand central burst with gold and diamond sparks
  confetti({
    particleCount: 80,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.55 },
    colors: ["#FFE600", "#FFD700", "#FF1744", "#00E5FF", "#10B981"],
    scalar: 1.3,
    zIndex: 99999,
  });

  // Dual side cannons + random sky explosions
  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = Math.floor(40 * (timeLeft / duration)) + 20;

    // Left cannon shooting towards upper-right
    confetti({
      particleCount: Math.floor(particleCount * 0.7),
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0.05, y: 0.8 },
      colors: ["#FFD700", "#FF3366", "#38BDF8", "#F59E0B"],
      zIndex: 99999,
    });

    // Right cannon shooting towards upper-left
    confetti({
      particleCount: Math.floor(particleCount * 0.7),
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0.95, y: 0.8 },
      colors: ["#00F0FF", "#10B981", "#EC4899", "#FFE600"],
      zIndex: 99999,
    });

    // Random fireworks bursts in the night sky
    const randomX = Math.random() * 0.6 + 0.2;
    const randomY = Math.random() * 0.4 + 0.15;
    confetti({
      particleCount: Math.floor(particleCount * 0.6),
      spread: 360,
      startVelocity: 25,
      ticks: 70,
      origin: { x: randomX, y: randomY },
      colors: ["#FFEA00", "#FF2A6D", "#05D9E8", "#01FFC3", "#FFFFFF"],
      scalar: 1.1,
      zIndex: 99999,
    });
  }, 240);
};
