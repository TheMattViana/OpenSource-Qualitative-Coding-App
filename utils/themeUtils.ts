import { AppTheme } from '../types';

export const applyTheme = (theme: AppTheme) => {
  const root = document.documentElement;
  
  const themes = {
    default: {
      '--bg-main': '#f1f5f9',       // Slate 100
      '--bg-panel': '#ffffff',      // White
      '--bg-header': '#0f172a',     // Slate 900
      '--text-main': '#0f172a',     // Slate 900
      '--text-muted': '#64748b',    // Slate 500
      '--border': '#e2e8f0',        // Slate 200
      '--accent': '#2563eb',        // Blue 600
      '--accent-text': '#ffffff',
      '--bg-paper': '#ffffff',      // Paper Color
      '--zebra-odd': '#f8fafc',
    },
    hobbit: {
      '--bg-main': '#e4d8b4',       // Parchment
      '--bg-panel': '#fdf6e3',      // Light Parchment
      '--bg-header': '#2c3e28',     // Deep Forest Green
      '--text-main': '#433422',     // Dark Brown
      '--text-muted': '#8c7b64',    // Light Brown
      '--border': '#d3c6a0',        // Darker Parchment
      '--accent': '#5c7c35',        // Leaf Green
      '--accent-text': '#ffffff',
      '--bg-paper': '#fdf6e3',      // Paper Color (match panel)
      '--zebra-odd': '#f2e9c9',
    },
    dark: {
      '--bg-main': '#0f172a',       // Slate 900
      '--bg-panel': '#1e293b',      // Slate 800
      '--bg-header': '#020617',     // Slate 950
      '--text-main': '#f8fafc',     // Slate 50
      '--text-muted': '#94a3b8',    // Slate 400
      '--border': '#334155',        // Slate 700
      '--accent': '#38bdf8',        // Sky 400
      '--accent-text': '#0f172a',
      '--bg-paper': '#1e293b',      // Dark Paper
      '--zebra-odd': '#253147',
    },
    bluedark: {
      '--bg-main': '#0c1220',       // Deep Navy
      '--bg-panel': '#131b2e',      // Navy Panel
      '--bg-header': '#070a13',     // Almost Black
      '--text-main': '#e2e8f0',     // Slate 200
      '--text-muted': '#607b96',    // Blue Grey
      '--border': '#1e293b',        // Navy Border
      '--accent': '#64ffda',        // Teal
      '--accent-text': '#0f172a',
      '--bg-paper': '#131b2e',      // Dark Paper
      '--zebra-odd': '#1a2438',
    },
    corporate: {
      '--bg-main': '#e5e5e5',       // Grey
      '--bg-panel': '#ffffff',      // White
      '--bg-header': '#404040',     // Neutral 700
      '--text-main': '#171717',     // Neutral 900
      '--text-muted': '#737373',    // Neutral 500
      '--border': '#d4d4d4',        // Neutral 300
      '--accent': '#000000',        // Black
      '--accent-text': '#ffffff',
      '--bg-paper': '#ffffff',      // White Paper
      '--zebra-odd': '#f5f5f5',
    }
  };

  const selected = themes[theme];
  
  Object.entries(selected).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};