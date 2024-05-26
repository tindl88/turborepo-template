import { FlexStyle } from './interfaces/flex.interface';

export const flexStyles: FlexStyle = {
  gap: {
    gap2: { gap: 2 },
    gap4: { gap: 4 },
    gap6: { gap: 6 },
    gap8: { gap: 8 },
    gap10: { gap: 10 },
    gap12: { gap: 12 },
    gap14: { gap: 14 },
    gap16: { gap: 16 },
    gap20: { gap: 20 },
    gap24: { gap: 24 }
  },
  flex: {
    flex1: { flexGrow: 1, flexShrink: 1, flexBasis: '0%' },
    flexAuto: { flexGrow: 1, flexShrink: 1, flexBasis: 'auto' },
    flexInitial: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto' }
  },
  flexGrow: {
    grow: { flexGrow: 1 },
    grow0: { flexGrow: 0 }
  },
  flexShrink: {
    shrink: { flexShrink: 1 },
    shrink0: { flexShrink: 0 }
  },
  flexDirection: {
    row: { flexDirection: 'row' },
    rowReverse: { flexDirection: 'row-reverse' },
    column: { flexDirection: 'column' },
    columnReverse: { flexDirection: 'column-reverse' }
  },
  flexWrap: {
    flexWrap: { flexWrap: 'wrap' },
    flexWrapReverse: { flexWrap: 'wrap-reverse' },
    flexNoWrap: { flexWrap: 'nowrap' }
  },
  justifyContent: {
    justifyStart: { justifyContent: 'flex-start' },
    justifyEnd: { justifyContent: 'flex-end' },
    justifyCenter: { justifyContent: 'center' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyAround: { justifyContent: 'space-around' },
    justifyEvenly: { justifyContent: 'space-evenly' }
  },
  alignItems: {
    itemsStart: { alignItems: 'flex-start' },
    itemsEnd: { alignItems: 'flex-end' },
    itemsCenter: { alignItems: 'center' },
    itemsStretch: { alignItems: 'stretch' },
    itemsBaseline: { alignItems: 'baseline' }
  },
  alignSelf: {
    selfAuto: { alignSelf: 'auto' },
    selfStart: { alignSelf: 'flex-start' },
    selfEnd: { alignSelf: 'flex-end' },
    selfCenter: { alignSelf: 'center' },
    selfStretch: { alignSelf: 'stretch' },
    selfBaseline: { alignSelf: 'baseline' }
  }
};
