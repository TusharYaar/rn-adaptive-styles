import { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Platform } from "react-native";

import type { ViewStyle, TextStyle, ImageStyle } from "react-native";

type M<T> = StyleSheet.NamedStyles<T>;
const KEYINIT = "_$";
const KEYSEP = "__";

Platform.OS;

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

type AdaptiveKey = `_$${string}`;

export type AdaptiveStyles = {
  [key: string]:
    | ViewStyle
    | TextStyle
    | ImageStyle
    | {
        [key: AdaptiveKey]: ViewStyle | TextStyle | ImageStyle;
      };
};

export type AdaptiveStyle<T> =
  | {
      [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
    }
  | {
      [P in keyof T]: {
        [key: AdaptiveKey]: ViewStyle | TextStyle | ImageStyle;
      };
    };

export function adaptiveKey(
  minWidth: number,
  maxWidth: number = -1,
  minHeight: number = -1,
  maxHeight: number = -1,
  platform: Platform["OS"] | Platform["OS"][] = Platform.OS
): AdaptiveKey {
  if (Array.isArray(platform)) {
    if (platform.length > 0) platform = platform.includes(Platform.OS) ? Platform.OS : (platform[0] as Platform["OS"]);
    else platform = Platform.OS;
  }

  return `${KEYINIT}${minWidth}${KEYSEP}${maxWidth}${KEYSEP}${minHeight}${KEYSEP}${maxHeight}${KEYSEP}${platform}`;
}

function makeStyles<T extends AdaptiveStyle<T> | AdaptiveStyle<any>>(
  styles: T | AdaptiveStyle<T>,
  width: number,
  height: number
): T {
  let adaptive_styles: any = {};
  for (const key in styles) {
    adaptive_styles[key] = {};
    for (const key2 in styles[key]) {
      if (
        typeof styles[key][key2] === "object" &&
        key2.charAt(0) === KEYINIT.charAt(0) &&
        key2.charAt(1) === KEYINIT.charAt(1)
      ) {
        const values = key2.slice(KEYINIT.length).split(KEYSEP);
        const minWidth = values[0] ? parseFloat(values[0]) : -1;
        const maxWidth = values[1] ? parseFloat(values[1]) : -1;
        const minHeight = values[2] ? parseFloat(values[2]) : -1;
        const maxHeight = values[3] ? parseFloat(values[3]) : -1;
        const platform: string = values[4] ? values[4] : Platform.OS;

        // TODO: Add Check
        if (width >= minWidth || minWidth === -1) {
          if (maxWidth === -1 || maxWidth > width)
            if (minHeight === -1 || height >= minHeight)
              if (maxHeight > height || maxHeight === -1)
                if (Platform.OS === platform)
                  for (const key3 in styles[key][key2]) adaptive_styles[key][key3] = styles[key][key2][key3];
        }
      } else adaptive_styles[key][key2] = styles[key][key2];
    }
  }

  return StyleSheet.create(adaptive_styles);
}

export function createAdaptiveStyles<T extends AdaptiveStyle<T>>(styles: Record<string, T>) {
  return makeStyles(styles, WINDOW_WIDTH, WINDOW_HEIGHT);
}

export function useAdaptiveStyles<T extends AdaptiveStyle<T> | AdaptiveStyle<any>>(styles: T | AdaptiveStyle<T>): T {
  const [width, setWidth] = useState(WINDOW_WIDTH);
  const [height, setHeight] = useState(WINDOW_WIDTH);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWidth(window.width);
      setHeight(window.height);
    });
    return () => subscription?.remove();
  });

  const adaptive_styles = makeStyles(styles, width, height);
  return adaptive_styles;
}
