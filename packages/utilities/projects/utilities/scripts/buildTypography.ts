import type { FontSizeLineHeight } from '../src/jss';
import * as fs from 'fs';
import * as path from 'path';
import { font, fontWeight, breakpoint, mediaQueryMin, mediaQueryMinMax } from '../src/jss';
import { pascalCase } from 'change-case';

const buildTypography = (): void => {
  const { family, weight, size } = font;
  const fontSize: { [key: number]: FontSizeLineHeight } = {
    12: size.xSmall,
    16: size.small,
    18: { fontSize: '1.125rem', lineHeight: 1.5555555556 },
    20: { fontSize: '1.25rem', lineHeight: 1.4 },
    22: { fontSize: '1.375rem', lineHeight: 1.4545454545 },
    24: size.medium,
    28: { fontSize: '1.75rem', lineHeight: 1.4285714286 },
    30: { fontSize: '1.875rem', lineHeight: 1.3333333333 },
    32: { fontSize: '2rem', lineHeight: 1.375 },
    36: size.large,
    42: { fontSize: '2.625rem', lineHeight: 1.2380952381 },
    44: { fontSize: '2.75rem', lineHeight: 1.1818181818 },
    48: { fontSize: '3rem', lineHeight: 1.25 },
    52: size.xLarge,
    60: { fontSize: '3.75rem', lineHeight: 1.2 },
    62: { fontSize: '3.875rem', lineHeight: 1.2258064516 },
    72: { fontSize: '4.5rem', lineHeight: 1.2222222222 },
    84: { fontSize: '5.25rem', lineHeight: 1.1904761905 },
  };

  const fontBase = {
    fontFamily: family,
    fontWeight: weight.semibold,
  };

  const title = {
    large: {
      ...fontBase,
      ...fontSize[32],
      [mediaQueryMinMax('s', 'm')]: fontSize[42],
      [mediaQueryMinMax('m', 'l')]: fontSize[52],
      [mediaQueryMinMax('l', 'xl')]: fontSize[62],
      [mediaQueryMin('xl')]: fontSize[72],
    },
  };

  const headline = {
    '1': {
      ...fontBase,
      ...fontSize[28],
      [mediaQueryMinMax('s', 'm')]: fontSize[36],
      [mediaQueryMinMax('m', 'l')]: fontSize[44],
      [mediaQueryMinMax('l', 'xl')]: fontSize[52],
      [mediaQueryMin('xl')]: fontSize[60],
    },
    '2': {
      ...fontBase,
      ...fontSize[24],
      [mediaQueryMinMax('s', 'm')]: fontSize[30],
      [mediaQueryMinMax('m', 'l')]: fontSize[36],
      [mediaQueryMinMax('l', 'xl')]: fontSize[42],
      [mediaQueryMin('xl')]: fontSize[48],
    },
    '3': {
      ...fontBase,
      ...fontSize[20],
      [mediaQueryMinMax('s', 'm')]: fontSize[24],
      [mediaQueryMinMax('m', 'l')]: fontSize[28],
      [mediaQueryMinMax('l', 'xl')]: fontSize[32],
      [mediaQueryMin('xl')]: fontSize[36],
    },
    '4': {
      ...fontBase,
      ...fontSize[16],
      [mediaQueryMinMax('s', 'm')]: fontSize[18],
      [mediaQueryMinMax('m', 'l')]: fontSize[20],
      [mediaQueryMinMax('l', 'xl')]: fontSize[22],
      [mediaQueryMin('xl')]: fontSize[24],
    },
    '5': {
      ...fontBase,
      ...fontSize[16],
    },
  };

  const baseText = {
    fontFamily: font.family,
    fontWeight: font.weight.regular,
  };

  const text = {
    xSmall: { ...baseText, ...font.size.xSmall },
    small: { ...baseText, ...font.size.small },
    medium: { ...baseText, ...font.size.medium },
    large: { ...baseText, ...font.size.large },
    xLarge: { ...baseText, ...font.size.xLarge },
  };

  const getFlippedMap = (map: { [key: string]: number }): { [key: number]: string } => {
    return Object.entries(map)
      .map(([key, value]) => [value, key])
      .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
  };

  const flippedFontWeightMap = getFlippedMap(fontWeight);
  const flippedBreakpointMap = getFlippedMap(breakpoint);

  const formatValues = (obj: object): string =>
    JSON.stringify(obj, null, 2)
      .replace(/("fontFamily": .*)/, 'fontFamily,') // use reference
      .replace(/"fontWeight": (\d*)/, (match, group) => `fontWeight: fontWeight.${flippedFontWeightMap[group]}`) // use reference
      .replace(
        /"@media\s\(min-width:\s(\d*)px\)\sand\s\(max-width:\s(\d*)px\)"/g,
        (match, minBreakpoint, maxBreakpoint) =>
          `[mediaQueryMinMax('${flippedBreakpointMap[minBreakpoint]}', '${
            flippedBreakpointMap[parseInt(maxBreakpoint, 10) + 1]
          }')]`
      ) // use style helper + reference
      .replace(
        /"@media\s\(min-width:\s(\d*)px\)"/,
        (match, minBreakpoint) => `[mediaQueryMin('${flippedBreakpointMap[minBreakpoint]}')]`
      ) // use style helper + reference
      .replace(/"([a-zA-Z]+)":/g, '$1:') // remove quotes around keys that don't need it
      .replace(/"/g, "'"); // replace quotes

  const objectToConst = (obj: object, constName: string): string =>
    Object.entries(obj)
      .map(([key, value]) => `export const ${constName + pascalCase(key)} = ${formatValues(value)};`)
      .concat(
        `export const ${constName} = {
  ${Object.keys(obj)
    .map((key) => `${key}: ${constName + pascalCase(key)}`)
    .join(',\n  ')}
};`
      )
      .join('\n\n');

  const imports = [
    "import { fontFamily, fontWeight } from './font';",
    "import { mediaQueryMin, mediaQueryMinMax } from './media-query';",
  ].join('\n');
  const titles = objectToConst(title, 'title');
  const headlines = objectToConst(headline, 'headline');
  const texts = objectToConst(text, 'text');

  const content = [imports, titles, headlines, texts].join('\n\n');

  const targetDirectory = path.normalize('./src/jss');
  const targetFilename = 'typography.ts';
  const targetPath = path.resolve(targetDirectory, targetFilename);

  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });
  fs.writeFileSync(targetPath, content);
};

buildTypography();
