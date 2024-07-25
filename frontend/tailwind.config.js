/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },

    extend: {
      colors: {
        primary: "#8739f9",
        secondary: "#37B9F1",
        white_bg: "#F2F5F5",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.blue.600"),
              "&:hover": {
                color: theme("colors.blue.700"),
              },
            },
            h1: {
              fontWeight: "700",
              color: theme("colors.gray.900"),
              marginBottom: theme("spacing.3"), // Reduced margin
            },
            h2: {
              fontWeight: "600",
              color: theme("colors.gray.900"),
              marginBottom: theme("spacing.2.5"), // Reduced margin
            },
            h3: {
              fontWeight: "500",
              color: theme("colors.gray.900"),
              marginBottom: theme("spacing.2"), // Reduced margin
            },
            h4: {
              fontWeight: "500",
              color: theme("colors.gray.900"),
              marginBottom: theme("spacing.2"), // Reduced margin
            },
            p: {
              marginBottom: theme("spacing.2"), // Reduced margin
            },
            ul: {
              marginBottom: theme("spacing.2"), // Reduced margin
            },
            ol: {
              marginBottom: theme("spacing.2"), // Reduced margin
            },
            li: {
              "&::marker": {
                color: theme("colors.gray.500"),
              },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.300"),
              paddingLeft: theme("spacing.3"),
              color: theme("colors.gray.600"),
              fontStyle: "italic",
            },
            img: {
              borderRadius: theme("borderRadius.lg"),
              marginBottom: theme("spacing.4"),
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              padding: theme("spacing.1"),
              borderRadius: theme("borderRadius.sm"),
            },
            pre: {
              backgroundColor: theme("colors.gray.900"),
              color: theme("colors.gray.100"),
              padding: theme("spacing.4"),
              borderRadius: theme("borderRadius.lg"),
              overflowX: "auto",
            },
            table: {
              width: "100%",
              marginBottom: theme("spacing.4"),
              borderCollapse: "collapse",
            },
            th: {
              backgroundColor: theme("colors.gray.100"),
              fontWeight: "600",
              padding: theme("spacing.2"),
              border: `1px solid ${theme("colors.gray.300")}`,
            },
            td: {
              padding: theme("spacing.2"),
              border: `1px solid ${theme("colors.gray.300")}`,
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.500"),
              },
            },
            h1: {
              color: theme("colors.gray.100"),
            },
            h2: {
              color: theme("colors.gray.100"),
            },
            h3: {
              color: theme("colors.gray.100"),
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.600"),
              color: theme("colors.gray.400"),
            },
            code: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.gray.100"),
            },
            pre: {
              backgroundColor: theme("colors.gray.800"),
            },
            th: {
              backgroundColor: theme("colors.gray.700"),
              color: theme("colors.gray.100"),
            },
            td: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.gray.100"),
            },
            p: {
              marginBottom: theme("spacing.2"), // Reduced margin for dark mode as well
            },
            ul: {
              marginBottom: theme("spacing.2"), // Reduced margin for dark mode as well
            },
            ol: {
              marginBottom: theme("spacing.2"), // Reduced margin for dark mode as well
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
