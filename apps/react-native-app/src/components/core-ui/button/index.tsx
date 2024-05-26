import React, { FC, memo, ReactNode, useState } from 'react';
import { Platform, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ds } from '@/design-system';

import Text from '../text';
import { ButtonColorType, ButtonVariantType, ICoreUIBaseProps, RoundedType } from '../types';

interface IButtonProps extends PressableProps {
  variant?: ButtonVariantType;
  color?: ButtonColorType;
  text?: string | null;
  disabled?: boolean;
  children?: ReactNode;
  rounded?: RoundedType;
  style?: StyleProp<ViewStyle | TextStyle>;
  onPress?: () => void;
}

const Button: FC<IButtonProps & ICoreUIBaseProps> = ({
  children,
  variant = 'default',
  color = 'primary',
  rounded = 12,
  visible = true,
  disabled,
  onPress,
  style,
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(false);

  if (!visible) return null;

  return (
    <Pressable
      disabled={disabled}
      testID={'button'}
      accessibilityLabel={'button'}
      accessibilityRole={Platform.select({ ios: 'button', default: 'tab' })}
      style={[
        styles.component,
        styles.rounded(rounded),
        // Normal
        styles.theme(variant, color)?.background?.normal,
        styles.theme(variant, color)?.border?.normal,
        // Disabled
        disabled && styles.theme(variant, color)?.background?.disabled,
        disabled && styles.theme(variant, color)?.border?.disabled,
        // Pressed
        isPressed && styles.theme(variant, color)?.background?.pressed,
        isPressed && styles.theme(variant, color)?.border?.pressed,
        style
      ]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      {...rest}
    >
      <Text
        style={[
          // Normal
          styles.theme(variant, color)?.text?.normal,
          // Disabled
          disabled && styles.theme(variant, color)?.text?.disabled,
          // Pressed
          isPressed && styles.theme(variant, color)?.text?.pressed
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export default memo(Button);

const themes = {
  default: {
    primary: {
      background: { normal: {}, pressed: {}, disabled: {} },
      text: { normal: { ...ds.textPrimary500 }, pressed: { ...ds.textPrimary600 }, disabled: { ...ds.textGray200 } },
      border: { normal: {}, pressed: {}, disabled: {} }
    },
    secondary: {
      background: { normal: {}, pressed: {}, disabled: {} },
      text: { normal: { ...ds.textSlate500 }, pressed: { ...ds.textSlate600 }, disabled: { ...ds.textGray200 } },
      border: { normal: {}, pressed: {}, disabled: {} }
    },
    success: {
      background: { normal: {}, pressed: {}, disabled: {} },
      text: { normal: { ...ds.textGreen500 }, pressed: { ...ds.textGreen600 }, disabled: { ...ds.textGray200 } },
      border: { normal: {}, pressed: {}, disabled: {} }
    },
    danger: {
      background: { normal: {}, pressed: {}, disabled: {} },
      text: { normal: { ...ds.textRed500 }, pressed: { ...ds.textRed600 }, disabled: { ...ds.textGray200 } },
      border: { normal: {}, pressed: {}, disabled: {} }
    },
    warning: {
      background: { normal: {}, pressed: {}, disabled: {} },
      text: { normal: { ...ds.textAmber500 }, pressed: { ...ds.textAmber600 }, disabled: { ...ds.textGray200 } },
      border: { normal: {}, pressed: {}, disabled: {} }
    },
    info: {
      background: { normal: {}, pressed: {}, disabled: {} },
      text: { normal: { ...ds.textSky500 }, pressed: { ...ds.textSky600 }, disabled: { ...ds.textGray200 } },
      border: { normal: {}, pressed: {}, disabled: {} }
    }
  },
  contained: {
    primary: {
      background: { normal: { ...ds.bgPrimary500 }, pressed: { ...ds.bgPrimary600 }, disabled: { ...ds.bgPrimary200 } },
      text: { normal: { ...ds.textWhite }, pressed: {}, disabled: {} },
      border: {
        normal: { ...ds.borderPrimary500 },
        pressed: { ...ds.borderPrimary600 },
        disabled: { ...ds.borderPrimary200 }
      }
    },
    secondary: {
      background: { normal: { ...ds.bgSlate500 }, pressed: { ...ds.bgSlate600 }, disabled: { ...ds.bgSlate200 } },
      text: { normal: { ...ds.textWhite }, pressed: {}, disabled: {} },
      border: {
        normal: { ...ds.borderSlate500 },
        pressed: { ...ds.borderSlate600 },
        disabled: { ...ds.borderSlate200 }
      }
    },
    success: {
      background: { normal: { ...ds.bgGreen500 }, pressed: { ...ds.bgGreen600 }, disabled: { ...ds.bgGreen200 } },
      text: { normal: { ...ds.textWhite }, pressed: {}, disabled: {} },
      border: {
        normal: { ...ds.borderGreen500 },
        pressed: { ...ds.borderGreen600 },
        disabled: { ...ds.borderGreen200 }
      }
    },
    danger: {
      background: { normal: { ...ds.bgRed500 }, pressed: { ...ds.bgRed600 }, disabled: { ...ds.bgRed200 } },
      text: { normal: { ...ds.textWhite }, pressed: {}, disabled: {} },
      border: { normal: { ...ds.borderRed500 }, pressed: { ...ds.borderRed600 }, disabled: { ...ds.borderRed200 } }
    },
    warning: {
      background: { normal: { ...ds.bgAmber500 }, pressed: { ...ds.bgAmber600 }, disabled: { ...ds.bgAmber200 } },
      text: { normal: { ...ds.textBlack }, pressed: {}, disabled: { ...ds.textSlate300 } },
      border: {
        normal: { ...ds.borderAmber500 },
        pressed: { ...ds.borderAmber600 },
        disabled: { ...ds.borderAmber200 }
      }
    },
    info: {
      background: { normal: { ...ds.bgSky500 }, pressed: { ...ds.bgSky600 }, disabled: { ...ds.bgSky200 } },
      text: { normal: { ...ds.textBlack }, pressed: {}, disabled: { ...ds.textSlate300 } },
      border: { normal: { ...ds.borderSky500 }, pressed: { ...ds.borderSky600 }, disabled: { ...ds.borderSky200 } }
    }
  },
  outlined: {
    primary: {
      background: { normal: {}, pressed: { ...ds.bgPrimary200 }, disabled: {} },
      text: { normal: { ...ds.textBlack }, pressed: {}, disabled: { ...ds.textSlate300 } },
      border: {
        normal: { ...ds.borderPrimary500 },
        pressed: { ...ds.borderPrimary300 },
        disabled: { ...ds.borderPrimary100 }
      }
    },
    secondary: {
      background: { normal: {}, pressed: { ...ds.bgSlate200 }, disabled: {} },
      text: { normal: { ...ds.textBlack }, pressed: {}, disabled: { ...ds.textSlate300 } },
      border: {
        normal: { ...ds.borderSlate500 },
        pressed: { ...ds.borderSlate300 },
        disabled: { ...ds.borderSlate100 }
      }
    },
    success: {
      background: { normal: {}, pressed: { ...ds.bgGreen200 }, disabled: {} },
      text: { normal: { ...ds.textBlack }, pressed: {}, disabled: { ...ds.textSlate300 } },
      border: {
        normal: { ...ds.borderGreen500 },
        pressed: { ...ds.borderGreen300 },
        disabled: { ...ds.borderGreen100 }
      }
    },
    danger: {
      background: { normal: {}, pressed: { ...ds.bgRed200 }, disabled: {} },
      text: { normal: { ...ds.textBlack }, pressed: {}, disabled: { ...ds.textSlate300 } },
      border: { normal: { ...ds.borderRed500 }, pressed: { ...ds.borderRed300 }, disabled: { ...ds.borderRed100 } }
    },
    warning: {
      background: { normal: {}, pressed: { ...ds.bgAmber200 }, disabled: {} },
      text: { normal: { ...ds.textBlack }, pressed: {}, disabled: { ...ds.textSlate300 } },
      border: {
        normal: { ...ds.borderAmber500 },
        pressed: { ...ds.borderAmber300 },
        disabled: { ...ds.borderAmber100 }
      }
    },
    info: {
      background: { normal: {}, pressed: { ...ds.bgSky200 }, disabled: {} },
      text: { normal: { ...ds.textBlack }, pressed: {}, disabled: { ...ds.textSlate300 } },
      border: { normal: { ...ds.borderSky500 }, pressed: { ...ds.borderSky300 }, disabled: { ...ds.borderSky100 } }
    }
  }
};

const styles = StyleSheet.create<{
  // FIXME: Fix type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  rounded(value: RoundedType): ViewStyle;
  // FIXME: Fix type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme(variant: ButtonVariantType, themeColor: ButtonColorType): any;
}>({
  component: {
    ...ds.p12,
    ...ds.row,
    ...ds.itemsCenter,
    ...ds.justifyCenter,
    ...ds.selfStart,
    ...ds.border1,
    ...ds.borderTransparent,
    ...ds.fontBold
  },
  theme: (variant, themeColor) => {
    return themes[variant][themeColor];
  },
  rounded: value => {
    return {
      borderRadius: value
    };
  }
});
