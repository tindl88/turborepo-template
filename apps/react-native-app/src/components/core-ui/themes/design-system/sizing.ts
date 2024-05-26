import config from '../config';

export const sizingStyles = {
  width: {
    w5Percent: { width: '5%' },
    w10Percent: { width: '10%' },
    w20Percent: { width: '20%' },
    w25Percent: { width: '25%' },
    w30Percent: { width: '30%' },
    w40Percent: { width: '40%' },
    w45Percent: { width: '45%' },
    w50Percent: { width: '50%' },
    w55Percent: { width: '55%' },
    w60Percent: { width: '60%' },
    w65Percent: { width: '65%' },
    w70Percent: { width: '70%' },
    w75Percent: { width: '75%' },
    w80Percent: { width: '80%' },
    w85Percent: { width: '85%' },
    w90Percent: { width: '90%' },
    w95Percent: { width: '95%' },
    wFull: { width: '100%' },
    wAuto: { width: 'auto' },
    w0: { width: 0 },
    w2: { width: 2 },
    w4: { width: 4 },
    w6: { width: 6 },
    w8: { width: 8 },
    w10: { width: 10 },
    w12: { width: 12 },
    w14: { width: 14 },
    w16: { width: 16 },
    w20: { width: 20 },
    w24: { width: 24 },
    w28: { width: 28 },
    w32: { width: 32 },
    w36: { width: 36 },
    w40: { width: 40 },
    w44: { width: 44 },
    w48: { width: 48 },
    w56: { width: 56 },
    w64: { width: 64 },
    w80: { width: 80 },
    w96: { width: 96 },
    w112: { width: 112 },
    w128: { width: 128 },
    w144: { width: 144 },
    w160: { width: 160 },
    w176: { width: 176 },
    w192: { width: 192 },
    w208: { width: 208 },
    w224: { width: 224 },
    w240: { width: 240 },
    w256: { width: 256 },
    w288: { width: 288 },
    w320: { width: 320 },
    w384: { width: 384 },
    // Negative
    w2ne: { width: 2 },
    w4ne: { width: 4 },
    w6ne: { width: 6 },
    w8ne: { width: -8 },
    w10ne: { width: -10 },
    w12ne: { width: -12 },
    w14ne: { width: -14 },
    w16ne: { width: -16 },
    w20ne: { width: -20 },
    w24ne: { width: -24 },
    w28ne: { width: -28 },
    w32ne: { width: -32 },
    w36ne: { width: -36 },
    w40ne: { width: -40 },
    w44ne: { width: -44 },
    w48ne: { width: -48 },
    w56ne: { width: -56 },
    w64ne: { width: -64 },
    w80ne: { width: -80 },
    w96ne: { width: -96 },
    w112ne: { width: -112 },
    w128ne: { width: -128 },
    w144ne: { width: -144 },
    w160ne: { width: -160 },
    w176ne: { width: -176 },
    w192ne: { width: -192 },
    w208ne: { width: -208 },
    w224ne: { width: -224 },
    w240ne: { width: -240 },
    w256ne: { width: -256 },
    w288ne: { width: -288 },
    w320ne: { width: -320 },
    w384ne: { width: -384 }
  },
  minWidth: {
    minW20: { minWidth: 20 },
    minW24: { minWidth: 24 },
    minW28: { minWidth: 28 },
    minW32: { minWidth: 32 },
    minW36: { minWidth: 36 },
    minW40: { minWidth: 40 },
    minW44: { minWidth: 44 },
    minW48: { minWidth: 48 },
    minW56: { minWidth: 56 },
    minW64: { minWidth: 64 },
    minW80: { minWidth: 80 },
    minW96: { minWidth: 96 },
    minW112: { minWidth: 112 },
    minW128: { minWidth: 128 },
    minW144: { minWidth: 144 },
    minW160: { minWidth: 160 },
    minW176: { minWidth: 176 },
    minW192: { minWidth: 192 },
    minW208: { minWidth: 208 },
    minW224: { minWidth: 224 },
    minW240: { minWidth: 240 },
    minW256: { minWidth: 256 },
    minW288: { minWidth: 288 },
    minW320: { minWidth: 320 },
    minW384: { minWidth: 384 }
  },
  maxWidth: {
    maxW20: { maxWidth: 20 },
    maxW24: { maxWidth: 24 },
    maxW28: { maxWidth: 28 },
    maxW32: { maxWidth: 32 },
    maxW36: { maxWidth: 36 },
    maxW40: { maxWidth: 40 },
    maxW44: { maxWidth: 44 },
    maxW48: { maxWidth: 48 },
    maxW56: { maxWidth: 56 },
    maxW64: { maxWidth: 64 },
    maxW80: { maxWidth: 80 },
    maxW96: { maxWidth: 96 },
    maxW112: { maxWidth: 112 },
    maxW128: { maxWidth: 128 },
    maxW144: { maxWidth: 144 },
    maxW160: { maxWidth: 160 },
    maxW176: { maxWidth: 176 },
    maxW192: { maxWidth: 192 },
    maxW208: { maxWidth: 208 },
    maxW224: { maxWidth: 224 },
    maxW240: { maxWidth: 240 },
    maxW256: { maxWidth: 256 },
    maxW288: { maxWidth: 288 },
    maxW320: { maxWidth: 320 },
    maxW384: { maxWidth: 384 }
  },
  height: {
    h5Percent: { height: '5%' },
    h10Percent: { height: '10%' },
    h15Percent: { height: '15%' },
    h20Percent: { height: '20%' },
    h25Percent: { height: '25%' },
    h30Percent: { height: '30%' },
    h35Percent: { height: '35%' },
    h40Percent: { height: '40%' },
    h45Percent: { height: '45%' },
    h50Percent: { height: '50%' },
    h55Percent: { height: '55%' },
    h60Percent: { height: '60%' },
    h65Percent: { height: '65%' },
    h70Percent: { height: '70%' },
    h75Percent: { height: '75%' },
    h80Percent: { height: '80%' },
    h85Percent: { height: '85%' },
    h90Percent: { height: '90%' },
    h95Percent: { height: '95%' },
    hFull: { height: '100%' },
    hAuto: { height: 'auto' },
    h0: { height: 0 },
    h2: { height: 2 },
    h4: { height: 4 },
    h6: { height: 6 },
    h8: { height: 8 },
    h10: { height: 10 },
    h12: { height: 12 },
    h14: { height: 14 },
    h16: { height: 16 },
    h20: { height: 20 },
    h24: { height: 24 },
    h28: { height: 28 },
    h32: { height: 32 },
    h36: { height: 36 },
    h40: { height: 40 },
    h44: { height: 44 },
    h48: { height: 48 },
    h56: { height: 56 },
    h64: { height: 64 },
    h80: { height: 80 },
    h96: { height: 96 },
    h112: { height: 112 },
    h128: { height: 128 },
    h144: { height: 144 },
    h160: { height: 160 },
    h176: { height: 176 },
    h192: { height: 192 },
    h208: { height: 208 },
    h224: { height: 224 },
    h240: { height: 240 },
    h256: { height: 256 },
    h288: { height: 288 },
    h320: { height: 320 },
    h384: { height: 384 },
    // Negative
    h2ne: { height: 2 },
    h4ne: { height: 4 },
    h6ne: { height: 6 },
    h8ne: { height: -8 },
    h10ne: { height: -10 },
    h12ne: { height: -12 },
    h14ne: { height: -14 },
    h16ne: { height: -16 },
    h20ne: { height: -20 },
    h24ne: { height: -24 },
    h28ne: { height: -28 },
    h32ne: { height: -32 },
    h36ne: { height: -36 },
    h40ne: { height: -40 },
    h44ne: { height: -44 },
    h48ne: { height: -48 },
    h56ne: { height: -56 },
    h64ne: { height: -64 },
    h80ne: { height: -80 },
    h96ne: { height: -96 },
    h112ne: { height: -112 },
    h128ne: { height: -128 },
    h144ne: { height: -144 },
    h160ne: { height: -160 },
    h176ne: { height: -176 },
    h192ne: { height: -192 },
    h208ne: { height: -208 },
    h224ne: { height: -224 },
    h240ne: { height: -240 },
    h256ne: { height: -256 },
    h288ne: { height: -288 },
    h320ne: { height: -320 },
    h384ne: { height: -384 }
  },
  minHeight: {
    minH20: { minHeight: 20 },
    minH24: { minHeight: 24 },
    minH28: { minHeight: 28 },
    minH32: { minHeight: 32 },
    minH36: { minHeight: 36 },
    minH40: { minHeight: 40 },
    minH44: { minHeight: 44 },
    minH48: { minHeight: 48 },
    minH56: { minHeight: 56 },
    minH64: { minHeight: 64 },
    minH80: { minHeight: 80 },
    minH96: { minHeight: 96 },
    minH112: { minHeight: 112 },
    minH128: { minHeight: 128 },
    minH144: { minHeight: 144 },
    minH160: { minHeight: 160 },
    minH176: { minHeight: 176 },
    minH192: { minHeight: 192 },
    minH208: { minHeight: 208 },
    minH224: { minHeight: 224 },
    minH240: { minHeight: 240 },
    minH256: { minHeight: 256 },
    minH288: { minHeight: 288 },
    minH320: { minHeight: 320 },
    minH384: { minHeight: 384 }
  },
  maxHeight: {
    maxH20: { maxHeight: 20 },
    maxH24: { maxHeight: 24 },
    maxH28: { maxHeight: 28 },
    maxH32: { maxHeight: 32 },
    maxH36: { maxHeight: 36 },
    maxH40: { maxHeight: 40 },
    maxH44: { maxHeight: 44 },
    maxH48: { maxHeight: 48 },
    maxH56: { maxHeight: 56 },
    maxH64: { maxHeight: 64 },
    maxH80: { maxHeight: 80 },
    maxH96: { maxHeight: 96 },
    maxH112: { maxHeight: 112 },
    maxH128: { maxHeight: 128 },
    maxH144: { maxHeight: 144 },
    maxH160: { maxHeight: 160 },
    maxH176: { maxHeight: 176 },
    maxH192: { maxHeight: 192 },
    maxH208: { maxHeight: 208 },
    maxH224: { maxHeight: 224 },
    maxH240: { maxHeight: 240 },
    maxH256: { maxHeight: 256 },
    maxH288: { maxHeight: 288 },
    maxH320: { maxHeight: 320 },
    maxH384: { maxHeight: 384 }
  }
};

export const Sizing = { ...config.spacing };

// height = Object.assign(height, sizingToStyle('h', true));
// width = Object.assign(width, sizingToStyle('w', true));

// function sizingToStyle(prefix = '', isNegative = false, negativePrefix = 'ne') {
//   const result = {};
//   Object.entries(config.spacing).map(item => {
//     let key = '';
//     switch (prefix) {
//       case 'w':
//         key = 'width';
//         break;
//       case 'h':
//         key = 'height';
//         break;
//     }

//     result[[prefix + item[0] + negativePrefix]] = {[key]: isNegative ? -item[1] : item[1]};
//   });
//   return result;
// }
