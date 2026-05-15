/* =============================================
   Framer Motion Animation Variants
   এই ফাইলে সমস্ত page ও component এর
   animation definitions আছে
   ============================================= */

// পেজ transition animation — পেজ লোড হওয়ার সময় ব্যবহার হয়
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
}

// কার্ড fade-in animation — card গুলো নিচ থেকে উপরে আসে
export const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
}

// Stagger container — child elements একে একে animate হয়
export const containerVariants = {
  initial:  {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// Slide from left animation — sidebar, drawer এর জন্য
export const slideLeftVariants = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0,   opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { x: -60, opacity: 0, transition: { duration: 0.2 } },
}

// Slide from right animation
export const slideRightVariants = {
  initial: { x: 60, opacity: 0 },
  animate: { x: 0,  opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { x: 60, opacity: 0, transition: { duration: 0.2 } },
}

// Modal animation — scale + fade effect
export const modalVariants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.18 },
  },
}

// Modal backdrop animation
export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

// Hero section animation — বড় text এর জন্য
export const heroVariants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Fade in — simple opacity animation
export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

// Scale on hover — button ও card এর জন্য
export const scaleHover = {
  whileHover: { scale: 1.03 },
  whileTap:   { scale: 0.97 },
}

// Bounce animation — notification badge এর জন্য
export const bounceVariants = {
  animate: {
    scale: [1, 1.2, 1],
    transition: { repeat: Infinity, repeatDelay: 2, duration: 0.4 },
  },
}
