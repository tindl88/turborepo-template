/**
 * Ref: https://medium.com/nerd-for-tech/react-native-styles-normalization-e8ce77a3110c
 */
import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Based on iPhone 11 scale
const WIDTH_BASE_SCALE = SCREEN_WIDTH / 414;
const HEIGHT_BASE_SCALE = SCREEN_HEIGHT / 896;

function normalize(size: number, based = 'width') {
  const newSize = based === 'height' ? size * HEIGHT_BASE_SCALE : size * WIDTH_BASE_SCALE;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
//for width  pixel
const widthPixel = (size: number) => {
  return normalize(size, 'width');
};

//for height  pixel
const heightPixel = (size: number) => {
  return normalize(size, 'height');
};

//for font  pixel
const fontPixel = (size: number) => {
  return heightPixel(size);
};

//for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number) => {
  return heightPixel(size);
};

//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size);
};

export {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel};

/**
 * Usage Example
 *
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: pixelSizeHorizontal(15),
      paddingVerticle: pixelSizeVertical(20),
      marginBottom: pixelSizeVertical(10),
      height: heightPixel(200),
      width: widthPixel(200),
    },
    title: {
      fontSize: fontPixel(18),
      paddingVerticle: pixelSizeVertical(10),
    },
  })
 */
