import baseConfig from "@mgcrea/eslint-config-react-native";

const config = [
  ...baseConfig,
  {
    rules: {
      "react/prop-types": "off",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.json"],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

export default config;
