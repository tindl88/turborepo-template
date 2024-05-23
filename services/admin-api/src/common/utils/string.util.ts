import slugify from 'slugify';

export const toSlug = (text: string): string => {
  return slugify(text.toLowerCase(), {
    lower: true,
    remove: /[:;.,*+~!@#^&?(){}"'/[\]]/g
  });
};
