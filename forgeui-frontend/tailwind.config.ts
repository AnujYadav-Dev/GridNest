import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forge-bg': 'var(--forge-bg)',
        'forge-surface': 'var(--forge-surface)',
        'forge-surface-2': 'var(--forge-surface-2)',
        'forge-accent': 'var(--forge-accent)',
        'forge-accent-hover': 'var(--forge-accent-hover)',
        'forge-accent-subtle': 'var(--forge-accent-subtle)',
        'forge-text': 'var(--forge-text-primary)',
        'forge-text-secondary': 'var(--forge-text-secondary)',
        'forge-muted': 'var(--forge-text-muted)',
        'forge-border': 'var(--forge-border)',
        'forge-border-hover': 'var(--forge-border-hover)',
        'forge-success': 'var(--forge-success)',
        'forge-warning': 'var(--forge-warning)',
        'forge-danger': 'var(--forge-danger)',
      },
      fontFamily: {
        sans: ['var(--forge-font-sans)', 'sans-serif'],
        body: ['var(--forge-font-body)', 'sans-serif'],
        mono: ['var(--forge-font-mono)', 'monospace'],
      },
      transitionTimingFunction: {
        'forge-out': 'var(--forge-ease-out)',
        'forge-spring': 'var(--forge-ease-spring)',
      },
      boxShadow: {
        'forge-sm': 'var(--forge-shadow-sm)',
        'forge-md': 'var(--forge-shadow-md)',
        'forge-glow': 'var(--forge-shadow-glow)',
      },
      borderRadius: {
        'forge-sm': 'var(--forge-radius-sm)',
        'forge-md': 'var(--forge-radius-md)',
        'forge-lg': 'var(--forge-radius-lg)',
        'forge-xl': 'var(--forge-radius-xl)',
        'forge-full': 'var(--forge-radius-full)',
      }
    }
  },
  plugins: [],
}

export default config
