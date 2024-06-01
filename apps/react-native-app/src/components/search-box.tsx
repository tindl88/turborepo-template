import React, { FC } from 'react';
import { SearchIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { ds } from '@/design-system';

import View from '@/components/core-ui/view';

import { createStyle } from '@/utils/stylesheet.util';

import InputText from './core-ui/input';

type SearchBoxProps = {
  value: string;
  onChange?: (value: string) => void;
};

const SearchBox: FC<SearchBoxProps> = ({ value, onChange }) => {
  return (
    <View style={[ds.row, ds.px14]}>
      <InputText value={value} style={[ds.grow, ds.bgWhite, styles.input]} onChangeText={onChange} />
      <Pressable style={[ds.absolute, ds.px10, ds.justifyCenter, styles.button]}>
        <SearchIcon />
      </Pressable>
    </View>
  );
};

export default SearchBox;

const styles = createStyle({
  input: {
    paddingRight: 56
  },
  button: {
    right: 16,
    marginTop: 1,
    height: 46
  }
});
