import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy loading wrapper with fallback
export const LazyComponent = ({ component: Component, fallback }) => (
  <Suspense fallback={fallback || <LoadingFallback />}>
    <Component />
  </Suspense>
);

// Loading fallback component
const LoadingFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center min-h-screen"
  >
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
      <p className="text-slate-600">Loading...</p>
    </div>
  </motion.div>
);

// Image lazy loading with intersection observer
export const LazyImage = ({ src, alt, placeholder, ...props }) => {
  const [imgSrc, setImgSrc] = React.useState(placeholder);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setImgSrc(src);
    img.src = src;
  }, [src]);

  return <img src={imgSrc} alt={alt} {...props} />;
};

// Responsive hooks
export const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export const useIsMobile = () => useMediaQuery('(max-width: 640px)');
export const useIsTablet = () => useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');

// Responsive container
export const ResponsiveContainer = ({ children, className = '' }) => (
  <div className={`w-full px-4 sm:px-6 lg:px-8 mx-auto ${className}`}>
    {children}
  </div>
);

// Responsive grid
export const ResponsiveGrid = ({
  children,
  cols = { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 },
  gap = 6,
  className = '',
}) => {
  const gapClass = `gap-${gap}`;
  const gridClass = `grid grid-cols-${cols.xs} sm:grid-cols-${cols.sm} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg} xl:grid-cols-${cols.xl} ${gapClass} ${className}`;

  return <div className={gridClass}>{children}</div>;
};

// Code splitting utilities
export const createAsyncComponent = (componentImport) => {
  const Component = lazy(() => componentImport);
  return (props) => (
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  );
};

// Web worker for heavy computations
export const useWebWorker = (workerFunction, dependencies = []) => {
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const run = React.useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const blob = new Blob([`self.onmessage = function(e) { self.postMessage((${workerFunction.toString()})(e.data)); }`], {
        type: 'application/javascript',
      });
      const worker = new Worker(URL.createObjectURL(blob));

      worker.postMessage(args);
      worker.onmessage = (e) => {
        setResult(e.data);
        setLoading(false);
        worker.terminate();
      };

      worker.onerror = (err) => {
        setError(err.message);
        setLoading(false);
        worker.terminate();
      };
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, dependencies);

  return { result, loading, error, run };
};

// Performance monitoring
export const usePerformanceMetrics = () => {
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
        });
      });

      observer.observe({ entryTypes: ['measure', 'navigation'] });

      return () => observer.disconnect();
    }
  }, []);
};

// Debounce hook
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook
export const useThrottle = (value, interval = 500) => {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastUpdated = React.useRef(null);

  React.useEffect(() => {
    const now = Date.now();

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else if (!lastUpdated.current) {
      lastUpdated.current = now;
      setThrottledValue(value);
    }
  }, [value, interval]);

  return throttledValue;
};

// Memoization hook for expensive computations
export const useMemoComputed = (fn, dependencies) => {
  const ref = React.useRef(null);
  const depRef = React.useRef(null);

  if (depRef.current !== dependencies) {
    depRef.current = dependencies;
    ref.current = fn();
  }

  return ref.current;
};

// Intersection observer hook
export const useIntersectionObserver = (ref, options = {}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
};

// Resource hints for performance
export const ResourceHints = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link rel="dns-prefetch" href={process.env.REACT_APP_API_URL} />
  </>
);

// Breakpoints configuration
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Responsive values helper
export const responsiveValue = (values) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  if (isDesktop && values.lg) return values.lg;
  if (isTablet && values.md) return values.md;
  if (isMobile && values.sm) return values.sm;
  return values.base || values.sm || values.md || values.lg;
};
