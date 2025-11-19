export type AppleColorShades = {
  light: string;
  dark: string;
  contrastLight: string;
  contrastDark: string;
};

export const APPLE_COLORS = {
  systemBlue: {
    light: "#007aff",
    dark: "#0a84ff",
    contrastLight: "#0040dd",
    contrastDark: "#409cff",
  },
  systemGreen: {
    light: "#34c759",
    dark: "#30d158",
    contrastLight: "#248a3d",
    contrastDark: "#30db5b",
  },
  systemIndigo: {
    light: "#5856d6",
    dark: "#5e5ce6",
    contrastLight: "#3634a3",
    contrastDark: "#7d7aff",
  },
  systemOrange: {
    light: "#ff9500",
    dark: "#ff9f0a",
    contrastLight: "#c93400",
    contrastDark: "#ffb340",
  },
  systemPink: {
    light: "#ff2d55",
    dark: "#ff375f",
    contrastLight: "#d30f45",
    contrastDark: "#ff6482",
  },
  systemPurple: {
    light: "#af52de",
    dark: "#bf5af2",
    contrastLight: "#8944ab",
    contrastDark: "#da8fff",
  },
  systemRed: {
    light: "#ff3b30",
    dark: "#ff453a",
    contrastLight: "#d70015",
    contrastDark: "#ff6961",
  },
  systemTeal: {
    light: "#5ac8fa",
    dark: "#64d2ff",
    contrastLight: "#0071a4",
    contrastDark: "#70d7ff",
  },
  systemYellow: {
    light: "#ffcc00",
    dark: "#ffd60a",
    contrastLight: "#b36200",
    contrastDark: "#ffd426",
  },
  systemGray: {
    light: "#8e8e93",
    dark: "#8e8e93",
    contrastLight: "#6c6c70",
    contrastDark: "#aeaeb2",
  },
  systemGray2: {
    light: "#aeaeb2",
    dark: "#636366",
    contrastLight: "#8e8e93",
    contrastDark: "#7c7c80",
  },
  systemGray3: {
    light: "#c7c7cc",
    dark: "#48484a",
    contrastLight: "#aeaeb2",
    contrastDark: "#545456",
  },
  systemGray4: {
    light: "#d1d1d6",
    dark: "#3a3a3c",
    contrastLight: "#bcbcc0",
    contrastDark: "#444446",
  },
  systemGray5: {
    light: "#e5e5ea",
    dark: "#2c2c2e",
    contrastLight: "#d8d8dc",
    contrastDark: "#363638",
  },
  systemGray6: {
    light: "#f2f2f7",
    dark: "#1c1c1e",
    contrastLight: "#ebebf0",
    contrastDark: "#242426",
  },
  systemBackground: {
    light: "#ffffff",
    dark: "#000000",
    contrastLight: "#ffffff",
    contrastDark: "#000000",
  },
  secondarySystemBackground: {
    light: "#f2f2f7",
    dark: "#1c1c1e",
    contrastLight: "#ebebf0",
    contrastDark: "#242426",
  },
  tertiarySystemBackground: {
    light: "#ffffff",
    dark: "#2c2c2e",
    contrastLight: "#ffffff",
    contrastDark: "#363638",
  },
  systemGroupedBackground: {
    light: "#f2f2f7",
    dark: "#000000",
    contrastLight: "#ebebf0",
    contrastDark: "#000000",
  },
  secondarySystemGroupedBackground: {
    light: "#ffffff",
    dark: "#1c1c1e",
    contrastLight: "#ffffff",
    contrastDark: "#242426",
  },
  tertiarySystemGroupedBackground: {
    light: "#f2f2f7",
    dark: "#2c2c2e",
    contrastLight: "#ebebf0",
    contrastDark: "#363638",
  },
  systemFill: {
    light: "#78788033",
    dark: "#7878805c",
    contrastLight: "#78788047",
    contrastDark: "#78788070",
  },
  secondarySystemFill: {
    light: "#78788028",
    dark: "#78788051",
    contrastLight: "#7878803d",
    contrastDark: "#78788066",
  },
  tertiarySystemFill: {
    light: "#7676801e",
    dark: "#7676803d",
    contrastLight: "#76768033",
    contrastDark: "#76768051",
  },
  quaternarySystemFill: {
    light: "#74748014",
    dark: "#7676802e",
    contrastLight: "#76768028",
    contrastDark: "#76768042",
  },
  lightText: {
    light: "#ffffff99",
    dark: "#ffffff99",
    contrastLight: "#ffffff99",
    contrastDark: "#ffffff99",
  },
  darkText: {
    light: "#000000",
    dark: "#000000",
    contrastLight: "#000000",
    contrastDark: "#000000",
  },
  label: {
    light: "#000000",
    dark: "#ffffff",
    contrastLight: "#000000",
    contrastDark: "#ffffff",
  },
  secondaryLabel: {
    light: "#3c3c4399",
    dark: "#ebebf599",
    contrastLight: "#3c3c43cc",
    contrastDark: "#ebebf5b3",
  },
  tertiaryLabel: {
    light: "#3c3c434c",
    dark: "#ebebf54c",
    contrastLight: "#3c3c43b3",
    contrastDark: "#ebebf58c",
  },
  quaternaryLabel: {
    light: "#3c3c432e",
    dark: "#ebebf52e",
    contrastLight: "#3c3c438c",
    contrastDark: "#ebebf566",
  },
  link: {
    light: "#007aff",
    dark: "#0984ff",
    contrastLight: "#007aff",
    contrastDark: "#0984ff",
  },
  placeholderText: {
    light: "#3c3c434c",
    dark: "#ebebf54c",
    contrastLight: "#3c3c43b3",
    contrastDark: "#ebebf58c",
  },
  separator: {
    light: "#3c3c434a",
    dark: "#54545899",
    contrastLight: "#3c3c435e",
    contrastDark: "#545458ae",
  },
  opaqueSeparator: {
    light: "#c6c6c8",
    dark: "#38383a",
    contrastLight: "#c6c6c8",
    contrastDark: "#38383a",
  },
} satisfies Record<string, AppleColorShades>;

export type AppleColor = keyof typeof APPLE_COLORS;
