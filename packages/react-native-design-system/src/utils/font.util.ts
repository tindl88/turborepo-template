/*
IOS result: { fontFamily: 'OpenSans', fontWeight: '600', style: 'italic' }
Android result: { fontFamily: 'OpenSans-SemiBoldItalic' }
*/
import { Platform } from 'react-native';

import { FontStyle, FontWeight } from '../interfaces/font.interface';

export type FontMakerOptions = {
  name?: string;
  weight?: FontWeight;
  style?: FontStyle;
  separator?: string;
};

type FontMakerResult = {
  fontFamily: string;
  fontWeight?: number;
  fontStyle?: string;
};

const fontWeightMapping: Record<FontWeight, number> = {
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900
};

export const fontMaker = (options: FontMakerOptions = {}): FontMakerResult => {
  const { name = 'Quicksand', weight = 'Regular', style = 'Normal', separator = '_' } = options;
  const isIOS = Platform.OS === 'ios';
  const mappedFontWeight = fontWeightMapping[weight] || fontWeightMapping.Regular;

  if (isIOS) {
    return {
      fontFamily: name,
      fontWeight: mappedFontWeight,
      fontStyle: style.toLowerCase()
    };
  } else {
    const androidFontStyle = style === 'Normal' ? '' : 'Italic';
    const androidFontFamily = `${name}${separator}${weight}${androidFontStyle}`;

    return {
      fontFamily: androidFontFamily
    };
  }
};
