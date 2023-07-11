import { Dimensions, StyleSheet } from "react-native";

let WINDOW_WIDTH = Dimensions.get("window").width;
let WINDOW_HEIGHT = Dimensions.get("window").height;

const KEY_SEPERATOR = "__";

export function dynamicKey(
  minWidth: number | string,
  maxWidth: number | string,
  minHeight: number | string,
  maxHeight: number | string
) {
  return `${KEY_SEPERATOR}${minWidth}${KEY_SEPERATOR}${maxWidth}${KEY_SEPERATOR}${minHeight}${KEY_SEPERATOR}${maxHeight}`;
}

export function createDymanicStyles<T>(styles: T) {
  //   for (const key in Object.keys(styles)) {
  //   }
  return styles;
}

const style = createDymanicStyles({
  screen: {
    padding: 8,
    [dynamicKey(12, 4, 5, 4)]: {},
  },

  padding: {
    padding: 8,
    height: "50%",
  },
});

console.log(style);
