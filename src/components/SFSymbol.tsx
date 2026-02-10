import React, { forwardRef, useMemo } from "react";
import { StyleSheet, type ColorValue, type StyleProp, type TextStyle, type ViewProps } from "react-native";
import { getHostComponent, type ViewConfig } from "react-native-nitro-modules";

import SFSymbolViewConfig from "../../nitrogen/generated/shared/json/SFSymbolViewConfig.json";
import type { SFSymbolViewMethods, SFSymbolViewProps } from "../specs/SFSymbolView.nitro";

const NativeSFSymbolView = getHostComponent<SFSymbolViewProps, SFSymbolViewMethods>(
  "SFSymbolView",
  () => SFSymbolViewConfig as ViewConfig<SFSymbolViewProps>,
);

export type SFSymbolWeight =
  | "ultraLight"
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "heavy"
  | "black";

export type SFSymbolScale = "small" | "medium" | "large";

export type SFSymbolRenderingMode = "monochrome" | "hierarchical" | "palette" | "multicolor";

export type SFSymbolResizeMode = "contain" | "cover" | "stretch" | "center";

export type SFSymbolTextStyle =
  | "largeTitle"
  | "title"
  | "title2"
  | "title3"
  | "headline"
  | "subheadline"
  | "body"
  | "callout"
  | "footnote"
  | "caption"
  | "caption2";

const TEXT_STYLE_TO_POINTS: Record<SFSymbolTextStyle, number> = {
  largeTitle: 34,
  title: 28,
  title2: 22,
  title3: 20,
  headline: 17,
  subheadline: 15,
  body: 17,
  callout: 16,
  footnote: 13,
  caption: 12,
  caption2: 11,
};

export type SFSymbolProps = ViewProps & {
  /** SF Symbol name */
  name: string;
  /**
   * Size of the symbol. Can be a number (point size) or a text style string.
   * @example size={24} or size="title"
   */
  size?: number | SFSymbolTextStyle;
  /** Weight of the symbol */
  weight?: SFSymbolWeight;
  /** Scale of the symbol */
  scale?: SFSymbolScale;
  /** Rendering mode */
  renderingMode?: SFSymbolRenderingMode;
  /** Variable value (for symbols that support it) */
  variableValue?: number;
  /**
   * Primary color of the symbol. For multiple colors, use the `colors` prop.
   * Can also be set via `style.color`.
   * @example color="#007AFF"
   */
  color?: ColorValue;
  /**
   * Array of colors for palette rendering mode.
   * Takes precedence over `color` and `style.color`.
   * @example colors={["#FF3B30", "#34C759", "#007AFF"]}
   */
  colors?: ColorValue[];
  /**
   * Style object for the symbol. Supports TextStyle properties including `color`.
   */
  style?: StyleProp<TextStyle>;
};

type NativeSFSymbolComponentRef = React.ComponentRef<typeof NativeSFSymbolView>;

/**
 * A React Native component for rendering SF Symbols.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SFSymbol name="star.fill" />
 *
 * // With color
 * <SFSymbol name="heart.fill" color="#FF3B30" />
 *
 * // With style.color
 * <SFSymbol name="star.fill" style={{ color: '#FFD700' }} />
 *
 * // With size and weight
 * <SFSymbol name="heart.fill" size={24} weight="semibold" />
 *
 * // With text style sizing
 * <SFSymbol name="gear" size="title" />
 *
 * // With hierarchical rendering and color
 * <SFSymbol
 *   name="folder.fill.badge.plus"
 *   renderingMode="hierarchical"
 *   color="#007AFF"
 * />
 *
 * // With palette colors
 * <SFSymbol
 *   name="person.crop.circle.badge.checkmark"
 *   renderingMode="palette"
 *   colors={["#FF3B30", "#34C759", "#007AFF"]}
 * />
 *
 * // With variable value (for symbols that support it)
 * <SFSymbol name="speaker.wave.3.fill" variableValue={0.5} />
 * ```
 */
export const SFSymbol = forwardRef<NativeSFSymbolComponentRef, SFSymbolProps>(
  ({ name, size = "body", color, colors, style, ...restProps }, ref) => {
    // Determine if size is a number (point size) or string (text style)
    const sizeProps: { size?: number; textStyle?: string } =
      typeof size === "number" ? { size } : typeof size === "string" ? { textStyle: size } : {};

    // Calculate dimension for explicit sizing
    const dimension = useMemo(() => {
      if (typeof size === "number") {
        return size;
      }
      return TEXT_STYLE_TO_POINTS[size in TEXT_STYLE_TO_POINTS ? size : "body"];
    }, [size]);

    // Resolve colors: colors prop > color prop > style.color
    const resolvedColors = useMemo(() => {
      if (colors && colors.length > 0) {
        return colors.map((c) => String(c));
      }
      if (color) {
        return [String(color)];
      }
      const flatStyle = StyleSheet.flatten(style) as TextStyle | undefined;
      if (flatStyle?.color) {
        return [String(flatStyle.color)];
      }
      return undefined;
    }, [colors, color, style]);

    // Combine user style with explicit sizing
    const combinedStyle = useMemo(() => {
      return [{ width: dimension, height: dimension }, style];
    }, [dimension, style]);

    return (
      <NativeSFSymbolView
        {...restProps}
        symbolName={name}
        {...sizeProps}
        colors={resolvedColors}
        style={combinedStyle}
        ref={ref}
      />
    );
  },
);

SFSymbol.displayName = "SFSymbol";
