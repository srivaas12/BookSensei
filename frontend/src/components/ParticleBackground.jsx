// src/components/ParticleBackground.jsx

import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // ✅ IMPORT from the new slim package

const ParticleBackground = () => {
  // ✅ UPDATED initialization function
  const particlesInit = useCallback(async (engine) => {
    // This loads the slim bundle, adding only the features we need
    await loadSlim(engine);
  }, []);

  const particleOptions = {
    // ... [Your existing particleOptions object remains exactly the same]
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 120, // Increased for smoother animations
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#888888" },
      links: {
        color: "#888888",
        distance: 150,
        enable: true,
        opacity: 1.0,
        width: 1,
      },
      collisions: { enable: true },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 50,
      },
      opacity: { value: 0.2 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particleOptions}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default ParticleBackground;