import { BackgroundColorType, BorderColorType, ColorStyles, TextColorType } from './interfaces/color.interface';
import { designSystemConfigs } from './config';

const generateColorStyles = (
  prefix: 'bg' | 'text' | 'border',
  colorName: string,
  colorShades: Record<string, string>
) => {
  const styles: Record<string, { [key: string]: string }> = {};

  Object.entries(colorShades).forEach(([shade, color]) => {
    const key = `${prefix}${colorName}${shade}`;

    if (prefix === 'bg') {
      styles[key] = { backgroundColor: color };
    } else if (prefix === 'text') {
      styles[key] = { color };
    } else if (prefix === 'border') {
      styles[key] = { borderColor: color };
      styles[`${prefix}T${colorName}${shade}`] = { borderTopColor: color };
      styles[`${prefix}R${colorName}${shade}`] = { borderRightColor: color };
      styles[`${prefix}B${colorName}${shade}`] = { borderBottomColor: color };
      styles[`${prefix}L${colorName}${shade}`] = { borderLeftColor: color };
    }
  });

  return styles;
};

const generateAllColorStyles = (prefix: 'bg' | 'text' | 'border') => {
  return Object.entries(designSystemConfigs.colors).reduce((acc, [colorName, colorShades]) => {
    return { ...acc, ...generateColorStyles(prefix, colorName, colorShades as Record<string, string>) };
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
