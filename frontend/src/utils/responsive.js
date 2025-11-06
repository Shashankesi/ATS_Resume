/**
 * Mobile responsiveness utilities
 */

// Tailwind breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Hook to detect screen size
export const useResponsive = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowSize.width < breakpoints.md,
    isTablet: windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg,
    isDesktop: windowSize.width >= breakpoints.lg,
    width: windowSize.width,
    height: windowSize.height,
  };
};

// Responsive image component
export const ResponsiveImage = ({
  src,
  alt,
  srcSet,
  sizes,
  className = '',
  loading = 'lazy',
}) => (
  <img
    src={src}
    alt={alt}
    srcSet={srcSet}
    sizes={sizes}
    className={`w-full h-auto ${className}`}
    loading={loading}
    decoding="async"
  />
);

// Mobile-friendly touch handler
export const useTouchHandler = (onSwipe) => {
  const touchStart = React.useRef(0);
  const touchEnd = React.useRef(0);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEnd.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!onSwipe) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe || isRightSwipe) {
      onSwipe(isLeftSwipe ? 'left' : 'right');
    }
  };

  return { handleTouchStart, handleTouchEnd };
};
