//   gap: {
//     gap2: { gap: 2 },
//     gap4: { gap: 4 },
//     gap6: { gap: 6 },
//     gap8: { gap: 8 },
//     gap10: { gap: 10 },
//     gap12: { gap: 12 },
//     gap14: { gap: 14 },
//     gap16: { gap: 16 },
//     gap20: { gap: 20 },
//     gap24: { gap: 24 }
//   }
//   flex: {
//     flex1: { flexGrow: 1, flexShrink: 1, flexBasis: '0%' },
//     flexAuto: { flexGrow: 1, flexShrink: 1, flexBasis: 'auto' },
//     flexInitial: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto' }
//   },
//   flexGrow: {
//     grow: { flexGrow: 1 },
//     grow0: { flexGrow: 0 }
//   },
//   flexShrink: {
//     shrink: { flexShrink: 1 },
//     shrink0: { flexShrink: 0 }
//   },
//   flexDirection: {
//     row: { flexDirection: 'row' },
//     rowReverse: { flexDirection: 'row-reverse' },
//     column: { flexDirection: 'column' },
//     columnReverse: { flexDirection: 'column-reverse' }
//   },
//   flexWrap: {
//     flexWrap: { flexWrap: 'wrap' },
//     flexWrapReverse: { flexWrap: 'wrap-reverse' },
//     flexNoWrap: { flexWrap: 'nowrap' }
//   },
//   justifyContent: {
//     justifyStart: { justifyContent: 'flex-start' },
//     justifyEnd: { justifyContent: 'flex-end' },
//     justifyCenter: { justifyContent: 'center' },
//     justifyBetween: { justifyContent: 'space-between' },
//     justifyAround: { justifyContent: 'space-around' },
//     justifyEvenly: { justifyContent: 'space-evenly' }
//   },
//   alignItems: {
//     itemsStart: { alignItems: 'flex-start' },
//     itemsEnd: { alignItems: 'flex-end' },
//     itemsCenter: { alignItems: 'center' },
//     itemsStretch: { alignItems: 'stretch' },
//     itemsBaseline: { alignItems: 'baseline' }
//   },
//   alignSelf: {
//     selfAuto: { alignSelf: 'auto' },
//     selfStart: { alignSelf: 'flex-start' },
//     selfEnd: { alignSelf: 'flex-end' },
//     selfCenter: { alignSelf: 'center' },
//     selfStretch: { alignSelf: 'stretch' },
//     selfBaseline: { alignSelf: 'baseline' }
//   }

import { ViewStyle } from 'react-native';

type GapType = {
  gap2: ViewStyle;
  gap4: ViewStyle;
  gap6: ViewStyle;
  gap8: ViewStyle;
  gap10: ViewStyle;
  gap12: ViewStyle;
  gap14: ViewStyle;
  gap16: ViewStyle;
  gap20: ViewStyle;
  gap24: ViewStyle;
};
type FlexType = {
  flex1: ViewStyle;
  flexAuto: ViewStyle;
  flexInitial: ViewStyle;
};
type FlexGrowType = {
  grow: ViewStyle;
  grow0: ViewStyle;
};
type FlexShrinkType = {
  shrink: ViewStyle;
  shrink0: ViewStyle;
};
type FlexDirectionType = {
  row: ViewStyle;
  rowReverse: ViewStyle;
  column: ViewStyle;
  columnReverse: ViewStyle;
};
type FlexWrapType = {
  flexWrap: ViewStyle;
  flexWrapReverse: ViewStyle;
  flexNoWrap: ViewStyle;
};
type JustifyContentType = {
  justifyStart: ViewStyle;
  justifyEnd: ViewStyle;
  justifyCenter: ViewStyle;
  justifyBetween: ViewStyle;
  justifyAround: ViewStyle;
  justifyEvenly: ViewStyle;
};
type AlignItemsType = {
  itemsStart: ViewStyle;
  itemsEnd: ViewStyle;
  itemsCenter: ViewStyle;
  itemsStretch: ViewStyle;
  itemsBaseline: ViewStyle;
};
type AlignSelfType = {
  selfAuto: ViewStyle;
  selfStart: ViewStyle;
  selfEnd: ViewStyle;
  selfCenter: ViewStyle;
  selfStretch: ViewStyle;
  selfBaseline: ViewStyle;
};

export type FlexStyle = {
  gap: GapType;
  flex: FlexType;
  flexGrow: FlexGrowType;
  flexShrink: FlexShrinkType;
  flexDirection: FlexDirectionType;
  flexWrap: FlexWrapType;
  justifyContent: JustifyContentType;
  alignItems: AlignItemsType;
  alignSelf: AlignSelfType;
};
