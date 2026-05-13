// Framer Motion — LUXORA Token Set
export const luxoraMotion = {
  // Easing curves
  ease: {
    luxury:   [0.25, 0.1, 0.0, 1.0],    // Slow, weighted, natural
    reveal:   [0.16, 1.0, 0.3, 1.0],    // Elegant entry
    hover:    [0.34, 1.56, 0.64, 1.0],  // Subtle spring
    exit:     [0.55, 0.0, 1.0, 0.45],   // Confident exit
  },

  // Duration tokens
  duration: {
    instant:  0.15,
    fast:     0.3,
    medium:   0.6,
    slow:     1.0,
    cinematic: 1.6,
  },

  // Reusable variants
  variants: {
    fadeUp: {
      hidden:  { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    },
    fadeIn: {
      hidden:  { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.8 }}
    },
    scaleReveal: {
      hidden:  { opacity: 0, scale: 0.92 },
      visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    },
    stagger: {
      visible: { transition: { staggerChildren: 0.12 }}
    },
    imageHover: {
      rest:  { scale: 1,    transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] }},
      hover: { scale: 1.06, transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
    },
    cardHover: {
      rest:  { y: 0,  boxShadow: '0 8px 40px rgba(60,35,20,0.10)' },
      hover: { y: -8, boxShadow: '0 32px 80px rgba(60,35,20,0.22)' }
    }
  }
}
