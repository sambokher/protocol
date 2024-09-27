/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',  
      ], 
  theme: {
      extend: {
          colors: {
          current: {
              5: 'color-mix(in srgb, currentColor 5%, transparent)',
              10: 'color-mix(in srgb, currentColor 10%, transparent)',
              15: 'color-mix(in srgb, currentColor 15%, transparent)',
              20: 'color-mix(in srgb, currentColor 20%, transparent)',
              50: 'color-mix(in srgb, currentColor 50%, transparent)',
              80: 'color-mix(in srgb, currentColor 80%, transparent)',
              DEFAULT: 'currentColor',
          },
          primary: {
              DEFAULT: 'color(from var(--primary) srgb r g b / <alpha-value>)',
              content: 'color(from var(--primary-content) srgb r g b / <alpha-value>)',
              focus: 'color(from var(--primary-focus) srgb r g b / <alpha-value>)',
              surface: 'color(from var(--primary-surface) srgb r g b / <alpha-value>)',
          },
          accent: {
              DEFAULT: 'color(from var(--accent) srgb r g b / <alpha-value>)',
              content: 'color(from var(--accent-content) srgb r g b / <alpha-value>)',
              focus: 'color(from var(--accent-focus) srgb r g b / <alpha-value>)',
              surface: 'color(from var(--accent-surface) srgb r g b / <alpha-value>)',
          },
          base: {
              0: 'color(from var(--base-0) srgb r g b / <alpha-value>)',
              50: 'color(from var(--base-50) srgb r g b / <alpha-value>)',
              100: 'color(from var(--base-100) srgb r g b / <alpha-value>)',
              200: 'color(from var(--base-200) srgb r g b / <alpha-value>)',
              300: 'color(from var(--base-300) srgb r g b / <alpha-value>)',
              400: 'color(from var(--base-400) srgb r g b / <alpha-value>)',
              500: 'color(from var(--base-500) srgb r g b / <alpha-value>)',
              600: 'color(from var(--base-600) srgb r g b / <alpha-value>)',
              700: 'color(from var(--base-700) srgb r g b / <alpha-value>)',
              800: 'color(from var(--base-800) srgb r g b / <alpha-value>)',
              900: 'color(from var(--base-900) srgb r g b / <alpha-value>)',
              content: 'color(from var(--base-content) srgb r g b / <alpha-value>)',
          },
          info: {
              DEFAULT: 'color(from var(--info) srgb r g b / <alpha-value>)',
              content: 'color(from var(--info-content) srgb r g b / <alpha-value>)',
              focus: 'color(from var(--info-focus) srgb r g b / <alpha-value>)',
              surface: 'color(from var(--info-surface) srgb r g b / <alpha-value>)',
          },
          success: {
              DEFAULT: 'color(from var(--success) srgb r g b / <alpha-value>)',
              content: 'color(from var(--success-content) srgb r g b / <alpha-value>)',
              focus: 'color(from var(--success-focus) srgb r g b / <alpha-value>)',
              surface: 'color(from var(--success-surface) srgb r g b / <alpha-value>)',
          },
          error: {
              DEFAULT: 'color(from var(--error) srgb r g b / <alpha-value>)',
              content: 'color(from var(--error-content) srgb r g b / <alpha-value>)',
              focus: 'color(from var(--error-focus) srgb r g b / <alpha-value>)',
              surface: 'color(from var(--error-surface) srgb r g b / <alpha-value>)',
          },
          warning: {
              DEFAULT: 'color(from var(--warning) srgb r g b / <alpha-value>)',
              content: 'color(from var(--warning-content) srgb r g b / <alpha-value>)',
              focus: 'color(from var(--warning-focus) srgb r g b / <alpha-value>)',
              surface: 'color(from var(--warning-surface) srgb r g b / <alpha-value>)',
          }
      }, 
          borderRadius: {
          'xs': 'var(--border-radius-xs)',
          'sm': 'var(--border-radius-sm)',
          'md': 'var(--border-radius-md)',
          'lg': 'var(--border-radius-lg)',
          'xl': 'var(--border-radius-xl)',
          '2xl': 'var(--border-radius-2xl)',
          '3xl': 'var(--border-radius-3xl)',
          'base': 'var(--border-radius-base)',
          'DEFAULT': 'var(--border-radius-base)',
      },
          fontFamily: {
          'sans': ['var(--mainFont)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
          'serif': ['ui-serif', 'Georgia', 'serif'],
          'mono': ['ui-monospace', 'SFMono-Regular', 'monospace']
      }
      }
  }
}