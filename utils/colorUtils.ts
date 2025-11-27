// Generate a palette index
export const generateColor = (index: number): string => {
  const hues = [
    '#EF4444', // Red
    '#F97316', // Orange
    '#F59E0B', // Amber
    '#84CC16', // Lime
    '#10B981', // Emerald
    '#06B6D4', // Cyan
    '#3B82F6', // Blue
    '#8B5CF6', // Violet
    '#EC4899', // Pink
  ];
  return hues[index % hues.length];
};

// Generate a hierarchical shade
// If parent is Red, child will be a lighter/darker Red
export const generateChildColor = (parentColor: string, siblingIndex: number): string => {
  // Simple Hex to HSL conversion would be ideal, but for robustness without deps:
  // We will simply lighten or darken string manipulation if simple hex, 
  // or return a variation if we can't parse it.
  
  // For this demo, we'll try a simple opacity/overlay trick or shift
  // In a real prod app, use 'tinycolor2' library.
  // Here is a basic "Lighten" hex logic:
  
  const num = parseInt(parentColor.replace("#",""), 16);
  const amt = (siblingIndex % 2 === 0) ? 20 : -20; // Alternating lighter/darker
  
  let r = (num >> 16) + amt;
  let b = ((num >> 8) & 0x00FF) + amt;
  let g = (num & 0x0000FF) + amt;

  const newColor = g | (b << 8) | (r << 16);
  return "#" + (0x1000000 + (newColor<255?newColor<1?0:newColor:255)*0x1000000).toString(16).slice(1);
};

export const getContrastText = (hexColor: string): string => {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
};