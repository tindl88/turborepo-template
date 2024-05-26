import { StyleSheet } from 'react-native';

import { borderStyles } from './border';
import { Colors, colorStyles } from './colors';
import { effectStyles } from './effect';
import { flexStyles } from './flex';
import { imageStyles } from './image';
import { layoutStyles } from './layout';
import { Sizing, sizingStyles } from './sizing';
import Spacing from './spacing';
import { typographyStyle } from './typography';

const styles = StyleSheet.create<any>({
  heading1: { ...typographyStyle.fontSize.text36 },
  heading2: { ...typographyStyle.fontSize.text32 },
  heading3: { ...typographyStyle.fontSize.text28 },
  heading4: { ...typographyStyle.fontSize.text24 },
  heading5: { ...typographyStyle.fontSize.text20 },
  heading6: { ...typographyStyle.fontSize.text16 },
  // COLOR
  ...colorStyles.background,
  ...colorStyles.border,
  ...colorStyles.color,
  // SPACING
  ...Spacing.margin,
  ...Spacing.padding,
  // SIZING
  ...sizingStyles.width,
  ...sizingStyles.height,
  // BORDER
  ...borderStyles.borderWidth,
  ...borderStyles.borderStyle,
  ...borderStyles.borderRadius,
  // IMAGE
  ...imageStyles.resizeMode,
  // TYPOGRAPHY
  ...typographyStyle.fontFamily,
  ...typographyStyle.fontSize,
  ...typographyStyle.fontWeight,
  ...typographyStyle.fontStyle,
  ...typographyStyle.textAlign,
  ...typographyStyle.fontVariant,
  ...typographyStyle.letterSpacing,
  ...typographyStyle.lineHeight,
  ...typographyStyle.textDecorationLine,
  ...typographyStyle.textShadowColor,
  ...typographyStyle.textShadowOffset,
  ...typographyStyle.textShadowRadius,
  ...typographyStyle.textTransform,
  // FLEX
  ...flexStyles.gap,
  ...flexStyles.flex,
  ...flexStyles.flexWrap,
  ...flexStyles.flexGrow,
  ...flexStyles.flexShrink,
  ...flexStyles.flexDirection,
  ...flexStyles.justifyContent,
  ...flexStyles.alignItems,
  ...flexStyles.alignSelf,
  // LAYOUT
  ...layoutStyles.overflow,
  ...layoutStyles.position,
  ...layoutStyles.display,
  ...layoutStyles.top,
  ...layoutStyles.right,
  ...layoutStyles.bottom,
  ...layoutStyles.left,
  ...layoutStyles.zIndex,
  // EFFECT
  ...effectStyles.opacity
});

export default styles;

export { Colors, Sizing };
