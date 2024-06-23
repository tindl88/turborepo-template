import React, { FC } from 'react';
import { MapPin } from 'lucide-react-native';
import { Image, ImageSourcePropType, ImageStyle, Pressable } from 'react-native';
import { Colors, ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';
import IconStarSolid from '@/components/svgs/ico-star-solid';

import { useThemeState } from '@/modules/theme/states/theme.state';
import { AccommodationEntity } from '@/modules/travel-accommodations/interfaces/accommodations.interface';

type AccommodationItemProps = {
  item: AccommodationEntity;
  onPress?: () => void;
};

const AccommodationItem: FC<AccommodationItemProps> = ({ item, onPress }) => {
  const { configs } = useThemeState();

  return (
    <Pressable
      style={[ds.row, ds.gap10, ds.p6, ds.rounded24, dynamicStyles.background(configs.card)]}
      onPress={onPress}
    >
      <>
        <Image style={[ds.w112, ds.h112, ds.rounded20] as ImageStyle} source={item.image as ImageSourcePropType} />
        <View style={[ds.px10, ds.py6, ds.column, ds.justifyBetween]}>
          <View>
            <Text fontWeight="Bold" fontSize={20}>
              {item.name}
            </Text>
            <View style={[ds.row, ds.itemsCenter, ds.gap2, ds.mt2]}>
              <MapPin color={configs.secondaryForeground} size={18} strokeWidth={1.5} />
              <Text color={configs.secondaryForeground} style={[ds.text14]}>
                {item.location}
              </Text>
            </View>
            <View style={[ds.row, ds.itemsCenter, ds.gap4]}>
              <IconStarSolid width={20} color={Colors.amber[500]} />
              <Text fontWeight="Bold" fontSize={14}>
                {item.rating}
              </Text>
            </View>
          </View>

          <View style={ds.row}>
            <Text color={configs.primary[500]} fontWeight="Bold">{`$${item.price}`}</Text>
            <Text fontSize={13}>/night</Text>
          </View>
        </View>
      </>
    </Pressable>
  );
};

export default AccommodationItem;
