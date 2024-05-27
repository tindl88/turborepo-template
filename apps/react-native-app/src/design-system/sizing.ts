import { SizingStyles } from './interfaces/sizing.interface';
import { designSystemConfigs } from './config';

function generateSizing(spacing: Record<string, number>, spacingPercent: Record<string, string>) {
  const sizes = Object.entries(spacing);
  const percentSizes = Object.entries(spacingPercent);

  const width: { [key: string]: { width: number | string } } = {};
  const minWidth: { [key: string]: { minWidth: number } } = {};
  const maxWidth: { [key: string]: { maxWidth: number } } = {};
  const height: { [key: string]: { height: number | string } } = {};
  const minHeight: { [key: string]: { minHeight: number } } = {};
  const maxHeight: { [key: string]: { maxHeight: number } } = {};

  width.wFull = { width: '100%' };
  width.wAuto = { width: 'auto' };
  height.hFull = { height: '100%' };
  height.hAuto = { height: 'auto' };

  for (const size of percentSizes) {
    width[`w${size[0].replace('%', '')}Percent`] = { width: size[1] };
    height[`w${size[0].replace('%', '')}Percent`] = { height: size[1] };
  }

  for (const size of sizes) {
    width[`w${size[0]}`] = { width: size[1] };
    height[`h${size[0]}`] = { height: size[1] };
    minWidth[`minW${size[0]}`] = { minWidth: size[1] };
    maxWidth[`maxW${size[0]}`] = { maxWidth: size[1] };
    minHeight[`minH${size[0]}`] = { minHeight: size[1] };
    maxHeight[`maxH${size[0]}`] = { maxHeight: size[1] };
  }

  return { width, minWidth, maxWidth, height, minHeight, maxHeight };
}

const sizingStyles = generateSizing(designSystemConfigs.spacing, designSystemConfigs.spacingPercent) as SizingStyles;

export default sizingStyles;
