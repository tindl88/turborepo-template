import { SpacingStyles } from './interfaces/spacing.interface';
import { designSystemConfigs } from './config';

const generateSpacing = (spacing: Record<string, number>) => {
  const sizes = Object.entries(spacing);
  const margin: { [key: string]: { [key: string]: number | string } } = {};
  const padding: { [key: string]: { [key: string]: number } } = {};

  margin.mxAuto = { marginLeft: 'auto', marginRight: 'auto' };
  margin.myAuto = { marginTop: 'auto', marginBottom: 'auto' };

  for (const size of sizes) {
    margin[`m${size[0]}`] = { margin: size[1] };
    margin[`mx${size[0]}`] = { marginHorizontal: size[1] };
    margin[`my${size[0]}`] = { marginVertical: size[1] };
    margin[`mt${size[0]}`] = { marginTop: size[1] };
    margin[`mr${size[0]}`] = { marginRight: size[1] };
    margin[`mb${size[0]}`] = { marginBottom: size[1] };
    margin[`ml${size[0]}`] = { marginLeft: size[1] };

    margin[`m${size[0]}ne`] = { margin: -size[1] };
    margin[`mx${size[0]}ne`] = { marginHorizontal: -size[1] };
    margin[`my${size[0]}ne`] = { marginVertical: -size[1] };
    margin[`mt${size[0]}ne`] = { marginTop: -size[1] };
    margin[`mr${size[0]}ne`] = { marginRight: -size[1] };
    margin[`mb${size[0]}ne`] = { marginBottom: -size[1] };
    margin[`ml${size[0]}ne`] = { marginLeft: -size[1] };

    padding[`p${size[0]}`] = { padding: size[1] };
    padding[`px${size[0]}`] = { paddingHorizontal: size[1] };
    padding[`py${size[0]}`] = { paddingVertical: size[1] };
    padding[`pt${size[0]}`] = { paddingTop: size[1] };
    padding[`pr${size[0]}`] = { paddingRight: size[1] };
    padding[`pb${size[0]}`] = { paddingBottom: size[1] };
    padding[`pl${size[0]}`] = { paddingLeft: size[1] };
  }

  return { margin, padding };
};
const spacingStyles = generateSpacing(designSystemConfigs.spacing) as unknown as SpacingStyles;

export default spacingStyles;
