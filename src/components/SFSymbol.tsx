import React, { forwardRef, useMemo } from "react";
import { StyleSheet, type ColorValue, type StyleProp, type TextStyle } from "react-native";

import NativeSFSymbolViewNativeComponent, {
  type NativeSFSymbolProps,
  type NativeSFSymbolRenderingMode,
  type NativeSFSymbolScale,
  type NativeSFSymbolTextStyle,
  type NativeSFSymbolWeight,
} from "../native/SFSymbolViewNativeComponent";

type NativeSFSymbolComponentRef = React.ComponentRef<typeof NativeSFSymbolViewNativeComponent>;

export type SFSymbolWeight = NativeSFSymbolWeight;
export type SFSymbolScale = NativeSFSymbolScale;
export type SFSymbolRenderingMode = NativeSFSymbolRenderingMode;
export type SFSymbolTextStyle = NativeSFSymbolTextStyle;

export type SFSymbolProps = Omit<NativeSFSymbolProps, "size" | "textStyle" | "style" | "colors"> & {
  /**
   * Size of the symbol. Can be a number (point size) or a text style string.
   * @example size={24} or size="title"
   */
  size?: number | SFSymbolTextStyle;
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
  ({ size, color, colors, style, ...restProps }, ref) => {
    // Determine if size is a number (point size) or string (text style)
    const sizeProps: Pick<NativeSFSymbolProps, "size" | "textStyle"> =
      typeof size === "number" ? { size } : typeof size === "string" ? { textStyle: size } : {};

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

    return (
      <NativeSFSymbolViewNativeComponent
        {...restProps}
        {...sizeProps}
        colors={resolvedColors}
        style={style}
        ref={ref}
      />
    );
  },
);

SFSymbol.displayName = "SFSymbol";
