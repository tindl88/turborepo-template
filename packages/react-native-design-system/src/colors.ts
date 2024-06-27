import { BackgroundColorType, BorderColorType, ColorStyles, TextColorType } from './interfaces/color.interface';
import { designSystemConfigs } from './config';
import { toCapitalized } from '~shared-universal/utils/string.util';

const generateColorStyles = (
  prefix: 'bg' | 'text' | 'border',
  colorName: string,
  colorShades: Record<string, string>
) => {
  const styles: Record<string, { [key: string]: string }> = {};

  Object.entries(colorShades).forEach(([shade, color]) => {
    const name = toCapitalized(colorName);
    const key = `${prefix}${name}${shade}`;

    if (prefix === 'bg') {
      styles[key] = { backgroundColor: color };
    } else if (prefix === 'text') {
      styles[key] = { color };
    } else if (prefix === 'border') {
      styles[key] = { borderColor: color };
      styles[`${prefix}T${name}${shade}`] = { borderTopColor: color };
      styles[`${prefix}R${name}${shade}`] = { borderRightColor: color };
      styles[`${prefix}B${name}${shade}`] = { borderBottomColor: color };
      styles[`${prefix}L${name}${shade}`] = { borderLeftColor: color };
    }
  });

  return styles;
};

const generateAllColorStyles = (prefix: 'bg' | 'text' | 'border') => {
  return Object.entries(designSystemConfigs.colors).reduce((acc, [colorName, colorShades]) => {
    return { ...acc, ...generateColorStyles(prefix, toCapitalized(colorName), colorShades as Record<string, string>) };
  }, {});
};

const colorStyles: ColorStyles = {
  background: {
    bgTransparent: { backgroundColor: 'transparent' },
    bgWhite: { backgroundColor: designSystemConfigs.colors.white },
    bgBlack: { backgroundColor: designSystemConfigs.colors.black },
    ...generateAllColorStyles('bg')
  } as BackgroundColorType,
  color: {
    textTransparent: { color: 'transparent' },
    textWhite: { color: '#ffffff' },
    textBlack: { color: '#000000' },
    ...generateAllColorStyles('text')
  } as TextColorType,
  border: {
    borderTransparent: { borderColor: 'transparent' },
    borderWhite: { borderColor: '#ffffff' },
    borderBlack: { borderColor: '#000000' },
    ...generateAllColorStyles('border')
  } as BorderColorType
};

export default colorStyles;
