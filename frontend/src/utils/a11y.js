/**
 * Accessibility utilities for SmartCareer
 * Provides ARIA labels, semantic HTML, keyboard navigation support
 */

// Skip to main content link for keyboard users
export const SkipToMainButton = () => (
  <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white">
    Skip to main content
  </a>
);

// Announce dynamic content changes to screen readers
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => announcement.remove(), 1000);
};

// Focus management helper
export const manageFocus = (element) => {
  if (element && element.focus) {
    element.focus({ behavior: 'smooth' });
  }
};

// Keyboard navigation handler
export const useKeyboardNavigation = (items, onSelect) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onSelect(items[activeIndex]);
    }
  };

  return { activeIndex, handleKeyDown };
};

// Color contrast checker (WCAG compliance)
export const getContrastRatio = (hex1, hex2) => {
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
};
