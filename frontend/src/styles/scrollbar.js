/**
 * Global Scrollbar Styling
 * Applied to entire app for premium look
 */

const scrollbarStyles = `
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(249, 115, 22, 0.5) transparent;
  }

  /* Chrome, Edge, Safari */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgb(249, 115, 22), rgb(236, 72, 153));
    border-radius: 4px;
    border: 2px solid rgba(15, 23, 42, 0.5);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, rgb(255, 133, 27), rgb(244, 114, 182));
    box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
  }
`;

export default scrollbarStyles;
