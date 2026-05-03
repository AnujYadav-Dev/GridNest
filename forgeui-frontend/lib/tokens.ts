/**
 * JS representation of all ForgeUI design tokens.
 * Used by the Token Explorer page to render swatches + copy values.
 */

export interface TokenGroup {
  label: string
  description: string
  tokens: Token[]
}

export interface Token {
  name: string
  cssVar: string
  value: string
  type: 'color' | 'font' | 'spacing' | 'radius' | 'shadow' | 'duration' | 'easing'
}

export const colorTokens: TokenGroup = {
  label: 'Colors',
  description: 'All brand, surface, text, and semantic color tokens',
  tokens: [
    { name: 'Background', cssVar: '--forge-bg', value: '#0A0A0B', type: 'color' },
    { name: 'Surface', cssVar: '--forge-surface', value: '#111113', type: 'color' },
    { name: 'Surface 2', cssVar: '--forge-surface-2', value: '#1A1A1E', type: 'color' },
    { name: 'Border', cssVar: '--forge-border', value: '#2A2A2E', type: 'color' },
    { name: 'Border Hover', cssVar: '--forge-border-hover', value: '#3A3A3E', type: 'color' },
    { name: 'Text Primary', cssVar: '--forge-text-primary', value: '#F0F0F2', type: 'color' },
    { name: 'Text Secondary', cssVar: '--forge-text-secondary', value: '#8A8A92', type: 'color' },
    { name: 'Text Muted', cssVar: '--forge-text-muted', value: '#4A4A52', type: 'color' },
    { name: 'Accent', cssVar: '--forge-accent', value: '#6366F1', type: 'color' },
    { name: 'Accent Hover', cssVar: '--forge-accent-hover', value: '#818CF8', type: 'color' },
    { name: 'Accent Subtle', cssVar: '--forge-accent-subtle', value: '#6366F120', type: 'color' },
    { name: 'Success', cssVar: '--forge-success', value: '#22C55E', type: 'color' },
    { name: 'Warning', cssVar: '--forge-warning', value: '#F59E0B', type: 'color' },
    { name: 'Danger', cssVar: '--forge-danger', value: '#EF4444', type: 'color' },
  ],
}

export const typographyTokens: TokenGroup = {
  label: 'Typography',
  description: 'Font family tokens',
  tokens: [
    { name: 'Font Sans (Display)', cssVar: '--forge-font-sans', value: 'Syne, sans-serif', type: 'font' },
    { name: 'Font Body', cssVar: '--forge-font-body', value: 'DM Sans, sans-serif', type: 'font' },
    { name: 'Font Mono', cssVar: '--forge-font-mono', value: 'JetBrains Mono, monospace', type: 'font' },
  ],
}

export const spacingTokens: TokenGroup = {
  label: 'Spacing',
  description: 'Consistent spacing scale used throughout the system',
  tokens: [
    { name: 'Space 1', cssVar: '--forge-space-1', value: '4px', type: 'spacing' },
    { name: 'Space 2', cssVar: '--forge-space-2', value: '8px', type: 'spacing' },
    { name: 'Space 3', cssVar: '--forge-space-3', value: '12px', type: 'spacing' },
    { name: 'Space 4', cssVar: '--forge-space-4', value: '16px', type: 'spacing' },
    { name: 'Space 6', cssVar: '--forge-space-6', value: '24px', type: 'spacing' },
    { name: 'Space 8', cssVar: '--forge-space-8', value: '32px', type: 'spacing' },
    { name: 'Space 12', cssVar: '--forge-space-12', value: '48px', type: 'spacing' },
    { name: 'Space 16', cssVar: '--forge-space-16', value: '64px', type: 'spacing' },
  ],
}

export const radiusTokens: TokenGroup = {
  label: 'Border Radius',
  description: 'Consistent radius scale for rounded corners',
  tokens: [
    { name: 'Radius SM', cssVar: '--forge-radius-sm', value: '4px', type: 'radius' },
    { name: 'Radius MD', cssVar: '--forge-radius-md', value: '8px', type: 'radius' },
    { name: 'Radius LG', cssVar: '--forge-radius-lg', value: '12px', type: 'radius' },
    { name: 'Radius XL', cssVar: '--forge-radius-xl', value: '16px', type: 'radius' },
    { name: 'Radius Full', cssVar: '--forge-radius-full', value: '9999px', type: 'radius' },
  ],
}

export const shadowTokens: TokenGroup = {
  label: 'Shadows',
  description: 'Elevation and glow effects',
  tokens: [
    { name: 'Shadow SM', cssVar: '--forge-shadow-sm', value: '0 1px 3px rgba(0,0,0,0.4)', type: 'shadow' },
    { name: 'Shadow MD', cssVar: '--forge-shadow-md', value: '0 4px 16px rgba(0,0,0,0.5)', type: 'shadow' },
    { name: 'Shadow Glow', cssVar: '--forge-shadow-glow', value: '0 0 24px rgba(99,102,241,0.2)', type: 'shadow' },
  ],
}

export const motionTokens: TokenGroup = {
  label: 'Motion',
  description: 'Duration and easing tokens for consistent animation',
  tokens: [
    { name: 'Duration Fast', cssVar: '--forge-duration-fast', value: '150ms', type: 'duration' },
    { name: 'Duration Normal', cssVar: '--forge-duration-normal', value: '250ms', type: 'duration' },
    { name: 'Duration Slow', cssVar: '--forge-duration-slow', value: '400ms', type: 'duration' },
    { name: 'Ease Out', cssVar: '--forge-ease-out', value: 'cubic-bezier(0.16, 1, 0.3, 1)', type: 'easing' },
    { name: 'Ease Spring', cssVar: '--forge-ease-spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', type: 'easing' },
  ],
}

export const allTokenGroups: TokenGroup[] = [
  colorTokens,
  typographyTokens,
  spacingTokens,
  radiusTokens,
  shadowTokens,
  motionTokens,
]
