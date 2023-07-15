# rn-adaptive-styles

##IMPORTANT:warning:: The library is still in development and things might change. 

####Contributions and Feedbacks are appreciated.

React Native library to enable adaptive styling. Support foldables and css media query like styling. 

## Installation

```sh
npm install rn-adaptive-styles
```

## Usage


###### adaptiveKey

`adaptiveKey` creates the key which can be used in the style object which is read by the library and returns the style object.

|Parameters|Type|Default|Required|Description|
|:---:|:---:|:---:|:---:|:---:|
|minWidth|number||Required|Min Width at which the styles should be applied `minWidth >= DeviceWidth` |
|maxWidth|number|-1| No|Max Width till the style will be applied such as `maxWidh < DeviceWidth`. Use `-1` to ignore the value|
|minHeight|number|-1|No|Min Height at which the styles should be applied `minHeight >= DeviceHeight`. Use `-1` to ignore the value |
|maxHeight|number|-1|No|Max Height till the style will be applied such as `maxHeight < DeviceHeight`. Use `-1` to ignore the value|
|platform|"ios" ,"android","windows","macos","web" as string or string[] |no|The Platform on which the styles would be applied. Leave empty to apply it on all platforms. |


###### createDynamicStyles 

`createDynamicStyles` can be used to generate static styles depending on the screen-size and platform defined. Useful to modify styles when used on bigger screens(typically tablets and Ipads) to support their larger screen.

```js
import { createAdaptiveStyles, adaptiveKey } from 'rn-adaptive-styles';

// ...

const styles = createAdaptiveStyles({
            
    container: {
        //Base Styles
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
       
       //Adaptive styles applied if deviceWidth >= 650px
       // It will overwrite backgroundColor and flexDirection defined in base styles
        [adaptiveKey(600)]: {
        flexDirection: "row",
        backgroundColor: "orange",
        },
    },

    // Styles need not use adaptiveKey if not required.
    box: {
        borderRadius: 4,
        width: 70,
        margin: 10,
        height: 70,
        backgroundColor: "yellow",
    }
});

```

###### useAdaptiveStyle

useAdaptiveStyle hook enables adaptive styles which updates when screen dimensions change, such as when a foldable screen changes.


```js
import { View } from "react-native";

import {  adaptiveKe, useAdaptiveStyles } from "rn-adaptive-style";

export default function App() {
  const styles = useAdaptiveStyles(styles_obj as AdaptiveStyles);
  console.log(styles);
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <View key={num} style={styles.box} />
      ))}
    </View>
  );
}

const styles_obj = {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    [adaptiveKey(600)]: {
      flexDirection: "row",
      backgroundColor: "orange",
    },
  },
  box: {
    borderRadius: 4,
    width: 70,
    margin: 10,
    height: 70,
    backgroundColor: "yellow",
  },
};


```
![Example 1]( ./static/example1.gif)


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT