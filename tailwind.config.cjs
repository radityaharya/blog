module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      mono: ['Geist Mono']
    },
    extend: {
      color: {
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        foreground:'rgb(var(--color-text-main) / <alpha-value>)',
      },
      textColor: {
        main: 'rgb(var(--color-text-main) / <alpha-value>)'
      },
      backgroundColor: {
        main: 'rgb(var(--color-bg-main) / <alpha-value>)',
        muted: 'rgb(var(--color-bg-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
      },
      borderColor: {
        main: 'rgb(var(--color-border-main) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        foreground: 'rgb(var(--color-text-main) / <alpha-value>)'
      },
      typography: (theme) => ({
        theme: {
          css: {
            '--tw-prose-body': theme('textColor.main / 100%'),
            '--tw-prose-headings': theme('textColor.main / 100%'),
            '--tw-prose-lead': theme('textColor.main / 100%'),
            '--tw-prose-links': theme('textColor.main / 100%'),
            '--tw-prose-bold': theme('textColor.main / 100%'),
            '--tw-prose-counters': theme('textColor.main / 100%'),
            '--tw-prose-bullets': theme('textColor.main / 100%'),
            '--tw-prose-hr': theme('borderColor.main / 100%'),
            '--tw-prose-quotes': theme('textColor.main / 100%'),
            '--tw-prose-quote-borders': theme('borderColor.main / 100%'),
            '--tw-prose-captions': theme('textColor.main / 100%'),
            '--tw-prose-code': theme('textColor.main / 100%'),
            '--tw-prose-pre-code': theme('colors.zinc.100'),
            '--tw-prose-pre-bg': theme('colors.zinc.800'),
            '--tw-prose-th-borders': theme('borderColor.main / 100%'),
            '--tw-prose-td-borders': theme('borderColor.main / 100%')
          }
        },
        DEFAULT: {
        },
        lg: {
          css: {
            blockquote: {
              paddingLeft: 0
            }
          }
        }
      }),
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite'
      },
    }
  },
};
