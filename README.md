# rn-adaptive-styles

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
![Example 1]( ./static/example1.gif)



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT