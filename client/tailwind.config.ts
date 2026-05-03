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
        'gridnest-bg': 'var(--gridnest-bg)',
        'gridnest-surface': 'var(--gridnest-surface)',
        'gridnest-surface-2': 'var(--gridnest-surface-2)',
        'gridnest-accent': 'var(--gridnest-accent)',
        'gridnest-accent-hover': 'var(--gridnest-accent-hover)',
        'gridnest-accent-subtle': 'var(--gridnest-accent-subtle)',
        'gridnest-text': 'var(--gridnest-text-primary)',
        'gridnest-text-secondary': 'var(--gridnest-text-secondary)',
        'gridnest-muted': 'var(--gridnest-text-muted)',
        'gridnest-border': 'var(--gridnest-border)',
        'gridnest-border-hover': 'var(--gridnest-border-hover)',
        'gridnest-success': 'var(--gridnest-success)',
        'gridnest-warning': 'var(--gridnest-warning)',
        'gridnest-danger': 'var(--gridnest-danger)',
      },
      fontFamily: {
        sans: ['var(--gridnest-font-sans)', 'sans-serif'],
        body: ['var(--gridnest-font-body)', 'sans-serif'],
        mono: ['var(--gridnest-font-mono)', 'monospace'],
      },
      transitionTimingFunction: {
        'gridnest-out': 'var(--gridnest-ease-out)',
        'gridnest-spring': 'var(--gridnest-ease-spring)',
      },
      boxShadow: {
        'gridnest-sm': 'var(--gridnest-shadow-sm)',
        'gridnest-md': 'var(--gridnest-shadow-md)',
        'gridnest-glow': 'var(--gridnest-shadow-glow)',
      },
      borderRadius: {
        'gridnest-sm': 'var(--gridnest-radius-sm)',
        'gridnest-md': 'var(--gridnest-radius-md)',
        'gridnest-lg': 'var(--gridnest-radius-lg)',
        'gridnest-xl': 'var(--gridnest-radius-xl)',
        'gridnest-full': 'var(--gridnest-radius-full)',
      }
    }
  },
  plugins: [],
}

export default config
