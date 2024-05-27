import { BorderRadiusType, BorderStyles, BorderStyleType, BorderWidthType } from './interfaces/border.interface';

const borderStyle: BorderStyleType = {
  borderSolid: { borderStyle: 'solid' },
  borderDashed: { borderStyle: 'dashed' },
  borderDotted: { borderStyle: 'dotted' }
};

const generateBorderRadius = (steps: number[]) => {
  const borderRadius: Record<string, { [key: string]: number }> = {};

  steps.forEach(step => {
    borderRadius[`rounded${step}`] = { borderRadius: step };
    borderRadius[`roundedT${step}`] = { borderTopLeftRadius: step, borderTopRightRadius: step };
    borderRadius[`roundedR${step}`] = { borderTopRightRadius: step, borderBottomRightRadius: step };
    borderRadius[`roundedB${step}`] = { borderBottomRightRadius: step, borderBottomLeftRadius: step };
    borderRadius[`roundedL${step}`] = { borderTopLeftRadius: step, borderBottomLeftRadius: step };
  });
  borderRadius.roundedFull = { borderRadius: 9999 };
  borderRadius.roundedTFull = { borderTopLeftRadius: 9999, borderTopRightRadius: 9999 };
  borderRadius.roundedRFull = { borderTopRightRadius: 9999, borderBottomRightRadius: 9999 };
  borderRadius.roundedBFull = { borderBottomRightRadius: 9999, borderBottomLeftRadius: 9999 };
  borderRadius.roundedLFull = { borderTopLeftRadius: 9999, borderBottomLeftRadius: 9999 };

  return borderRadius as unknown as BorderRadiusType;
};

const generateBorderWidth = (max: number) => {
  const borderWidth: Record<string, { [key: string]: number }> = {};

  for (let i = 0; i <= max; i++) {
    borderWidth[`border${i}`] = { borderWidth: i };
    borderWidth[`borderT${i}`] = { borderTopWidth: i };
    borderWidth[`borderR${i}`] = { borderRightWidth: i };
    borderWidth[`borderB${i}`] = { borderBottomWidth: i };
    borderWidth[`borderL${i}`] = { borderLeftWidth: i };
    borderWidth[`borderStart${i}`] = { borderStartWidth: i };
    borderWidth[`borderEnd${i}`] = { borderEndWidth: i };
  }

  return borderWidth as unknown as BorderWidthType;
};

const borderStyles: BorderStyles = {
  borderStyle: borderStyle,
  borderWidth: generateBorderWidth(8),
  borderRadius: generateBorderRadius([0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24])
};

export default borderStyles;
