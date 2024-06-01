import React, { FC } from 'react';
import { TextStyle, useWindowDimensions } from 'react-native';
import Render, { defaultSystemFonts, HTMLSource } from 'react-native-render-html';
import { fontMaker } from '@/design-system/utils/font.util';

import { useThemeState } from '@/modules/theme/states/theme.state';

type RenderHTMLProps = {
  html: HTMLSource;
};

const RenderHTML: FC<RenderHTMLProps> = ({ html }) => {
  const themeState = useThemeState();
  const { width } = useWindowDimensions();
  const systemFonts = [
    ...defaultSystemFonts,
    'Quicksand',
    'Quicksand_Bold',
    'Quicksand_Light',
    'Quicksand_Medium',
    'Quicksand_Regular',
    'Quicksand_SemiBold'
  ];

  const fontRegular = fontMaker({ name: 'Quicksand', weight: 'Regular', style: 'Normal' });
  const fonBold = fontMaker({ name: 'Quicksand', weight: 'Bold', style: 'Normal' });

  return (
    <Render
      systemFonts={systemFonts}
      contentWidth={width}
      source={html}
      enableExperimentalMarginCollapsing={true}
      tagsStyles={{
        body: {
          fontSize: 16,
          lineHeight: 22,
          color: themeState.configs.foreground,
          fontFamily: fontRegular.fontFamily
        },
        h3: {
          fontFamily: fonBold.fontFamily,
          fontWeight: fonBold.fontWeight as TextStyle['fontWeight'],
          fontSize: 20
        },
        strong: {
          fontFamily: fonBold.fontFamily,
          fontWeight: fonBold.fontWeight as TextStyle['fontWeight']
        },
        p: {
          marginTop: 8,
          marginBottom: 18
        }
      }}
    />
  );
};

export default RenderHTML;
