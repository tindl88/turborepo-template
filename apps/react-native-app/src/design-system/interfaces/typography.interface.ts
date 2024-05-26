// Ref: https://reactnative.dev/docs/text-style-props

import { TextStyle } from 'react-native';

type FontFamilyType = {
  fontSans: TextStyle;
  fontSerif: TextStyle;
  fontMono: TextStyle;
};
type FontSizeType = {
  text12: TextStyle;
  text14: TextStyle;
  text16: TextStyle;
  text18: TextStyle;
  text20: TextStyle;
  text24: TextStyle;
  text28: TextStyle;
  text32: TextStyle;
  text36: TextStyle;
  text48: TextStyle;
  text60: TextStyle;
  text72: TextStyle;
  text96: TextStyle;
  text128: TextStyle;
};
type FontWeightType = {
  fontThin: TextStyle;
  fontExtraLight: TextStyle;
  fontLight: TextStyle;
  fontNormal: TextStyle;
  fontMedium: TextStyle;
  fontSemibold: TextStyle;
  fontBold: TextStyle;
  fontExtraBold: TextStyle;
  fontBlack: TextStyle;
};
type FontStyleType = {
  normal: TextStyle;
  italic: TextStyle;
};
type TextAlignType = {
  textAuto: TextStyle;
  textLeft: TextStyle;
  textCenter: TextStyle;
  textRight: TextStyle;
  textJustify: TextStyle;
};
type LetterSpacingType = {
  trackingTighter: TextStyle;
  trackingTight: TextStyle;
  trackingNormal: TextStyle;
  trackingWide: TextStyle;
  trackingWider: TextStyle;
  trackingWidest: TextStyle;
};
type LineHeightType = {
  leading2: TextStyle;
  leading4: TextStyle;
  leading6: TextStyle;
  leading8: TextStyle;
  leading10: TextStyle;
  leading12: TextStyle;
  leading16: TextStyle;
  leading20: TextStyle;
  leading24: TextStyle;
  leading28: TextStyle;
  leading32: TextStyle;
  leading36: TextStyle;
  leading40: TextStyle;
  leadingNone: TextStyle;
  leadingTight: TextStyle;
  leadingSnug: TextStyle;
  leadingNormal: TextStyle;
  leadingRelaxed: TextStyle;
  leadingLoose: TextStyle;
};
type TextDecorationLineType = {
  underline: TextStyle;
  noUnderline: TextStyle;
  lineThrough: TextStyle;
  underlineThrough: TextStyle;
};
type TextTransformType = {
  uppercase: TextStyle;
  lowercase: TextStyle;
  capitalize: TextStyle;
  normalCase: TextStyle;
};
type FontVariantType = {
  smallCaps: TextStyle;
  oldStyleNums: TextStyle;
  liningNums: TextStyle;
  tabularNums: TextStyle;
  proportionalNums: TextStyle;
};
type TextShadowColorType = TextStyle;
type TextShadowOffsetType = TextStyle;
type TextShadowRadiusType = TextStyle;

export type TypographyStyles = {
  fontFamily: FontFamilyType;
  fontSize: FontSizeType;
  fontWeight: FontWeightType;
  fontStyle: FontStyleType;
  textAlign: TextAlignType;
  letterSpacing: LetterSpacingType;
  lineHeight: LineHeightType;
  textDecorationLine: TextDecorationLineType;
  textTransform: TextTransformType;
  fontVariant: FontVariantType;
  textShadowColor: TextShadowColorType;
  textShadowOffset: TextShadowOffsetType;
  textShadowRadius: TextShadowRadiusType;
};
